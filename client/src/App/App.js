import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from 'antd';
const { Footer } = Layout;
import 'antd/dist/antd.css';
import './App.css';
import { Home } from '../screens/Home/Home';
import { Skills } from '../screens/Skills/Skills';
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { Landing } from '../screens/Landing/Landing';
import { ApolloClient, InMemoryCache,ApolloProvider, useQuery, gql } from "@apollo/client";
import { CustomHeader } from '../components/CustomAnt/CustomHeader/CustomHeader';
import { CustomSider } from '../components/CustomAnt/CustomSider/CustomSider';
import { Redirect } from '../screens/Loading/Redirect';

// initializes the apollo client, connecting us to the Neo4J db
const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
  });

// A wrapper for routes that limits specific wraps to authenticated users only
const RequireAuth = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        // Show a message while the user waits to be redirected to the login page.
        onRedirecting: () => <Redirect />,
      });
    return <Component />;
}
/**
 * When accessing a route that is requires auth and the user is a visitor
 * takes them to the login screen and afterward redirects them where they originally wanted
 * to go
 */
const Auth0RedirectCallback = ({ children, ...props }) => {
    const navigate = useNavigate();
    const onRedirectCallback = (appState) => {
      navigate((appState && appState.returnTo) || window.location.pathname);
    };
    return (
      <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
        {children}
      </Auth0Provider>
    );
}


export const App = () => {

    return (
        <ApolloProvider client={apolloClient}>
            <Router>
                <Auth0RedirectCallback
                    domain= {process.env.AUTH0_DOMAIN}
                    clientId= {process.env.AUTH0_CLIENTID}
                    redirectUri="http://localhost:8080/"
                >
                    <Layout>
                        <CustomHeader />

                        <Layout style={{"minHeight": "100vh"}}>
                            <CustomSider />
                            <Layout style={{justifyContent : "space-between", height : "100vh"}}>
                                <div style={{ backgroundColor : "white", height: "100vh", padding : "24px 0 0 0"}}>
                                    <Routes>
                                        <Route path="/" element={<Landing />} />
                                        <Route path="/home" element={<RequireAuth component={Home} />}/>
                                        <Route path="/skills" element={<RequireAuth component={Skills} />} />
                                    </Routes>
                                </div>

                                <Footer>
                                    <h4>Forward Motion Program Summer 2022</h4>
                                    <h5>Created by John Higgins at Jahnel Group</h5>
                                </Footer>
                            </Layout>


                        </Layout>
                    </Layout>

                </Auth0RedirectCallback>
            </Router>

        </ApolloProvider>

        

      );
}
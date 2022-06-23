import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from 'antd';
const { Footer } = Layout;
import 'antd/dist/antd.css';
import './App.css';
import { Home } from '../screens/Home/Home';
import { Skills } from '../screens/Skills/Skills';
import { Auth0Provider, useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Landing } from '../screens/Landing/Landing';
import { ApolloClient, InMemoryCache,ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { CustomHeader } from '../components/CustomAnt/CustomHeader/CustomHeader';
import { CustomSider } from '../components/CustomAnt/CustomSider/CustomSider';
import { Redirect } from '../screens/Loading/Redirect';
import { Authentication } from '../screens/Authentication/Authentication';
import { Loading } from '../screens/Loading/Loading';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// A wrapper for routes that limits specific wraps to authenticated users only
const RequireAuth = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        // Show a message while the user waits to be redirected to the login page.
        onRedirecting: () => <Loading />,
    });

    return <Component/>
}
/**
 * When accessing a route that is requires auth and the user is a visitor
 * takes them to the login screen and afterward redirects them where they originally wanted
 * to go
 */
const Auth0RedirectCallback = ({ children, ...props }) => {
    const navigate = useNavigate();
    const onRedirectCallback = (appState) => {
        navigate(`/auth${(appState && appState.returnTo) || window.location.pathname}`)
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
                    audience="http://localhost:4000"
                    scope="read:current_user update:current_user_metadata"
                >
                    <Layout>
                        <CustomHeader />

                        <Layout >
                            <CustomSider />
                            <Layout style={{ minHeight : "100vh", width: "100%", padding: 10, }}>
                                <Routes>
                                    <Route path="/" element={<Landing />} />
                                    <Route path="/home" element={<RequireAuth component={Home} />}/>
                                    <Route path="/auth/:redirectUri" element={<Authentication />}/>
                                    <Route path="/skills" element={<RequireAuth component={Skills} />} />
                                </Routes>

                                <Footer style={{"marginBottom" :0 }}>
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
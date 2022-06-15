import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from 'antd';
const { Footer } = Layout;
import 'antd/dist/antd.css';
import './App.css';
import { Home } from '../screens/Home/Home';
import { Skills } from '../screens/Skills/Skills';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Landing } from '../screens/Landing/Landing';
import { CustomHeader, CustomSider } from '../components/CustomAnt/CustomAnt';
import { ApolloClient, InMemoryCache,ApolloProvider, useQuery, gql } from "@apollo/client";

// initializes the apollo client, connecting us to the Neo4J db
const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
  });

// A wrapper for routes that limits specific wraps to authenticated users only
const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth0()
    const navigate = useNavigate()
    
    if (!isAuthenticated) navigate("/")
    return children;
}


export const App = () => {

    return (
        <ApolloProvider client={apolloClient}>
            <Auth0Provider
                domain= {process.env.AUTH0_DOMAIN}
                clientId= {process.env.AUTH0_CLIENTID}
                redirectUri="http://localhost:8080/"
            >
                <Router>
                    <Layout>
                        <CustomHeader />

                        <Layout style={{"minHeight": "100vh"}}>
                            <CustomSider/>
                            <Layout style={{justifyContent : "space-between", height : "100vh"}}>
                                <div style={{ backgroundColor : "white", height: "100vh", padding : "24px 0 0 0"}}>
                                    <Routes>
                                        <Route path="/" element={<Landing />} />
                                        <Route path="/home" element={<RequireAuth> <Home/> </RequireAuth>  }/>
                                        <Route path="/skills" element={<RequireAuth> <Skills /> </RequireAuth>} />
                                    </Routes>
                                </div>

                                <Footer>
                                    <h4>Forward Motion Program Summer 2022</h4>
                                    <h5>Created by John Higgins at Jahnel Group</h5>
                                </Footer>
                            </Layout>


                        </Layout>
                    </Layout>

                </Router>
            </Auth0Provider>
        </ApolloProvider>

        

      );
}
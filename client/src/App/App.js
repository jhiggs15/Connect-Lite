import React, { useEffect, useState } from 'react';
import {LoginOutlined, LogoutOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import 'antd/dist/antd.css';
import './App.css';
import { Home } from '../screens/Home/Home';
import { Skills } from '../screens/Skills/Skills';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Landing } from '../screens/Landing/Landing';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }


const CustomSider = () => {
    let navigate = useNavigate()
    const { isAuthenticated } = useAuth0()

    const siderItems = isAuthenticated ? [
            getItem("Home", '/home', <HomeOutlined />),
            getItem("My Skills", '/skills', <UserOutlined />),
        ]
        :
        [  ]

    return (
        <Sider >
            <Menu onClick={(event) =>{navigate(event.key)}} theme="dark" defaultSelectedKeys={location == "/home" ? location : "" } mode="inline" items={siderItems} />
        </Sider>
    )
}



const CustomHeader = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()
    const navigate = useNavigate()

    const authItem = isAuthenticated ? 
        [ getItem("Sign Out", '1', <LogoutOutlined />)]
        :
        [ getItem("Login", '2', <LoginOutlined />) ]


    return (

        <Header>
            <h1 className='title'> Connect </h1>
            <Menu onClick={() =>{ isAuthenticated ? logout() : loginWithRedirect() }} theme="dark" mode="inline" items={authItem} />
        </Header>
    )
}

const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth0()
    const navigate = useNavigate()
    
    if (!isAuthenticated) navigate("/")
    return children;
}


export const App = () => {

    return (
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
        

      );
}
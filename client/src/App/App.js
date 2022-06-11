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
            getItem("Home", '/', <HomeOutlined />),
            getItem("My Skills", '/skills', <UserOutlined />),
        ]
        :
        [  ]

    return (
        <Sider >
            <Menu onClick={(event) =>{navigate(event.key)}}   theme="dark" defaultSelectedKeys={"/"} mode="inline" items={siderItems} />
        </Sider>
    )
}

const CustomHeader = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

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

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/skills" element={<Skills />} />
                        </Routes>

                        <Footer>
                            Footer
                        </Footer>
                    </Layout>
                </Layout>

            </Router>
        </Auth0Provider>
        

      );
}
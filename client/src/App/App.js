import React, { useEffect, useState } from 'react';
import {LoginOutlined, LogoutOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Authentication } from '../screens/Authentication/Authentication';
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


const SideBar = () => {
    let navigate = useNavigate()
    const { isAuthenticated } = useAuth0()

    const siderItems = isAuthenticated ? [
            getItem("Home", '/', <HomeOutlined />),
            getItem("My Skills", '/skills', <UserOutlined />),
            getItem("Sign Out", '/auth', <LogoutOutlined />)
        ]
        :
        [ getItem("Login", '/auth', <LoginOutlined />) ]


    return (
        <Sider>
            <Menu onClick={(event) =>{navigate(event.key)}}   theme="dark" defaultSelectedKeys={[isAuthenticated ? "/" : "/auth"]} mode="inline" items={siderItems} />
        </Sider>
    )


}

const RequireAuth = ({children}) => {
    const { isAuthenticated } = useAuth0()

    useEffect()
    if(!isAuthenticated) 
        return <Navigate to="/auth" />

    return component
}


export const App = () => {


    return (
        // Add secrets
        <Auth0Provider>
            <Router>
                <Layout>
                    <Header >
                        <h1 className='title'> Connect </h1>
                    </Header>

                    <Layout style={{"minHeight": "100vh"}}>
                        <SideBar/>

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/skills" element={<Skills />} />
                            <Route path="/auth" element={<Authentication />} />
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




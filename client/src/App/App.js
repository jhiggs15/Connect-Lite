import React, { useEffect, useState } from 'react';
import {KeyOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Authentication } from '../screens/Authentication/Authentication';
import 'antd/dist/antd.css';
import './App.css';
import { Home } from '../screens/Home/Home';
import { Skills } from '../screens/Skills/Skills';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
const siderItems = [ 
    getItem("Home", '/', <HomeOutlined />),
    getItem("Login", '/auth', <KeyOutlined />),
    getItem("My Skills", '/skills', <UserOutlined />)
]

const SideBar = () => {
    let navigate = useNavigate()

    return (
        <Sider>
            <Menu onClick={(event) =>{navigate(event.key)}}   theme="dark" defaultSelectedKeys={['/']} mode="inline" items={siderItems} />
        </Sider>
    )


}

export const App = () => {

    var AuthenticationClient = require('auth0').AuthenticationClient;

    var auth0 = new AuthenticationClient({
      domain: '{YOUR_ACCOUNT}.auth0.com',
      clientId: '{OPTIONAL_CLIENT_ID}',
    });
    
    return (
        <Router>
            <Layout>
                <Header >
                    <h1 className='title'> Connect </h1>
                </Header>

                <Layout style={{"min-height": "100vh"}}>
                    <SideBar/>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Authentication />} />
                        <Route path="/skills" element={<Skills />} />
                    </Routes>

                    <Footer>
                        Footer
                    </Footer>
                </Layout>
            </Layout>

        </Router>
      );
}




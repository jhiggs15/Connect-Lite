import React from 'react';
import {LoginOutlined, LogoutOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header, Sider } = Layout;
import 'antd/dist/antd.css';
import {  useAuth0 } from "@auth0/auth0-react";

// creates icons from ant-design
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

/**
 * A side bar that updates itself based on if the user is authenticated. On clicking the menu items, navigates to the correct page
 */
export const CustomSider = () => {
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


/**
 * A component that updates based on if the user is logged in. If they are logged in provides option to sign out, otherwise lets the visitor sign in
 */
export const CustomHeader = () => {
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
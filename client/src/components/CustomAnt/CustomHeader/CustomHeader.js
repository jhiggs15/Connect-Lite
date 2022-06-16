import React from 'react';
import {LoginOutlined, LogoutOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header, Sider } = Layout;
import 'antd/dist/antd.css';
import {  useAuth0 } from "@auth0/auth0-react";
import { getItem } from '../getItem';

/**
 * A component that updates based on if the user is logged in. If they are logged in provides option to sign out, otherwise lets the visitor sign in
 */
export const CustomHeader = () => {
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
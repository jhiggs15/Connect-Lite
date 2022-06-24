import React from 'react';
import {LoginOutlined, LogoutOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import 'antd/dist/antd.css';
import { useAuth0 } from "@auth0/auth0-react";
import { getItem } from '../getItem';
import { useApolloClient } from "@apollo/client";


/**
 * A component that updates based on if the user is logged in. If they are logged in provides option to sign out, otherwise lets the visitor sign in
 */
export const CustomHeader = () => {
    const { loginWithRedirect, logout, user, isAuthenticated  } = useAuth0()
    const client = useApolloClient();

    const authItem = isAuthenticated ? 
        [getItem("Sign Out", '1', <LogoutOutlined />, "CustomHeader-MenuItem-SignOut")]
        :
        [getItem("Login", '2', <LoginOutlined />, "CustomHeader-MenuItem-Login")]


    const customLogout = () => {
        localStorage.removeItem('token')
        console.log(client)
        client.cache.reset().then(() => {
            logout()

        })



        
    }


    return (

        <Header data-testid="CustomHeader-Header">
            <h1 data-testid="CustomHeader-Title" className='title'> Connect </h1>
            <Menu data-testid="CustomHeader-Menu" selectable={false} theme="dark" mode="inline" items={authItem} 
                onClick={() => isAuthenticated ? customLogout() : loginWithRedirect({redirectUri: "http://localhost:8080/home"})}  />
        </Header>
    )
}
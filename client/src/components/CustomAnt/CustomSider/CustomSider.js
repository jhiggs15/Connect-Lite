import React from 'react';
import {UserOutlined, HomeOutlined} from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import 'antd/dist/antd.css';
import { getItem } from '../getItem';
import { useAuth0 } from "@auth0/auth0-react";


/**
 * A side bar that updates itself based on if the user is authenticated. On clicking the menu items, navigates to the correct page
 */
 export const CustomSider = () => {
    let navigate = useNavigate()
    let location = useLocation()
    const { isAuthenticated } = useAuth0()

    const siderItems = isAuthenticated ? [
            getItem("Home", '/home', <HomeOutlined />, "CustomSider-MenuItem-Home"),
            getItem("My Skills", '/skills', <UserOutlined />, "CustomSider-MenuItem-Skills"),
        ]
        :
        [  ]

    return (
        <Sider data-testid="CustomSider-Sider">
            <Menu data-testid="CustomSider-Menu" selectedKeys={location.pathname} onClick={(event) =>{navigate(event.key)}} theme="dark" mode="inline" items={siderItems} />
        </Sider>
    )
}
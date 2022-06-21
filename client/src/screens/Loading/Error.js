import React from 'react';
import 'antd/dist/antd.css';

export const Error = ({error}) => {
    return (
        <div>
            <h1>Error!</h1>
            <h3>{error.message}</h3>
        </div>
    )
}
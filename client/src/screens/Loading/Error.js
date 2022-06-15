import React from 'react';

export const Error = ({error}) => {
    return (
        <div>
            <h1>Error!</h1>
            <h3>{error.message}</h3>
        </div>
    )
}
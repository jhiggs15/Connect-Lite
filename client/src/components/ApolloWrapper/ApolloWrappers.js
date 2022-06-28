import { Loading } from "../../screens/Loading/Loading";
import React from 'react';
import { Error } from "../../screens/Loading/Error";

/**
 * Provides a central component to handle error and loading states
 * If the app is not in any of these states it renders the child components
 */
export const ApolloWrapper = ({loadingStates, errorStates, nullStates, children}) => {
    if ( nullStates && nullStates.some(state => typeof state === 'undefined')) return <Loading/>;
    // TODO : add loading screen
    if (loadingStates && loadingStates.some(state => state)) return <Loading/>;
    // TODO add error screen
    if (errorStates && errorStates.some(error => error)) return <Error error={errorStates.find(error => typeof error !== "undefined")}/>;
    return children

    


}
import { Loading } from "../../screens/Loading/Loading";
import React from 'react';
import { Error } from "../../screens/Loading/Error";

/**
 * Provides a central component to handle error and loading states
 * If the app is not in any of these states it renders the child components
 */
export const ApolloWrapper = ({loadingStates, errorStates, children}) => {

    console.log(errorStates)
    // TODO : add loading screen
    if (loadingStates.some(state => state)) return <Loading/>;
    // TODO add error screen
    if (errorStates.some(error => typeof error !== 'undefined')) return <Error error={errorStates.find(error => error !== null)}/>;

    return children

    


}
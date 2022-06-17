import React from 'react';
import { Layout } from 'antd';
import { CustomHeader } from '../CustomHeader';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';

// TODO add cleanup

jest.mock('@auth0/auth0-react')
jest.mock('react-router-dom')

// used to ensure render does not duplicate the component over and over
afterAll(cleanup);

/**
 * Basic tests to ensure everything is setup correctly
 */
describe('setup', () => {
    // configures common settings
    const configure = (isAuthenticated) => {
        useAuth0.mockReturnValue({
            isAuthenticated, 
            loginWithRedirect : jest.fn(()=> true),
            logout : jest.fn(()=> true),
            user : {}
        })
    }

    // ensures the mocks are setup right and do not error
    test('mocks', () => {
        configure(false)
        expect(useAuth0().isAuthenticated).toBe(false)

        expect(useAuth0().loginWithRedirect).toBeDefined()
        useAuth0().loginWithRedirect()
        expect(useAuth0().loginWithRedirect.mock.results[0].value).toBe(true)

        expect(useAuth0().logout).toBeDefined()
        useAuth0().logout()
        expect(useAuth0().logout.mock.results[0].value).toBe(true)

        expect(useAuth0().user).toEqual({})
    })

    // checks to make sure all compoennts are rendered when a user is logged in
    // home and skill menu items
    test('if the component renders w/ Auth', () => {
        configure(true)
        act(() => {
            const {getByTestId} = render(
                <Layout>
                    <CustomHeader />
                </Layout>
            )
        })

        // waits for component to finish rendering
        waitFor(() => {
            expect(getByTestId("CustomHeader-Header")).toBeInTheDocument()
            expect(getByTestId("CustomHeader-Menu")).toBeInTheDocument()
            expect(getByTestId("CustomHeader-Title")).toBeInTheDocument()
            expect(getByTestId("CustomHeader-MenuItem-SignOut")).toBeInTheDocument()
        })



    });

    // checks to make sure all compoennts are rendered when a user is not logged in
    // no menu items 
    test('if the component renders w/ out Auth', () => {
        configure(false)
        const {getByTestId, queryByTestId} = render(
            <Layout>
                <CustomHeader />
            </Layout>
        )

        // waits for component to finish rendering
        // not needed in other tests because render is not done within the test
        waitFor(() => {
            expect(getByTestId("CustomHeader-Header")).toBeInTheDocument()
            expect(getByTestId("CustomHeader-Menu")).toBeInTheDocument()
            expect(getByTestId("CustomHeader-Title")).toBeInTheDocument()
            expect(getByTestId("CustomHeader-MenuItem-Login")).toBeInTheDocument()
        })

    });
})

/**
 * Ensures that when items are clicked on top header state is handled correctly
 */
 describe("on click", () => {
    // common configure options
    const configure = (isAuthenticated) => {

        useAuth0.mockReturnValue({
            isAuthenticated, 
            loginWithRedirect : jest.fn(arg => arg),
            logout: jest.fn(() => true),
            user : {}
        })

        const { getByTestId } = render(
            <Layout>
                <CustomHeader />
            </Layout>
        )

        return getByTestId
    }

    test('logging in', () => {
        const getByTestId = configure(false)
        const login = getByTestId("CustomHeader-MenuItem-Login")

        fireEvent.click(login)

        expect(useAuth0().logout.mock.calls.length).toBe(0)
        expect(useAuth0().loginWithRedirect.mock.calls.length).toBe(1)
        expect(useAuth0().loginWithRedirect.mock.calls[0][0].redirectUri).toBe("http://localhost:8080/home")

    });


    test('clicking home from skills', () => {
        const getByTestId = configure(true)
        const logout = getByTestId("CustomHeader-MenuItem-SignOut")

        fireEvent.click(logout)

        expect(useAuth0().logout.mock.calls.length).toBe(1)
        expect(useAuth0().loginWithRedirect.mock.calls.length).toBe(0)

    });

})
import React from 'react';
import { Layout } from 'antd';
import { CustomSider } from '../CustomSider';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

import { render, cleanup, fireEvent } from '@testing-library/react';
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
    const configure = (isAuthenticated, pathname) => {
        useAuth0.mockReturnValue({isAuthenticated})
        useLocation.mockReturnValue({pathname})
    }

    // ensures the mocks are setup right and do not error
    test('mocks', () => {
        configure(false, "/")
        expect(useAuth0().isAuthenticated).toBe(false)
        expect(useLocation().pathname).toBe("/")
    })

    // checks to make sure all compoennts are rendered when a user is logged in
    // home and skill menu items
    test('if the component renders w/ Auth', () => {
        configure(true, "/")
        const {getByTestId} = render(
            <Layout>
                <CustomSider />
            </Layout>
        )
        expect(getByTestId("CustomSider-Sider")).toBeInTheDocument()
        expect(getByTestId("CustomSider-Menu")).toBeInTheDocument()
        expect(getByTestId("CustomSider-MenuItem-Home")).toBeInTheDocument()
        expect(getByTestId("CustomSider-MenuItem-Skills")).toBeInTheDocument()
    });

    // checks to make sure all compoennts are rendered when a user is not logged in
    // no menu items 
    test('if the component renders w/ out Auth', () => {
        configure(false, "/")
        const {getByTestId, queryByTestId} = render(
            <Layout>
                <CustomSider />
            </Layout>
        )
        expect(getByTestId("CustomSider-Sider")).toBeInTheDocument()
        expect(getByTestId("CustomSider-Menu")).toBeInTheDocument()
        expect(queryByTestId("CustomSider-MenuItem-Home")).toBeNull()
        expect(queryByTestId("CustomSider-MenuItem-Skills")).toBeNull()
    });
})

/**
 * Ensures when a page is traveled to its menu item is selected
 */
describe("Selection of Menu", () => {
    // common configure options
    const configure = (isAuthenticated, pathname) => {
        useAuth0.mockReturnValue({isAuthenticated})
        useLocation.mockReturnValue({pathname})
        const { getByTestId } = render(
            <Layout>
                <CustomSider />
            </Layout>
        )

        return getByTestId
    }

    test('home is selected', () => {
        const getByTestId = configure(true, "/home")
        
        const home = getByTestId("CustomSider-MenuItem-Home")
        const skills = getByTestId("CustomSider-MenuItem-Skills")
        expect(home).toHaveClass("ant-menu-item-selected")
        expect(skills).not.toHaveClass("ant-menu-item-selected")
    });

    test('invalid route is selected', () => {
        const getByTestId = configure(true, "/foo")

        const home = getByTestId("CustomSider-MenuItem-Home")
        const skills = getByTestId("CustomSider-MenuItem-Skills")
        expect(home).not.toHaveClass("ant-menu-item-selected")
        expect(skills).not.toHaveClass("ant-menu-item-selected")
    });

    test('skill route selected', () => {
        const getByTestId = configure(true, "/skills")
        
        const home = getByTestId("CustomSider-MenuItem-Home")
        const skills = getByTestId("CustomSider-MenuItem-Skills")
        expect(home).not.toHaveClass("ant-menu-item-selected")
        expect(skills).toHaveClass("ant-menu-item-selected")
    });

})

/**
 * Ensures when a page is traveled to its menu item is selected
 */
 describe("on click", () => {
    // common configure options
    
    const configure = (startPathName, endPathName) => {
        useAuth0.mockReturnValue({isAuthenticated : true})
        useLocation.mockReturnValueOnce({startPathName}).mockReturnValueOnce({endPathName})
        let navigate = jest.fn().mockImplementation(path => useLocation())
        useNavigate.mockImplementationOnce(() => navigate)
        const { getByTestId } = render(
            <Layout>
                <CustomSider />
            </Layout>
        )

        return {getByTestId, navigate}
    }

    test('clicking skills from home', () => {
        let {getByTestId, navigate} = configure("/home", "/skills")
        const skills = getByTestId("CustomSider-MenuItem-Skills")
        fireEvent.click(skills)

        // checks that skills button is now selected
        const home = getByTestId("CustomSider-MenuItem-Home")
        expect(home).not.toHaveClass("ant-menu-item-selected")
        expect(skills).toHaveClass("ant-menu-item-selected")
        // ensures that the navigate function has been called once and it returned the right path
        expect(navigate.mock.calls.length).toBe(1)
        expect(navigate.mock.calls[0][0]).toBe("/skills")


    });


    test('clicking home from skills', () => {
        let {getByTestId, navigate} = configure("/skills", "/home")
        const home = getByTestId("CustomSider-MenuItem-Home")
        fireEvent.click(home)

        // checks that skills button is now selected
        const skills = getByTestId("CustomSider-MenuItem-Skills")
        expect(home).toHaveClass("ant-menu-item-selected")
        expect(skills).not.toHaveClass("ant-menu-item-selected")
        // ensures that the navigate function has been called once and it returned the right path
        expect(navigate.mock.calls.length).toBe(1)
        expect(navigate.mock.calls[0][0]).toBe("/home")


    });

})
import React from 'react';
import { Layout } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";

import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Authentication } from '../Authentication';
import { doesUserExist } from '../../../graphQLOps/queries/doesUserExist';
import { createUser } from '../../../graphQLOps/mutation/createUser';

// TODO add cleanup

jest.mock('@auth0/auth0-react')
jest.mock('react-router-dom')
jest.mock('@apollo/client')

// used to ensure render does not duplicate the component over and over
afterAll(cleanup);

const configure = () => {
    useAuth0.mockReturnValue({
        getAccessTokenSilently: jest.fn(() => Promise.resolve("123")),
        user : {email: "jhiggins@wpi.edu"}
    })

    const createUserMutationMock = jest.fn(() => Promise.resolve())
    useMutation.mockImplementation(gql => [createUserMutationMock, {loading : false}])

    const doesUserExistQueryMock = jest.fn(() => Promise.resolve())
    useLazyQuery.mockImplementation(gql => [ doesUserExistQueryMock, {data: {users : []}, loading : false}])

    useParams.mockReturnValue({redirectUri : "home"})
    let navigate = jest.fn().mockImplementation(path => path)
    useNavigate.mockImplementation(() => navigate)

    const storage = {}
    global.Storage.prototype.setItem = jest.fn((key, value) => storage[key] = value)
    global.Storage.prototype.getItem = jest.fn((key) => storage[key])

    return {createUserMutationMock, doesUserExistQueryMock, navigate}

}

/**
 * Basic tests to ensure everything is setup correctly
 */
describe('setup', () => {
    // ensures the mocks are setup right and do not error
    test('mocks', async () => {
        configure()

        const token = await useAuth0().getAccessTokenSilently()
        expect(token).toBe("123")
        expect(useAuth0().user.email).toBe("jhiggins@wpi.edu")

        const [doesUserExistQuery, { data : doesUserExistData, loading: doesUserExistLoading }] = useLazyQuery(doesUserExist);
        await doesUserExistQuery("foo")
        expect(doesUserExistQuery.mock.calls.length).toBe(1)
        expect(doesUserExistData.users.length).toBe(0)
        expect(doesUserExistLoading).toBe(false)

        const [createUserMutation, { loading: createUserLoading }] = useMutation(createUser);
        await createUserMutation()
        expect(createUserMutation.mock.calls.length).toBe(1)
        expect(createUserLoading).toBe(false)


        const navigateFunction = useNavigate()
        navigateFunction()
        // ensures navigate and navigateFunction point to the same function
        expect(navigateFunction.mock.calls.length).toBe(1)
        expect(useParams().redirectUri).toBe("home")

        localStorage.setItem('token', "123")
        expect(localStorage.getItem('token')).toBe("123")
        expect(global.Storage.prototype.setItem.mock.calls.length).toBe(1)
        expect(global.Storage.prototype.getItem.mock.calls.length).toBe(1)

       
    })

    test('if the component renders', () => {
        configure()
        act(() => {
            const {getByTestId} = render(
                <Layout>
                    <Authentication />
                </Layout>
            )
        })

        // waits for component to finish rendering
        waitFor(() => {
            expect(getByTestId("Loading")).toBeInTheDocument()
        })
    });

})

describe('correct calls', () => {
    // configures common settings
    const configureLocal = () => {
        const {createUserMutationMock, doesUserExistQueryMock, navigate} = configure()
        const {getByTestId} = render(
            <Authentication />
        )

        return {getByTestId, createUserMutationMock, doesUserExistQueryMock, navigate}

    }
// not sure how to test this because setState is not updated
    // test('if the correct number of calls are made to each function', async () => {
    //     const {getByTestId, createUserMutationMock, doesUserExistQueryMock, navigate} = configureLocal()

    //     // TODO : why do these render more than once
    //     // expect(useQuery.mock.calls.length).toBe(1)
    //     // expect(useParams.mock.calls.length).toBe(1)

    //     // awaits here becuase of the useEffect
    //     await expect(useAuth0().getAccessTokenSilently.mock.calls.length).toBe(1)
    //     expect(global.Storage.prototype.setItem.mock.calls.length).toBe(1)
    //     expect(doesUserExistQueryMock.mock.calls.length).toBe(1)


    //     await expect(createUserMutationMock.mock.calls.length).toBe(1)
    //     await expect(navigate.mock.calls.length).toBe(1)


        
    // });



})

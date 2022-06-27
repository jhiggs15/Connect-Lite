import React, { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import { Loading } from "../Loading/Loading"
import { useNavigate, useParams } from "react-router-dom"
import { createDoesUserExistArgs, doesUserExist } from "../../graphQLOps/queries/doesUserExist"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { createArgs } from "../../graphQLOps/createInputs"
import { createUser, createUserArgs } from "../../graphQLOps/mutation/createUser"

export const Authentication = (props) => {

    const {getAccessTokenSilently, user} = useAuth0()
    const navigate = useNavigate()
    const {redirectUri} = useParams()
    const [hasUpdatedToken, setHasUpdatedToken] = useState(false)
    const [doesUserExistQuery, { data : doesUserExistData, loading: doesUserExistLoading }] = useLazyQuery(doesUserExist);
    const [createUserMutation, { loading: createUserLoading }] = useMutation(createUser);

    // gets the token silently and adds it to local storage
    // this triggers an update on auth0's side to update the request headers
    useEffect( () => {
        const updateToken = async () => {
            // ensures the user has been returned from the Auth0 sign in
            if(user) {
                // gets the access token that was created from the auth0 sign in
                const token = await getAccessTokenSilently()
                // puts the token in local storage
                localStorage.setItem('token', token)
                // queries the database to determine if users with the current users email have been created 
                const where = {email : user.email}
                await doesUserExistQuery(createArgs({where}))
                // set the components state to the token have being updated
                setHasUpdatedToken(true)
            }
        }

        updateToken()
    }, [getAccessTokenSilently, user]) // runs the hook everytime getAccessTOkenSIlently and User change


    // creates the user if they do not already exist within the database
    useEffect( () => {
        const createUserIfNecessary = async () => {

            // ensure that all steps have been completed up to this point
            // token has been updated, we hace determined if the user exists in the database, the createUser mutation ahs been created
            if(hasUpdatedToken && !doesUserExistLoading && !createUserLoading) {
                // if there are no users with the current users email create a new one
                if(doesUserExistData.users.length == 0) {
                    // create a new user
                    await createUserMutation(createUserArgs(user.email, user.name))
                }
                // redirect the user to the page they were on
                navigate(`/${redirectUri}`)
            }
        }

        createUserIfNecessary()


    }, [hasUpdatedToken, doesUserExistData]) // runs the hook when the token has been updated and the data from the doesUserExist query has been retrieved


    return (
        <Loading data-testid="Loading" />
    )

}
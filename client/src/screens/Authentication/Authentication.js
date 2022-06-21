import React, { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import { Loading } from "../Loading/Loading"
import { useNavigate, useParams } from "react-router-dom"

export const Authentication = (props) => {

    const {getAccessTokenSilently, isAuthenticated} = useAuth0()
    const navigate = useNavigate()
    const {redirectUri} = useParams()

    // TODO : figure out way to make this run as a time in the background
    useEffect( () => {
        const updateToken = async () => {
            const token = await getAccessTokenSilently()
            localStorage.setItem('token', token)
            navigate(`/${redirectUri}`)
        }

        updateToken()
    }, [getAccessTokenSilently])


    return (
        <Loading />
    )

}
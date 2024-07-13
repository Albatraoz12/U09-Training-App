/* eslint-disable react/prop-types */
import React, { createContext, useState, useMemo, useEffect } from 'react'
import Cookies from 'js-cookie'
import { checkUser, getLists, getSaves } from '../components/utils'

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [userLists, setUserLists] = useState([])
    const [userSaves, setUserSaves] = useState([])
    const [token, setToken] = useState('')

    // Separate useEffect to set the token from cookies
    useEffect(() => {
        const cookie = Cookies.get('access_token')
        if (cookie) {
            setToken(cookie)
        }
    }, [])

    // useEffect to fetch user data once the token is set
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                const userData = await checkUser(token)
                setUser(userData.user)
            }
        }
        fetchUser()
    }, [token])

    // useEffect to fetch user lists and saves once the user is set
    useEffect(() => {
        const fetchUserListsAndSaves = async () => {
            if (user.id && token) {
                const uLists = await getLists(user.id, token)
                const uSaves = await getSaves(user.id, token)
                setUserLists(uLists)
                setUserSaves(uSaves)
            }
        }

        fetchUserListsAndSaves()
    }, [user, token])

    const value = useMemo(
        () => ({
            user,
            setUser,
            token,
            setToken,
            userLists,
            userSaves,
            setUserLists,
            setUserSaves,
        }),
        [user, token, userLists, userSaves, setUserLists, setUserSaves]
    )

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }

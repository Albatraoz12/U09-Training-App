/* eslint-disable react/prop-types */
import React, { createContext, useState, useMemo, useEffect } from 'react'
import Cookies from 'js-cookie'
import { checkUser } from '../components/utils'

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState({})
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
                console.log('userdata: ', userData.user)
                setUser(userData.user)
            }
        }
        fetchUser()
    }, [token])

    const value = useMemo(() => ({ user, setUser, token, setToken }), [user, token])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }

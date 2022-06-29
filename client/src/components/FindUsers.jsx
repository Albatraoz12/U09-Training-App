import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import ErrorPage from './Errorpage'

function FindUsers() {
    const user = Cookies.get('access_token')
    const [getUser, setGetUser] = useState([])
    const [isRole, setIsRole] = useState(Boolean)

    useEffect(() => {
        const checkUser = async () => {
            // User sends its access_token in headers to BE to be decoded.
            await axios
                .get(`${process.env.REACT_APP_API_URL}user/protected`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res.data.user) {
                        // Stores user info into the state.
                        setGetUser(res.data.user)
                        if (res.data.user.role === 'admin') {
                            setIsRole(true)
                        } else {
                            setIsRole(false)
                        }
                    }
                })
        }

        const getUsers = async () => {
            await axios
                .get(`${process.env.REACT_APP_API_URL}admin/getAllUsers`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    console.log(res.data)
                })
        }

        if (user) {
            checkUser()
            getUsers()
        }
    }, [user])

    if (isRole) {
        return (
            <div>
                <h1>
                    Hello there {getUser.firstName} with role {getUser.role}
                </h1>
            </div>
        )
    }

    return <ErrorPage />
}

export default FindUsers

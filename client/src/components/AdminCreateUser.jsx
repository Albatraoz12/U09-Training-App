import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import ErrorPage from './Errorpage'

function AdminCreateUser() {
    const navigate = useNavigate()
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
        if (user) {
            checkUser()
        }
    }, [getUser.role, isRole, navigate, user])

    if (isRole) {
        return <div>AdminCreateUser</div>
    }

    return <ErrorPage />
}

export default AdminCreateUser

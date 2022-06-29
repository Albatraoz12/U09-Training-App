/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import ErrorPage from './Errorpage'

function FindUsers() {
    const user = Cookies.get('access_token')
    const [getUser, setGetUser] = useState([])
    const [getAllUsers, setGetAllUsers] = useState([])
    const [searchTerms, setSearchTerm] = useState('')
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
                    setGetAllUsers(res.data.users)
                })
        }

        if (user) {
            checkUser()
            getUsers()
        }
    }, [user])

    const filteredUsers = getAllUsers.filter((val) => {
        if (searchTerms === '') {
            return val
        }
        if (val.firstName.toLowerCase().includes(searchTerms.toLowerCase())) {
            return val
        }
    })

    if (isRole) {
        return (
            <section>
                <h1>
                    Hello there {getUser.firstName} with role {getUser.role}
                </h1>
                <input
                    type="text"
                    placeholder="Search by name"
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}
                />
                {filteredUsers.map((userData, key) => {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={key}>
                            <p>{userData.firstName}</p>
                        </div>
                    )
                })}
            </section>
        )
    }

    return <ErrorPage />
}

export default FindUsers

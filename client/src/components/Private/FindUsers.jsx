/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import ErrorPage from '../Errorpage'

function FindUsers() {
    const user = Cookies.get('access_token')
    // eslint-disable-next-line no-unused-vars
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

    // Function to filer the getAllUsers array to better search for the user the admin wants to find
    // Disabled EsLint here because of error. ask for help!
    const filteredUsers = getAllUsers.filter((val) => {
        if (val.firstName.toLowerCase().includes(searchTerms.toLowerCase())) {
            return val
        }
        return null
    })

    if (isRole) {
        return (
            <main className="my-5 min-vh-60">
                <section className="container my-5">
                    <h1>Search for a user</h1>
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="form-control"
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }}
                    />
                    {/* <div className="my-5"> */}
                    <div className="d-flex justify-content-center flex-column gap-1 container my-5 custom-list rounded">
                        {filteredUsers.map((userData, key) => {
                            return (
                                <ul
                                    className="mb-0"
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={key}
                                >
                                    <li className="list-unstyled d-flex justify-content-center align-items-center px-3 py-2">
                                        <a className="text-white" href={`getUser/${userData._id}`}>
                                            {userData.firstName}
                                        </a>
                                    </li>
                                </ul>
                            )
                        })}
                    </div>
                    {/* </div> */}
                </section>
            </main>
        )
    }

    return <ErrorPage />
}

export default FindUsers

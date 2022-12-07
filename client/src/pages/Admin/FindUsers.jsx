/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import ErrorPage from '../Errorpage'
import * as api from '../../components/utils'
import BackButton from '../../components/BackButton'

function FindUsers() {
    const user = Cookies.get('access_token')
    const navigate = useNavigate()
    const [getUser, setGetUser] = useState([]) // Stores the admins information and verify that it is an admin on this page
    const [getAllUsers, setGetAllUsers] = useState([]) // Stores all the users
    const [searchTerms, setSearchTerm] = useState('') // Stores the admin input
    const [isRole, setIsRole] = useState(Boolean) // Checks if the role is admin

    useEffect(() => {
        async function fetchUserData() {
            const userInfo = await api.checkUser(user)
            if (userInfo.user) {
                setGetUser(userInfo.user)
                if (getUser.role === 'admin') setIsRole(true)
                if (isRole) {
                    const users = await api.getAllUsers(user)
                    setGetAllUsers(users)
                }
            } else {
                Cookies.remove('access_token')
                navigate('/signin')
            }
        }
        if (user) {
            fetchUserData()
        }
    }, [getUser.role, user, isRole, navigate])

    // Function to filer the getAllUsers array to better search for the user the admin wants to find
    const filteredUsers = getAllUsers.filter((val) => {
        if (val.firstName.toLowerCase().includes(searchTerms.toLowerCase())) {
            return val
        }
        return null
    })
    // if the user has the roll of Admin, he/she will have access to the page otherwise the errorPage.jsx will show.
    if (isRole) {
        return (
            <main className="my-5 min-vh-60">
                <BackButton navTo="dashboard" />
                <section className="container my-5">
                    <form>
                        <label className="h1" htmlFor="search">
                            Search for a user
                        </label>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by name"
                            className="form-control"
                            onChange={(event) => {
                                setSearchTerm(event.target.value)
                            }}
                        />
                    </form>
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
                                            <BiUserCircle /> {userData.firstName}
                                        </a>
                                    </li>
                                </ul>
                            )
                        })}
                    </div>
                </section>
            </main>
        )
    }

    return <ErrorPage />
}

export default FindUsers

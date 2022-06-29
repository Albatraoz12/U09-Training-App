import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorPage from './Errorpage'

function UserPage() {
    const navigate = useNavigate()
    const params = useParams()
    const user = Cookies.get('access_token')
    const [getAdmin, setGetAdmin] = useState([])
    const [getUser, setGetUser] = useState([])
    const [isRole, setIsRole] = useState(Boolean)

    useEffect(() => {
        // Fetching admin info
        const checkAdmin = async () => {
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
                        setGetAdmin(res.data.user)
                        if (res.data.user.role === 'admin') {
                            setIsRole(true)
                        } else {
                            setIsRole(false)
                        }
                    }
                })
        }
        // Fetching users information
        const checkUser = async () => {
            // User sends its access_token in headers to BE to be decoded.
            await axios
                .get(`${process.env.REACT_APP_API_URL}admin/getUser/${params.id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    setGetUser(res.data.userData)
                })
        }
        // If user is logged in it will run the functions
        // BUT! if user role is not admin the error page will be displayed.
        if (user) {
            checkAdmin()
            checkUser()
        }
    }, [getAdmin.role, isRole, navigate, params.id, user])

    if (isRole) {
        return (
            <main className="my-5">
                <section className="my-5">
                    <h1>Want to Update or Delete {getUser.firstName}</h1>
                </section>
                {/* Section for update the user information */}
                <section className="container my-5">
                    <h2>Update USERNAME</h2>
                    <form className="row g-3 mt-2">
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">
                                First name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                placeholder="your first name"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">
                                Last name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                placeholder="your last name"
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="example@gmail.com"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password must be 5"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="confirm your password"
                            />
                        </div>
                        <div className="col-md-12 align-self-center">
                            <label htmlFor="role" className="form-label">
                                Choose a role
                            </label>
                            <select
                                className="form-select form-select-md"
                                aria-label=".form-select-sm example"
                                id="role"
                                name="role"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Sign up
                            </button>
                        </div>
                    </form>
                </section>
                <section className="my-5">
                    <h2 className="py-2">Want to Delete the user?</h2>
                    <button className="btn btn-primary btn-lg" type="submit">
                        Delete {getUser.firstName}
                    </button>
                </section>
            </main>
        )
    }
    return <ErrorPage />
}

export default UserPage

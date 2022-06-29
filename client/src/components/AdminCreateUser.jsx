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
    // eslint-disable-next-line no-unused-vars
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const [error, setError] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const { firstName, lastName, email, role, password, confirmPassword } = formData

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
    const validate = (values) => {
        // Empty errors object - data is added if the form is not filled out properly
        const errors = {}
        // Regular expression to validate the email format:
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        // Display error messages if the user submits incorrect data in the form and stop registration from succeeding
        if (!values.firstName) {
            errors.firstName = 'First name is required!'
            setError(true)
        }
        if (!values.lastName) {
            errors.lastName = 'Last name is required!'
            setError(true)
        }
        if (!values.role) {
            errors.role = 'Role is required!'
            setError(true)
        }
        if (!values.email) {
            errors.email = 'Email is required!'
            setError(true)
        } else if (!regex.test(values.email)) {
            errors.email = 'Not a valid email format!'
            setError(true)
        }
        if (!values.password) {
            errors.password = 'Password is required!'
            setError(true)
        } else if (values.password.length < 6) {
            errors.password = 'Password must be more than 6 characters!'
            setError(true)
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Password confirmation is required!'
            setError(true)
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Must be identical to password!'
            setError(true)
        }

        if (Object.keys(errors).length === 0) {
            setError(false)
        }
        return errors
    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formData))
        setSubmitted(true)
    }
    const signup = async (userData) => {
        await axios
            .post(`${process.env.REACT_APP_API_URL}admin/signup`, userData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((res) => {
                if (res.data) {
                    console.log('hejsan')
                }
            })
    }
    if (isRole) {
        return (
            <main className="my-5">
                <section className="container my-3">
                    <h1>Sign Up</h1>
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
                                value={firstName}
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
                                value={lastName}
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
                                value={email}
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
                                value={password}
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
                                value={confirmPassword}
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
                                value={role}
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
            </main>
        )
    }

    return <ErrorPage />
}

export default AdminCreateUser

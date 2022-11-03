import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BiUserCheck } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import ErrorPage from '../Errorpage'

function AdminCreateUser() {
    const navigate = useNavigate()
    const user = Cookies.get('access_token')
    const [getUser, setGetUser] = useState([]) // Stores the admins information and verify that it is an admin on this page
    const [isRole, setIsRole] = useState(Boolean) // checks if the user has the role of admin
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'user',
        password: '',
        confirmPassword: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const [error, setError] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const { firstName, lastName, email, password, confirmPassword } = formData

    // When component mounts, this code will execute first to check the user
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
    }, [error, getUser.role, isRole, navigate, user])
    useEffect(() => {
        const signup = async (userData) => {
            await axios
                .post(`${process.env.REACT_APP_API_URL}admin/signup`, userData, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res.data.message) {
                        // eslint-disable-next-line no-console
                        console.log(res)
                        navigate('/dashboard')
                    } else {
                        // eslint-disable-next-line no-alert
                        alert('Email is already in user, Try an otherOne')
                        window.location.reload()
                    }
                })
        }
        if (error === false) {
            signup(formData)
        }
    }, [error, formData, user, navigate])

    // Before signing up an new user, the validate function will validate that the admin has filled in
    // all the feilds with correct information.

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

    // Saves users input into formData variabel
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // When the form is subbmitted, it will go through the validation and if errors.length is 0,
    // Then the signup will post the information to the backend
    const onSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formData))
        setSubmitted(true)
    }

    // this will log if there is no errors when user hits sign up.
    const successmessage = () => {
        // eslint-disable-next-line no-console
        console.log('Registration no errors')
    }

    // if the user has the roll of Admin, he/she will have access to the page otherwise the errorPage.jsx will show.
    if (isRole) {
        return (
            <main className="my-5">
                <div className="d-flex align-self-start ms-5">
                    <a
                        href="/dashboard"
                        role="button"
                        className="btn btn-primary btn-sm"
                        rel="noopener noreferrer"
                    >
                        Go back
                    </a>
                </div>
                <section className="container my-3">
                    <h1>Create User</h1>
                    {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
                    {Object.keys(formErrors).length === 0 && submitted ? successmessage() : <></>}
                    <form className="row g-3 mt-2">
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">
                                First name
                            </label>
                            <p>{formErrors.firstName}</p>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                placeholder="your first name"
                                onChange={onChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">
                                Last name
                            </label>
                            <p>{formErrors.lastName}</p>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                placeholder="your last name"
                                onChange={onChange}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <p>{formErrors.email}</p>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                value={email}
                                placeholder="example@gmail.com"
                                onChange={onChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <p>{formErrors.password}</p>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Password must be 5"
                                onChange={onChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <p>{formErrors.confirmPassword}</p>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="confirm your password"
                                onChange={onChange}
                            />
                        </div>
                        <div className="col-12">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                onClick={onSubmit}
                            >
                                <BiUserCheck size={30} color="yellow" /> Create User
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

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorModal from '../components/modal/ErrorModal'

function Signup() {
    const navigate = useNavigate()
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [formErrors, setFormErrors] = useState({}) // stores the errors in array if accured
    const [error, setError] = useState(true) // errors are true because all fields are empty on mount, will not display anything
    const [submitted, setSubmitted] = useState(false)
    const { firstName, lastName, email, password, confirmPassword } = formData

    // Before signing up, the validate function will validate that the user has filled in
    // all the fields with correct information.
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

    useEffect(() => {
        const signup = (userData) => {
            axios
                .post(`${process.env.REACT_APP_API_URL}user/signup`, userData)
                .then((res) => {
                    if (res.data.message) navigate('/signin')
                })
                .catch(() => {
                    setErrorMessage('Email is already in use, Try another one')
                    setErrorModal(true)
                })
        }
        if (error === false) {
            signup(formData)
        }
    }, [error, formData, navigate])

    const successmessage = () => {
        // Disable the no-console rule for the next line
        /* eslint-disable no-console */
        console.log('Registration no errors')
    }

    return (
        <main className="my-5">
            <section className="container my-3">
                <h1 className="text-center">Sign Up</h1>
                {Object.keys(formErrors).length === 0 && submitted ? successmessage() : ''}
                <div className="d-flex align-items-center justify-content-center">
                    {errorModal && (
                        <ErrorModal setErrorModal={setErrorModal} setErrorMessage={errorMessage} />
                    )}
                </div>
                <form className="row g-3 mt-2" onSubmit={onSubmit}>
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
                            placeholder="Your first name"
                            onChange={onChange}
                        />
                        {formErrors.firstName && (
                            <p className="validation-message">{formErrors.firstName}</p>
                        )}
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
                            placeholder="Your last name"
                            onChange={onChange}
                        />
                        {formErrors.lastName && (
                            <p className="validation-message">{formErrors.lastName}</p>
                        )}
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
                            onChange={onChange}
                        />
                        {formErrors.email && (
                            <p className="validation-message">{formErrors.email}</p>
                        )}
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
                            onChange={onChange}
                        />
                        {formErrors.password && (
                            <p className="validation-message">{formErrors.password}</p>
                        )}
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
                            placeholder="Confirm your password"
                            onChange={onChange}
                        />
                        {formErrors.confirmPassword && (
                            <p className="validation-message">{formErrors.confirmPassword}</p>
                        )}
                    </div>
                    {!errorModal && (
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Sign in
                            </button>
                        </div>
                    )}
                </form>
            </section>
        </main>
    )
}

export default Signup

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const navigate = useNavigate()
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
    const { firstName, lastName, email, password, confirmPassword } = formData
    useEffect(() => {
        const signup = async (userData) => {
            await axios.post(`${process.env.REACT_APP_API_URL}user/signup`, userData)
        }
        if (error === false) {
            signup(formData)
        }
    }, [error, formData])

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
        if (!values.city) {
            errors.city = 'City is required!'
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
    const successmessage = () => {
        alert('Registration successful!')
        navigate('/singin')
    }
    return (
        <main className="container my-5">
            <section className="my-3">
                <h1>Sign Up</h1>
                {Object.keys(formErrors).length === 0 && submitted ? successmessage() : null}
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
                        <p>{formErrors.firstName}</p>
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
                        <p>{formErrors.firstName}</p>
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
                        <p>{formErrors.firstName}</p>
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
                        <p>{formErrors.firstName}</p>
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
                        <button type="submit" className="btn btn-primary btn-lg" onClick={onSubmit}>
                            Sign in
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Signup

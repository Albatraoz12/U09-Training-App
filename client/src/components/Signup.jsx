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
        const register = async (userData) => {
            await axios
                .post(`${process.env.REACT_APP_API_URL}user/register`, userData)
                .then((res) => console.log(res))
        }
        if (error === false) {
            register(formData)
        }
    }, [error, formData])
    return (
        <main className="container my-5">
            <section className="my-3">
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
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Sign in
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Signup

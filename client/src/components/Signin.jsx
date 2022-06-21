import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    return (
        <main className="container my-5">
            <section className="my-5 pb-1">
                <h1>Sign In</h1>
                <form className="d-flex justify-content-center row g-3 my-3">
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                        />
                    </div>
                    <div className="col-12 pb-5">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Sign in
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Signin

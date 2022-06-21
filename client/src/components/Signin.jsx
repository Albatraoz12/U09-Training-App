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

    // Login function
    const login = async (userData) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/signin`, userData)
        if (response.data.token) {
            navigate('/dashboard')
            window.location.reload()
        } else {
            // eslint-disable-next-line no-alert
            alert('Email or password incorrect')
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        login(userData)
    }
    // Logout
    const onLogout = async () => {
        // Send token info in headers to backend to let user logout. Backend will remove HTTPOnly cookies
        await axios
            .get(`${process.env.REACT_APP_API_URL}user/signout`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data) {
                    console.log('successfully Logged Out!')
                    // window.location.reload()
                }
            })
    }
    return (
        <main className="container my-5">
            <section className="my-5 pb-1">
                <h1>Sign In</h1>
                <form className="d-flex justify-content-center row g-3 my-3" onSubmit={onSubmit}>
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
                            onChange={onChange}
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
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-12 pb-5">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Sign in
                        </button>
                    </div>
                </form>
                {/* Temporary here */}
                <button type="submit" className="btn btn-primary" onClick={onLogout}>
                    Sign Out
                </button>
            </section>
        </main>
    )
}

export default Signin

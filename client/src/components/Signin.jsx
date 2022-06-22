import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function Signin() {
    // const navigate = useNavigate()
    // const user = Cookies.get('access_token')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    // Login function
    const login = async (userData) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/signin`, userData, {
            withCredentials: true,
        })
        if (response.data.token) {
            // eslint-disable-next-line no-console
            console.log(response.data.token)
            Cookies.set('access_token', response.data.token)
            // navigate('/dashboard')
            // window.location.reload()
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
    const onLogout = async () => {
        try {
            // Send token info in headers to backend to let user logout. Backend will remove HTTPOnly cookies
            await axios
                .get(`${process.env.REACT_APP_API_URL}user/signout`, {
                    withCredentials: true,
                    headers: {
                        Cookie: 'access_token',
                    },
                })
                .then((res) => {
                    if (res) {
                        // FrontEnd removed access_token from cookies("localstorage").
                        // Cookies.remove('access_token')
                        // eslint-disable-next-line no-console
                        console.log('successfully Logged Out!')
                    }
                })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
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

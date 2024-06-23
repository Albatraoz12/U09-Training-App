import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import ErrorModal from '../modal/ErrorModal'
import { login } from '../utils'

function SigninForm() {
    const navigate = useNavigate()
    const token = Cookies.get('access_token')
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const userData = {
            email,
            password,
        }

        const signin = await login(userData)
        if (signin.token) {
            Cookies.set('access_token', signin.token, { expires: 1 })
            navigate('/dashboard')
        } else {
            setErrorModal(true)
            setErrorMessage('Email or password incorrect')
        }
    }
    useEffect(() => {
        if (token) navigate('/')
    }, [token, navigate])

    return (
        <main className="container d-flex flex-column justify-content-center align-items-center">
            <section className="my-5 pb-1 w-50">
                <h1 className="text-center">Sign In</h1>
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
                    <div className="col-12 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Sign in
                        </button>
                    </div>
                </form>
                {errorModal && (
                    <div className="d-flex align-items-center justify-content-center">
                        <ErrorModal setErrorModal={setErrorModal} errorMessage={errorMessage} />
                    </div>
                )}
            </section>
        </main>
    )
}

export default SigninForm

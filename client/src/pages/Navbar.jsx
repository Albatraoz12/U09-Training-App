import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import logo from '../assets/logo-test.png'

function Navbar() {
    const navigate = useNavigate()
    const user = Cookies.get('access_token')
    const onLogout = () => {
        try {
            // Send token info in headers to backend to let user logout. Backend will remove HTTPOnly cookies
            axios
                .get(`${process.env.REACT_APP_API_URL}user/signout`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res) {
                        Cookies.remove('access_token') // FrontEnd removed access_token from cookies
                        navigate('/signin')
                        window.location.reload()
                    }
                })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="DTrain Logo, go Home" height={35} width={35} />
                    DTrain
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link fw-bold text-white"
                                aria-current="page"
                                to="/search"
                            >
                                Search
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold text-white" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link fw-bolder text-white btn btn-danger btn-sm"
                                        type="button"
                                        onClick={onLogout}
                                        aria-label="sign out button"
                                    >
                                        logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold text-white" to="/signin">
                                        Sign In
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold text-white" to="/signup">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

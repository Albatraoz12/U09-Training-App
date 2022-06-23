import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import logo from '../assets/logo-test.png'

function Navbar() {
    const user = Cookies.get('access_token')
    const onLogout = async () => {
        try {
            // Send token info in headers to backend to let user logout. Backend will remove HTTPOnly cookies
            await axios
                .get(`${process.env.REACT_APP_API_URL}user/signout`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res) {
                        // FrontEnd removed access_token from cookies("localstorage").
                        Cookies.remove('access_token')
                        // window.location.reload()
                        // eslint-disable-next-line no-console
                        console.log('Success: successfully Logged Out!')
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
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="DTrain Logo, go Home" height={35} width={35} />
                    DTrain
                </a>
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
                            <a
                                className="nav-link fw-bold text-white"
                                aria-current="page"
                                href="/search"
                            >
                                Search
                            </a>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link fw-bold text-white" href="/dashboard">
                                        Dashboard
                                    </a>
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
                                    <a className="nav-link fw-bold text-white" href="/signin">
                                        Sign In
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-bold text-white" href="/signup">
                                        Sign Up
                                    </a>
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

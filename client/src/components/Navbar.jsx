import React from 'react'
import Cookies from 'js-cookie'
import logo from '../assets/logo-test.png'

function Navbar() {
    const user = Cookies.get('access_token')

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
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
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
                                    <a className="nav-link fw-bold text-white" href="/login">
                                        logout
                                    </a>
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

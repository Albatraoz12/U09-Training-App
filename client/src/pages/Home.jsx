import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

function Home() {
    const token = Cookies.get('access_token')
    return (
        <main className="home-bg">
            <div className="overlay" />
            <div className="container home-wrapper">
                <h1>Welcome to DTrain!</h1>
                <p>
                    Discover a variety of exercises and learn the correct techniques to execute
                    them.
                </p>
                <p>
                    Get started by{' '}
                    <Link className="text-white fw-bolder" to="/search">
                        searching for exercises here →
                    </Link>
                </p>
                {token ? (
                    <p>
                        Go back to your{' '}
                        <Link className="text-white fw-bolder" to="/dashboard">
                            dashboard
                        </Link>
                    </p>
                ) : (
                    <>
                        <p className="mt-2">
                            Save your favorite exercises or create custom exercise lists.
                        </p>
                        <Link className="btn btn-primary mb-1" to="/signup">
                            Get started by Signing Up Here
                        </Link>
                        <p className="my-5 pb-5">
                            Already a member?{' '}
                            <Link className="text-white fw-bolder" to="/signin">
                                Sign in Here →
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </main>
    )
}

export default Home

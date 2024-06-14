import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

function Home() {
    const token = Cookies.get('access_token')
    return (
        <main className="w-auto mx-auto mb-5">
            <article className="container mx-auto my-5 pb-5">
                <h1>Welcome to DTrain!</h1>
                <p>Here you will be able to find exercises and how to execute them correcly.</p>
                <p>
                    You can start{' '}
                    <Link className="text-white fw-bolder" to="/search">
                        {' '}
                        searching here
                    </Link>
                </p>
                {token ? (
                    <p>
                        Go Back to{' '}
                        <Link className="text-white fw-bolder" to="/dashboard">
                            {' '}
                            Dashboard here
                        </Link>
                    </p>
                ) : (
                    <>
                        <p className="mt-2">
                            Do you want to save exercises or maybe create a list with exercises?
                        </p>
                        <Link className="btn btn-primary mb-1" to="/signup">
                            Get started by Signing Up Here
                        </Link>
                        <p className="my-5 pb-5">
                            Already Signed Up,{' '}
                            <Link className="text-white fw-bolder" to="/signin">
                                {' '}
                                Sign in Here
                            </Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    )
}

export default Home

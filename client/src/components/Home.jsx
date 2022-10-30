import React from 'react'
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
                    <a className="text-white fw-bolder" href="/search">
                        {' '}
                        searching here
                    </a>
                </p>
                {token ? (
                    <p>
                        Go Back to{' '}
                        <a className="text-white fw-bolder" href="/dashboard">
                            {' '}
                            Dashboard here
                        </a>
                    </p>
                ) : (
                    <>
                        <p className="mt-2">
                            Do you want to save exercises or maybe create a list with exercises?
                        </p>
                        <a className="btn btn-primary mb-1" href="/signup">
                            Get started by Signing Up Here
                        </a>
                        <p className="my-5 pb-5">
                            Already Signed Up,{' '}
                            <a className="text-white fw-bolder" href="/signin">
                                {' '}
                                Sign in Here
                            </a>
                        </p>
                    </>
                )}
            </article>
        </main>
    )
}

export default Home

import React from 'react'

function Home() {
    return (
        <main className="w-auto mx-auto">
            <article className="container mx-auto mt-5">
                <div className="container">
                    <h1>Welcome to DTrain!</h1>
                    <p>Here you will be able to find exercises and how to execute them correcly.</p>
                    <p>
                        You can start{' '}
                        <a className="text-white fw-bolder" href="/search">
                            {' '}
                            searching here
                        </a>
                    </p>
                    <p>Do you want to save exercises or maybe create a list with exercises?</p>
                    <a className="btn btn-primary mb-1" href="/signup">
                        Get started by Signing Up Here
                    </a>
                    <p>
                        Already Signed Up,{' '}
                        <a className="text-white fw-bolder" href="/signin">
                            {' '}
                            Sign in Here
                        </a>
                    </p>
                </div>
            </article>
        </main>
    )
}

export default Home

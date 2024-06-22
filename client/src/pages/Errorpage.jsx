import React from 'react'
import { Link } from 'react-router-dom'

function Errorpage() {
    return (
        <main className="container my-5">
            <section className="d-flex justify-content-center align-items-start flex-column py-5 gap-4">
                <h1>Oooops!</h1>
                <p>
                    We can&apos;t seem to find the <br />
                    page you&apos;re looking for.
                </p>

                <p>Error code: 404</p>

                <Link to="/" className="btn btn-primary">
                    Click Here to go back to home
                </Link>
            </section>
        </main>
    )
}

export default Errorpage

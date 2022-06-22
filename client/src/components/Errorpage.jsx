import React from 'react'

function Errorpage() {
    return (
        <main className="container my-5 py-5">
            <section className="d-flex justify-content-center align-items-start flex-column py-5">
                <h1>Oooops!</h1>
                <p>
                    We can&apos;t seem to find the <br />
                    page you&apos;re looking for.
                </p>

                <p className="text-danger">Error code: 404</p>

                <a href="/" className="btn btn-primary">
                    Click Here to go back come
                </a>
            </section>
        </main>
    )
}

export default Errorpage

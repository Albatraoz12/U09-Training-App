import React from 'react'

function Footer() {
    return (
        <footer className="text-center text-white">
            <div className="container mt-5">
                <section className="">
                    {/* Instagram */}
                    <a
                        className="btn btn-outline-light btn-floating m-1"
                        href="https://www.instagram.com/androomeda12/"
                        role="button"
                    >
                        <i className="bi bi-instagram" />
                    </a>
                    {/* LinkedIn */}
                    <a
                        className="btn btn-outline-light btn-floating m-1"
                        href="https://www.linkedin.com/in/dimosthenis-emmanouil-4ba731207/"
                        role="button"
                    >
                        <i className="bi bi-linkedin" />
                    </a>
                    {/* GitHub */}
                    <a
                        className="btn btn-outline-light btn-floating m-1"
                        href="https://github.com/Albatraoz12"
                        role="button"
                    >
                        <i className="bi bi-github" />
                    </a>
                    <h1 className="mt-3 fs-4 text-decoration-underline">Socials</h1>
                </section>
                <section>
                    <h2 className="f2-4">&copy; Dimosthenis Emmanouil</h2>
                </section>
            </div>
        </footer>
    )
}

export default Footer

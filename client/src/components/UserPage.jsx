import React from 'react'

function UserPage() {
    return (
        <main className="my-5">
            <section className="my-5">
                <h1>Want to Update or Delete Username?</h1>
            </section>
            {/* Section for update the user information */}
            <section className="container my-5">
                <h2>Update USERNAME</h2>
                <form className="row g-3 mt-2">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">
                            First name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            placeholder="your first name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                            Last name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            placeholder="your last name"
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password must be 5"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="confirm your password"
                        />
                    </div>
                    <div className="col-md-12 align-self-center">
                        <label htmlFor="role" className="form-label">
                            Choose a role
                        </label>
                        <select
                            className="form-select form-select-md"
                            aria-label=".form-select-sm example"
                            id="role"
                            name="role"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Sign up
                        </button>
                    </div>
                </form>
            </section>
            <section className="my-5">
                <h2 className="py-2">Want to Delete the user?</h2>
                <button className="btn btn-primary btn-lg" type="submit">
                    Delete the USERNAME
                </button>
            </section>
        </main>
    )
}

export default UserPage

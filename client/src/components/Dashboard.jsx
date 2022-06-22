import React from 'react'

function Dashboard() {
    return (
        <main className="py-5">
            <div className="container">
                <section className=" my-5">
                    <h1>Welcome User</h1>
                    <p>
                        Hope you have a wonderfull day <br /> Lets the workout start!
                    </p>
                </section>
                <section className="container">
                    <form className="d-flex justify-content-center row gap-1 my-3">
                        <div className="d-flex align-items-center justify-content-center">
                            <label htmlFor="createList" className="fs-2">
                                Create List
                            </label>
                            <button
                                className="bi bi-plus-circle btn btn-light btn-lg"
                                type="button"
                                aria-label="Create list"
                            />
                        </div>
                        <input
                            type="text"
                            className="col-md-6 col-sm-auto rounded form-control-lg"
                            id="createList"
                            placeholder="Enter a title for your list"
                        />
                        <button
                            className="btn btn-primary col-md-6 col-sm-auto rounded"
                            type="submit"
                        >
                            Create
                        </button>
                    </form>
                </section>
                <section>
                    <div>
                        <h2>Your Lists</h2>
                        <ul className="d-flex justify-content-center flex-column list-unstyled">
                            <li>
                                <a className="text-white" href="/">
                                    ListName1
                                </a>
                            </li>
                            <li>
                                <a className="text-white" href="/">
                                    ListName2
                                </a>
                            </li>
                            <li>
                                <a className="text-white" href="/">
                                    ListName3
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Dashboard

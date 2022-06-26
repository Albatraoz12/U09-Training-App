import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const user = Cookies.get('access_token')
    const navigate = useNavigate()
    const [getUser, setGetUser] = useState({})

    // When dashboard loads, it will fetch the users: Information, Books and loaned books
    useEffect(() => {
        const checkUser = async () => {
            // User sends its access_token in headers to BE to be decoded.
            await axios
                .get(`${process.env.REACT_APP_API_URL}user/protected`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res.data.user) {
                        // Stores user info into the state.
                        setGetUser(res.data.user)
                    }
                })
        }
        if (!user) {
            navigate('/')
        } else {
            checkUser()
        }
    }, [user, navigate])
    return (
        <main className="py-5">
            <div className="container">
                <section className=" my-5">
                    <h1>Welcome {getUser.firstName}</h1>
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
                        <ul className="d-flex justify-content-center flex-column list-unstyled gap-1">
                            <li className="d-flex justify-content-center align-items-center gap-2">
                                <a className="text-white" href="/userList/1">
                                    ListName1
                                </a>
                                <button
                                    type="button"
                                    className="bi bi-pencil-square btn btn-danger"
                                    aria-label="remove list"
                                />
                                <button
                                    type="button"
                                    className="bi bi-x-lg btn btn-danger"
                                    aria-label="remove list"
                                />
                            </li>
                            <li className="d-flex justify-content-center align-items-center gap-2">
                                <a className="text-white" href="/userList/1">
                                    ListName2
                                </a>
                                <button
                                    type="button"
                                    className="bi bi-pencil-square btn btn-danger"
                                    aria-label="remove list"
                                />
                                <button
                                    type="button"
                                    className="bi bi-x-lg btn btn-danger"
                                    aria-label="remove list"
                                />
                            </li>
                            <li className="d-flex justify-content-center align-items-center gap-2">
                                <a className="text-white" href="/userList/1">
                                    ListName3
                                </a>
                                <button
                                    type="button"
                                    className="bi bi-pencil-square btn btn-danger"
                                    aria-label="remove list"
                                />
                                <button
                                    type="button"
                                    className="bi bi-x-lg btn btn-danger"
                                    aria-label="remove list"
                                />
                            </li>
                        </ul>
                    </div>
                </section>
                <section>
                    <h2>Your Saves</h2>
                    <div>
                        <ul className="d-flex justify-content-center flex-column list-unstyled gap-1">
                            <li className="d-flex justify-content-center align-items-center gap-2">
                                <a className="text-white" href="/exercise/1">
                                    Save 1
                                </a>
                                <button
                                    type="button"
                                    className="bi bi-x-lg btn btn-danger"
                                    aria-label="remove list"
                                />
                            </li>
                            <li className="d-flex justify-content-center align-items-center gap-2">
                                <a className="text-white" href="/exercise/1">
                                    Save 2
                                </a>
                                <button
                                    type="button"
                                    className="bi bi-x-lg btn btn-danger"
                                    aria-label="remove list"
                                />
                            </li>
                            <li className="d-flex justify-content-center align-items-center gap-2">
                                <a className="text-white" href="/exercise/1">
                                    Save 3
                                </a>
                                <button
                                    type="button"
                                    className="bi bi-x-lg btn btn-danger"
                                    aria-label="remove list"
                                />
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Dashboard

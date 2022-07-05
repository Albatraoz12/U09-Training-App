import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const user = Cookies.get('access_token')
    const navigate = useNavigate()
    const [getUser, setGetUser] = useState([])
    const [isRole, setIsRole] = useState(Boolean)
    const [getUserList, setGetUserList] = useState([])
    const [getUserSaves, setGetUserSaves] = useState([])
    const [formData, setFormData] = useState({
        title: '',
    })

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
                        if (res.data.user.role === 'admin') {
                            setIsRole(true)
                        } else {
                            setIsRole(false)
                        }
                    }
                })
        }
        const getLists = async () => {
            await axios
                .get(`${process.env.REACT_APP_API_URL}userList/${getUser.id}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.data.message) {
                        // Stores user info into the state.
                        setGetUserList(res.data.message)
                    }
                })
        }

        const getSaves = async () => {
            await axios
                .get(`${process.env.REACT_APP_API_URL}userSaves/saves/${getUser.id}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.data.sInfo) {
                        // Stores user info into the state.
                        setGetUserSaves(res.data.sInfo)
                    }
                })
        }
        if (!user) {
            navigate('/')
        } else {
            checkUser()
            if (getUser.id) {
                getLists()
                getSaves()
            }
        }
    }, [user, navigate, getUser.id])

    const { title } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const createList = async (userData) => {
        await axios
            .post(`${process.env.REACT_APP_API_URL}userList/createList/${getUser.id}`, userData, {
                withCredentials: true,
            })
            .then((res) => {
                if (res) {
                    window.location.reload()
                }
            })
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            title,
        }

        createList(userData)
    }

    const deleteList = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}userList/${id}`).then((res) => {
            if (res) {
                window.location.reload()
            }
        })
    }

    const deleteSaved = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_API_URL}userSaves/deletesaved/${id}`)
            .then((res) => {
                if (res) {
                    window.location.reload()
                }
            })
    }
    return (
        <main className="py-5">
            <div className="container">
                <section className=" my-5">
                    <h1>Welcome {getUser.firstName}</h1>
                    <p>
                        Hope you have a wonderfull day <br /> Lets the workout start!
                    </p>
                    {isRole ? (
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <a className="btn btn-primary" href="/createUser">
                                Create an User
                            </a>
                            <a className="btn btn-primary" href="/findUsers">
                                Find an User
                            </a>
                        </div>
                    ) : null}
                </section>
                <section className="container">
                    <form
                        className="d-flex justify-content-center row gap-1 my-3"
                        onSubmit={onSubmit}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                            <label htmlFor="title" className="fs-2">
                                Create List
                            </label>
                            <input
                                type="text"
                                className="col-md-6 col-sm-auto rounded form-control-lg"
                                id="title"
                                placeholder="Enter a title for your list"
                                name="title"
                                onChange={onChange}
                            />
                            <button
                                className="btn btn-primary col-md-6 col-sm-auto rounded"
                                type="submit"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </section>
                <section className="container mb-3">
                    <div>
                        <h2>Your Lists</h2>

                        <div className="d-flex justify-content-center flex-column gap-1 container">
                            {getUserList.map((lists, index) => {
                                return (
                                    // eslint wont accept index as a key. to eliminete the console error
                                    // I disabled this line
                                    <div
                                        className="custom-list rounded"
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={index}
                                    >
                                        <ul className="mb-0">
                                            <li className="list-unstyled d-flex justify-content-between align-items-center px-3 py-2">
                                                <a
                                                    className="text-white"
                                                    // eslint-disable-next-line no-underscore-dangle
                                                    href={`/userList/${lists.title}/${lists._id}`}
                                                >
                                                    {lists.title}
                                                </a>
                                                <button
                                                    type="submit"
                                                    className="bi bi-x-lg btn btn-danger"
                                                    aria-label="remove list"
                                                    onClick={() => {
                                                        // eslint-disable-next-line no-underscore-dangle
                                                        deleteList(lists._id)
                                                    }}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Your Saves</h2>
                    <div>
                        <ul className="d-flex justify-content-center flex-column list-unstyled gap-1">
                            {getUserSaves.map((saves, index) => {
                                return (
                                    <li
                                        className="d-flex justify-content-center align-items-center gap-2"
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={index}
                                    >
                                        <a className="text-white" href={`/exercise/${saves.exId}`}>
                                            {saves.name}
                                        </a>
                                        <button
                                            type="button"
                                            className="bi bi-x-lg btn btn-danger"
                                            aria-label="remove list"
                                            onClick={() => {
                                                // eslint-disable-next-line no-underscore-dangle
                                                deleteSaved(saves._id)
                                            }}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Dashboard

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Modal from './modal/Modal'
import ErrorModal from './modal/ErrorModal'
import * as api from './utils'

function Dashboard() {
    const user = Cookies.get('access_token')
    const navigate = useNavigate()
    const [getUser, setGetUser] = useState([]) // Stores user information
    const [isRole, setIsRole] = useState(Boolean) // if set to true, the user is a Admin else User
    const [getUserList, setGetUserList] = useState([]) // Stores users lists
    const [getUserSaves, setGetUserSaves] = useState([]) // Stores all the users saved/liked exercises
    const [formData, setFormData] = useState({
        title: '',
    })
    const [modalOpen, setModalOpen] = useState(false) // Checks if modal is open or not
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // When dashboard loads, it will fetch the user, its lists and its saved exercises
    useEffect(() => {
        const checkUser = () => {
            // User sends its access_token in headers to BE to be decoded.
            axios
                .get(`${process.env.REACT_APP_API_URL}user/protected`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res.data.user) {
                        setGetUser(res.data.user) // Stores user info into the state.
                        if (res.data.user.role === 'admin') setIsRole(true)
                    }
                })
                .catch(() => {
                    setErrorModal(true)
                    setErrorMessage('Danger, Danger!')
                })
        }
        // Fetch users lists
        const getLists = () => {
            axios
                .get(`${process.env.REACT_APP_API_URL}userList/${getUser.id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res.data.message) setGetUserList(res.data.message) // Stores user info into the state.
                })
        }
        // fetch all the usesr saved exercises
        const getSaves = () => {
            axios
                .get(`${process.env.REACT_APP_API_URL}userSaves/saves/${getUser.id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res.data.sInfo) setGetUserSaves(res.data.sInfo) // Stores user info into the state.
                })
        }
        // If there is no access token, the user will be redirected to homepage else fetch all the user data.
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

    // variable and function to create a list
    const { title } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    // Function to create a user list
    const createList = (userData) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}userList/createList/${getUser.id}`, userData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((res) => {
                if (res) setModalOpen(true)
            })
            .catch(() => {
                setErrorModal(true)
                setErrorMessage('Please put in a title')
            })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            title,
        }
        createList(userData)
    }

    return (
        <main className="py-5">
            <div className="container">
                <section className=" my-5">
                    <h1>Welcome {getUser.firstName}</h1>
                    <p>
                        Hope you have a wonderfull day <br /> Let the workout start!
                    </p>
                    {/* If User is an admin, the two buttons bellow will appear otherwise null */}
                    {isRole ? (
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <a className="btn btn-primary" href="/createUser">
                                Create an User
                            </a>
                            <a className="btn btn-primary" href="/findUsers">
                                Find an User
                            </a>
                        </div>
                    ) : (
                        ''
                    )}
                </section>
                <section className="container">
                    <form
                        className="d-flex justify-content-center row gap-1 my-3 col-12"
                        onSubmit={onSubmit}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                            <label htmlFor="title" className="fs-2">
                                Create List
                            </label>

                            <input
                                type="text"
                                className="col-md-6 rounded form-control-lg"
                                id="title"
                                placeholder="Enter a title for your list"
                                name="title"
                                onChange={onChange}
                            />
                            <button
                                className="btn btn-primary col-md-3 col-sm-auto rounded"
                                type="submit"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </section>
                <section className="container mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                        {modalOpen && <Modal setOpenModal={setModalOpen} />}
                        {errorModal && (
                            <ErrorModal
                                setErrorModal={setErrorModal}
                                setErrorMessage={errorMessage}
                            />
                        )}
                    </div>
                    <div>
                        <h2>Your Lists</h2>

                        <div className="d-flex justify-content-center flex-column gap-1 container">
                            {getUserList.map((lists, index) => {
                                return (
                                    <div
                                        className="custom-list rounded" // eslint wont accept index as a key. to eliminete the console error I disabled this line
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
                                                        api.deleteList(lists._id, user)
                                                        window.location.reload()
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
                        <div className="d-flex justify-content-center flex-column gap-1 container">
                            {getUserSaves.map((saves, index) => {
                                return (
                                    <ul
                                        className="mb-0"
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={index}
                                    >
                                        <li className="list-unstyled d-flex justify-content-between align-items-center px-3 py-2">
                                            <a
                                                className="text-white"
                                                href={`/exercise/${saves.exId}`}
                                            >
                                                {saves.name}
                                            </a>
                                            <button
                                                type="submit"
                                                className="bi bi-x-lg btn btn-danger"
                                                aria-label="remove saved exercise"
                                                onClick={() => {
                                                    // eslint-disable-next-line no-underscore-dangle
                                                    api.deleteSave(saves._id, user)
                                                    window.location.reload()
                                                }}
                                            />
                                        </li>
                                    </ul>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Dashboard

/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/modal/Modal'
import ErrorModal from '../components/modal/ErrorModal'
import * as api from '../components/utils'
import List from '../components/List'
import Saves from '../components/Saves'

function Dashboard() {
    const token = Cookies.get('access_token')
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
    useEffect(() => {
        async function fetchUserData() {
            const userInfo = await api.checkUser(token)
            setGetUser(userInfo.user)
            if (getUser.role === 'admin') setIsRole(true)
            if (getUser.id) {
                const userSaved = await api.getSaves(getUser.id, token)
                setGetUserSaves(userSaved)
                const userLists = await api.getLists(getUser.id, token)
                setGetUserList(userLists)
            }
        }
        if (!token) {
            navigate('/signin')
        }
        fetchUserData()
    }, [token, navigate, getUser.id, getUser.role])
    // variable and function to create a list
    const { title } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const userData = {
            title,
        }
        const newList = await api.createList(getUser.id, token, userData)
        if (newList.message) {
            setModalOpen(true)
        } else {
            setErrorModal(true)
            setErrorMessage('please put in a title')
        }
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
                            {getUserList.map((lists) => {
                                return <List lists={lists} key={lists._id} />
                            })}
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Your Saves</h2>
                    <div>
                        <div className="d-flex justify-content-center flex-column gap-1 container">
                            {getUserSaves.map((saves) => {
                                return <Saves save={saves} key={saves._id} />
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Dashboard

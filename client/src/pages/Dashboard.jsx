/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { BiListCheck, BiUserCheck, BiUserCircle, BiX } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../components/modal/Modal'
import ErrorModal from '../components/modal/ErrorModal'
import { createList } from '../components/utils'
import List from '../components/List'
import Saves from '../components/Saves'
import { UserContext } from '../context/UserProvider'

function Dashboard() {
    const { user, token, userLists, userSaves } = useContext(UserContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
    })
    const [modalOpen, setModalOpen] = useState(false) // Checks if modal is open or not
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [create, setCreate] = useState(false)
    const [isRole, setIsRole] = useState(false) // if set to true, the user is an Admin else User

    useEffect(() => {
        const fetchUserData = async () => {
            if (token && user) {
                if (user.role === 'admin') {
                    setIsRole(true)
                }
            } else {
                Cookies.remove('access_token')
                navigate('/signin')
            }
        }
        fetchUserData()
    }, [navigate, user, token])

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
        const newList = await createList(user.id, token, userData)
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
                <section className="my-5">
                    <h1>Welcome {user?.firstName}</h1>
                    <p>
                        Hope you have a wonderful day <br /> Let the workout start!
                    </p>
                    {isRole && (
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <Link className="btn btn-primary" to="/createUser">
                                <BiUserCheck /> Create a User
                            </Link>
                            <Link className="btn btn-primary" to="/findUsers">
                                <BiUserCircle /> Find a User
                            </Link>
                        </div>
                    )}
                </section>
                {create ? (
                    <section className="container">
                        <form
                            className="d-flex justify-content-center row gap-1 my-3"
                            onSubmit={onSubmit}
                        >
                            <div className="d-flex align-items-center justify-content-center">
                                <label htmlFor="title" className="fs-2">
                                    Create List <BiX color="red" onClick={() => setCreate(false)} />
                                </label>
                            </div>
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
                                Create <BiListCheck />
                            </button>
                        </form>
                    </section>
                ) : (
                    <button
                        className="btn btn-primary col-md-3 col-sm-auto rounded my-3"
                        type="submit"
                        onClick={() => setCreate(true)}
                    >
                        Create a list <BiListCheck />
                    </button>
                )}
                <section className="container mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                        {modalOpen && <Modal setOpenModal={setModalOpen} />}
                        {errorModal && (
                            <ErrorModal setErrorModal={setErrorModal} errorMessage={errorMessage} />
                        )}
                    </div>
                    <h2>Your Lists</h2>
                    <div className="d-flex justify-content-center flex-column gap-1 container">
                        {userLists.map((lists) => (
                            <List lists={lists} key={lists._id} getUserId={user.id} />
                        ))}
                    </div>
                </section>
                <section>
                    <h2>Your Saves</h2>

                    <div className="d-flex justify-content-center flex-column gap-1 container">
                        {userSaves.map((saves) => (
                            <Saves save={saves} key={saves._id} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Dashboard

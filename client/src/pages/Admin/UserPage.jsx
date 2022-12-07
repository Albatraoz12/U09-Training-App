import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BiUserMinus, BiUserCheck } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorPage from '../Errorpage'
import * as api from '../../components/utils'
import BackButton from '../../components/BackButton'

function UserPage() {
    const navigate = useNavigate()
    const params = useParams()
    const user = Cookies.get('access_token')
    const [getAdmin, setGetAdmin] = useState([]) // Stores the admins information and verify that it is an admin on this page
    const [isRole, setIsRole] = useState(Boolean) // checks if the user has the role of admin
    const [formData, setFormData] = useState({})
    const { firstName, lastName, email, role } = formData

    // when component mounts, the functions will run.
    useEffect(() => {
        async function fetchUserData() {
            const adminInfo = await api.checkUser(user)
            if (adminInfo.user) {
                setGetAdmin(adminInfo.user)
                if (getAdmin.role === 'admin') setIsRole(true)
                if (isRole) {
                    const userInfo = await api.fetchUserData(params.id, user)
                    if (userInfo) setFormData(userInfo.userData)
                }
            } else {
                Cookies.remove('access_token')
                navigate('/signin')
            }
        }

        // If user is logged in it will run the functions
        // BUT! if user role is not admin the error page will be displayed.
        if (user) {
            fetchUserData()
        }
    }, [getAdmin.role, isRole, navigate, params.id, user])

    // function to let user update an user
    const updateUser = async (userData) => {
        await axios
            .put(`${process.env.REACT_APP_API_URL}admin/editUser/${params.id}`, userData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((res) => {
                if (res) navigate('/findUsers')
            })
    }

    const deleteUser = async () => {
        await axios
            .delete(`${process.env.REACT_APP_API_URL}admin/deleteUser/${params.id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((res) => {
                if (res) {
                    navigate('/findUsers')
                }
            })
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const submit = (e) => {
        e.preventDefault()
        updateUser(formData)
    }

    // if the user has the roll of Admin, he/she will have access to the page otherwise the errorPage.jsx will show.
    if (isRole) {
        return (
            <main className="my-5">
                <BackButton navTo="findUsers" />
                <section className="my-5">
                    <h1>Want to Update or Delete {firstName}</h1>
                </section>
                {/* Section for update the user information */}
                <section className="container my-5">
                    <h2>
                        {' '}
                        <span className="text-warning">Update</span> {firstName}
                    </h2>
                    <hr className="bg-light border-4 border-top border-light" />
                    <form
                        className="row g-3 mt-2"
                        // onSubmit={submit}
                    >
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">
                                First name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                placeholder={firstName}
                                value={firstName || ''}
                                onChange={onChange}
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
                                placeholder={lastName}
                                value={lastName || ''}
                                onChange={onChange}
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
                                placeholder={email || ''}
                                value={email || ''}
                                onChange={onChange}
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
                                value={role}
                                onChange={onChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={submit}
                            >
                                Update {firstName} <BiUserCheck color="yellow" size={30} />
                            </button>
                        </div>
                    </form>
                </section>
                <section className="container my-5">
                    <h2 className="py-2">
                        Want to <span className="text-danger">Delete</span> the user?
                    </h2>
                    <hr className="bg-danger border-4 border-top border-danger" />
                    <button className="btn btn-primary btn-lg" type="submit" onClick={deleteUser}>
                        Delete {firstName} <BiUserMinus color="red" size={30} />
                    </button>
                </section>
            </main>
        )
    }
    return <ErrorPage />
}

export default UserPage

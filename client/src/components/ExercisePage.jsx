import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function ExercisePage() {
    const params = useParams()
    const user = Cookies.get('access_token')
    const [exercise, setExercise] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [getUser, setGetUser] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [getUserList, setGetUserList] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [getUserSaves, setGetUserSaves] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        exId: '',
    })

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

        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${params.id}`,
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
            },
        }

        const getExercise = async () => {
            await axios
                .request(options)
                .then((response) => {
                    setExercise(response.data)
                    setFormData({
                        name: exercise.name,
                        exId: exercise.id,
                    })
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error(error)
                })
        }

        if (user) {
            setIsLoggedIn(true)
            checkUser()
            if (getUser.id) {
                getLists()
                getSaves()
            }
        }

        getExercise()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id, user, getUser.id])

    const saveExercise = async (exData) => {
        await axios
            .post(`${process.env.REACT_APP_API_URL}userSaves/saveEx/${getUser.id}`, exData, {
                withCredentials: true,
            })
            .then((res) => {
                // eslint-disable-next-line no-console
                console.log(res.data)
            })
    }
    const save = (data) => {
        saveExercise(data)
    }
    return (
        <main className="my-5">
            <section className="container">
                <h1>{exercise.name}</h1>
                <article className="px-5">
                    <h2>About</h2>
                    <p className="px-2">
                        {exercise.name} can increase your blood flow, try this exercise to
                        strengthen your {exercise.target}
                    </p>
                </article>
                <div className="col-12 col-xl-4 mx-auto">
                    <img className="card-img-top" src={exercise.gifUrl} alt="Exercise Gif" />
                </div>
                <section className="my-2">
                    {isLoggedIn ? (
                        <h2>Save this Exercise or save it into a list</h2>
                    ) : (
                        <h2>
                            <a className="text-white" href="/signin">
                                {' '}
                                Log In here
                            </a>{' '}
                            to save exercise
                        </h2>
                    )}
                    <div className="d-flex justify-content-center gap-2">
                        {isLoggedIn ? (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        save(formData)
                                    }}
                                >
                                    Save
                                </button>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Your Lists
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        {getUserList.map((list, index) => {
                                            return (
                                                // eslint-disable-next-line react/no-array-index-key
                                                <li key={index}>
                                                    <button type="button" className="dropdown-item">
                                                        {list.title}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </>
                        ) : null}
                    </div>
                </section>
            </section>
        </main>
    )
}

export default ExercisePage

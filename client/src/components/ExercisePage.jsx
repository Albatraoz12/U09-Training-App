/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function ExercisePage() {
    const params = useParams() // Let developers get access to params
    const user = Cookies.get('access_token')
    const [exercise, setExercise] = useState([]) // Stores the exercise data
    const [isLoggedIn, setIsLoggedIn] = useState(false) // checks if the user is logged in or not
    const [getUser, setGetUser] = useState([]) // Stores the user information
    const [getUserList, setGetUserList] = useState([]) // Stores the users lists to let user save exercise into a list
    const [getUserSaves, setGetUserSaves] = useState([]) // Stores the users likes/saved to let user like/save exercise
    // eslint-disable-next-line no-unused-vars
    const [isSaved, setIsSaved] = useState(false) // If set to true, the user has then already liked/saved it
    const [formData, setFormData] = useState({
        name: '',
        exId: '',
    })

    // Will run all the functions inse useEffect when component mounts.
    useEffect(() => {
        // function will run if user is logged in to get its data
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
                        // Stores user info into the state.
                        setGetUser(res.data.user)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        // function to let users fetch its lists
        const getLists = () => {
            axios
                .get(`${process.env.REACT_APP_API_URL}userList/${getUser.id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res.data.message) {
                        setGetUserList(res.data.message) // Stores user info into the state.
                    }
                })
        }

        // function to let users fetch its saved exercises
        const getSaves = () => {
            axios
                .get(`${process.env.REACT_APP_API_URL}userSaves/saves/${getUser.id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((res) => {
                    if (res.data.sInfo) {
                        setGetUserSaves(res.data.sInfo) // Stores user info into the state.
                        getUserSaves.map((saved) => {
                            if (saved.exId === params.id) {
                                setIsSaved(true)
                            } else {
                                setIsSaved(false)
                            }
                            return saved
                        })
                    }
                })
        }

        // Fetch exercise with id and later display to the user
        const getExercise = () => {
            axios
                .get(`https://exercisedb.p.rapidapi.com/exercises/exercise/${params.id}`, {
                    headers: {
                        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                        'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
                    },
                })
                .then((response) => {
                    setExercise(response.data)
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
        // if exercise has fetch the name and id values, it will then store them into the formData
        if (exercise.name && exercise.id) {
            setFormData({
                name: exercise.name,
                exId: exercise.id,
            })
        }
        // Disable this line because of not neeeding the dependensis
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id, user, getUser.id, exercise.name, exercise.id])

    // function to let user save the exercise
    const saveExercise = (exData) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}userSaves/saveEx/${getUser.id}`, exData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((res) => {
                if (res) window.location.reload()
            })
    }

    // function will run when user clicks on Like button
    const save = (data) => {
        saveExercise(data)
    }

    // function to let user save an exercise into a list
    const exerciseToList = (exData, id) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}userListInfo/createInfo/${id}`, exData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((res) => {
                if (res.data.errorMessage) {
                    // eslint-disable-next-line no-alert
                    alert('This Exercise is already saved into that list!')
                } else if (res.data.message) {
                    // eslint-disable-next-line no-alert
                    alert('This Exercise is now added to the list!')
                    window.location.reload()
                }
            })
    }

    // When user clicks on a list from the dropdown, the exercise will be saved into that list
    const saveList = (id) => {
        exerciseToList(formData, id)
    }

    // Deleting Saved exercise from ExercisePage
    const deleteSaved = () => {
        axios
            .delete(
                `${process.env.REACT_APP_API_URL}userSaves/deletesaved/${getUser.id}/${params.id}`
            )
            .then((res) => {
                if (res) window.location.reload()
            })
    }

    return (
        <main className="my-5">
            <div className="d-flex align-self-start ms-5">
                <a
                    href="/search"
                    role="button"
                    className="btn btn-primary btn-sm"
                    rel="noopener noreferrer"
                >
                    Go back
                </a>
            </div>
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
                    {/* Message to display if user is logged in or not */}
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
                        {/* if user is logged in then the button and the dropdown will be seen. Otherwise nothing */}
                        {isLoggedIn ? (
                            <>
                                {isSaved ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            deleteSaved(formData)
                                        }}
                                    >
                                        Unsave
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            save(formData)
                                        }}
                                    >
                                        Save
                                    </button>
                                )}
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
                                                    <button
                                                        type="button"
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            // eslint-disable-next-line no-underscore-dangle
                                                            saveList(list._id)
                                                        }}
                                                    >
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

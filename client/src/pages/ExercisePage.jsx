/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import ErrorModal from '../components/modal/ErrorModal'
import BackButton from '../components/BackButton'
import { UserContext } from '../context/UserProvider'
import { deleteSaved, exerciseToList, getExercise, saveExercise } from '../components/utils'

function ExercisePage() {
    const { user, userLists, userSaves, setUserSaves } = useContext(UserContext)
    const params = useParams()
    const token = Cookies.get('access_token')
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [exercise, setExercise] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        exId: '',
    })

    useEffect(() => {
        async function fetchUserData() {
            setIsLoggedIn(!!user)
            if (userSaves && userSaves.length > 0) {
                userSaves.forEach((save) => {
                    if (save.exId === params.id) {
                        setIsSaved(true)
                    }
                })
            }
        }

        const fetchExercise = async () => {
            const currentEx = await getExercise(params.id)
            setExercise(currentEx)
            setFormData({
                name: currentEx.name,
                exId: currentEx.id,
            })
        }

        if (user) {
            fetchUserData()
        }
        fetchExercise()
    }, [user, userSaves, params.id])

    const save = async (data) => {
        try {
            const saved = await saveExercise(user.id, token, data)
            if (saved.message) {
                setIsSaved(true)
                // Fake mutate the userSaves array
                const newUserSaves = [...userSaves, { exId: params.id }]
                setUserSaves(newUserSaves)
            } else {
                setErrorMessage(saved.errorMessage)
                setErrorModal(true)
            }
        } catch (error) {
            setErrorMessage(error.message)
            setErrorModal(true)
        }
    }

    const unsave = async () => {
        try {
            const deleted = await deleteSaved(user.id, params.id)
            if (deleted.message) {
                setIsSaved(false)
                // Fake mutate the userSaves array
                const newUserSaves = userSaves.filter((save) => save.exId !== params.id)
                setUserSaves(newUserSaves)
            } else {
                setErrorMessage(deleted.errorMessage)
                setErrorModal(true)
            }
        } catch (error) {
            setErrorMessage(error.message)
            setErrorModal(true)
        }
    }

    const saveList = async (id) => {
        try {
            const saveToList = await exerciseToList(id, token, formData)
            if (!saveToList.message) {
                setErrorMessage(saveToList.errorMessage)
                setErrorModal(true)
            }
        } catch (error) {
            setErrorMessage(error.message)
            setErrorModal(true)
        }
    }

    return (
        <main className="my-5">
            <BackButton navTo="search" />
            <section className="container text-center">
                <h1>{exercise.name}</h1>
                <article className="px-5">
                    <h2>About</h2>
                    <p className="px-2">
                        {exercise.name} can increase your blood flow. Try this exercise to
                        strengthen your {exercise.target}.
                    </p>
                </article>
                <div className="col-12 col-xl-4 mx-auto">
                    <img
                        className="card-img-top"
                        src={exercise.gifUrl}
                        alt={`${exercise.name} GIF`}
                    />
                </div>
                {errorModal && (
                    <ErrorModal setErrorModal={setErrorModal} errorMessage={errorMessage} />
                )}
                <section className="my-2">
                    {isLoggedIn ? (
                        <h2 className="text-center">Save this exercise or save it into a list</h2>
                    ) : (
                        <h2>
                            <Link className="text-white" to="/signin">
                                Login here
                            </Link>{' '}
                            to save exercise
                        </h2>
                    )}
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        {isLoggedIn && (
                            <>
                                {isSaved ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={unsave}
                                    >
                                        Unsave
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => save(formData)}
                                    >
                                        Save
                                    </button>
                                )}
                                <div className="dropdown">
                                    <button
                                        className="btn btn-primary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                    >
                                        Your Lists
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        {userLists.map((list) => (
                                            <li key={list._id}>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => saveList(list._id)}
                                                >
                                                    {list.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </section>
        </main>
    )
}

export default ExercisePage

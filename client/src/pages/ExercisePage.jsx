import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import ErrorModal from '../components/modal/ErrorModal'
import BackButton from '../components/BackButton'
import { UserContext } from '../context/UserProvider'
import { deleteSaved, exerciseToList, getExercise, saveExercise } from '../components/utils'

function ExercisePage() {
    const { user, userLists, userSaves } = useContext(UserContext)
    const params = useParams() // Let developers get access to params
    const token = Cookies.get('access_token')
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [exercise, setExercise] = useState([]) // Stores the exercise data
    const [isLoggedIn, setIsLoggedIn] = useState(false) // checks if the user is logged in or not
    const [isSaved, setIsSaved] = useState(false) // If set to true, the user has then already liked/saved it
    const [formData, setFormData] = useState({
        name: '',
        exId: '',
    })

    useEffect(() => {
        async function fetchUserData() {
            setIsLoggedIn(true)
            if (userSaves && userSaves.length > 0) {
                userSaves.map((saves) => {
                    if (saves.exId === params.id) {
                        setIsSaved(true)
                    }
                    return saves
                })
            }
        }
        const fetchExercise = async () => {
            const currentEx = await getExercise(params.id)
            setExercise(currentEx)
            if (exercise.name && exercise.id) {
                setFormData({
                    name: exercise.name,
                    exId: exercise.id,
                })
            }
        }
        if (user) {
            fetchUserData()
        }
        fetchExercise()

        // Disable this line because of not neeeding the dependensis
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id, exercise.name, exercise.id])

    // function will run when user clicks on Like button
    const save = async (data) => {
        const saved = await saveExercise(user.id, token, data)
        if (saved.message) window.location.reload()
    }

    // When user clicks on a list from the dropdown, the exercise will be saved into that list
    const saveList = async (id) => {
        const saveToList = await exerciseToList(id, token, formData)
        if (saveToList.message) {
            // eslint-disable-next-line no-alert
            alert('success')
        } else {
            setErrorMessage(saveToList.errorMessage)
            setErrorModal(true)
        }
    }

    return (
        <main className="my-5">
            <BackButton navTo="search" />
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
                {errorModal && (
                    <div className="d-flex align-items-center justify-content-center">
                        <ErrorModal setErrorModal={setErrorModal} setErrorMessage={errorMessage} />
                    </div>
                )}
                <section className="my-2">
                    {/* Message to display if user is logged in or not */}
                    {isLoggedIn ? (
                        <h2>Save this Exercise or save it into a list</h2>
                    ) : (
                        <h2>
                            <Link className="text-white" to="/signin">
                                {' '}
                                Login here
                            </Link>{' '}
                            to save exercise
                        </h2>
                    )}
                    <div className="d-flex justify-content-center gap-2">
                        {isLoggedIn ? (
                            <>
                                {isSaved ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={async () => {
                                            const deleted = await deleteSaved(user.id, params.id)
                                            if (deleted.message) window.location.reload()
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
                                        {userLists.map((list, index) => {
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

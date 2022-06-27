/* eslint-disable no-nested-ternary */
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
                    // console.log(response.data)
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
    }, [params.id, user, getUser.id])
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
                    <h2>Save this Exercise or save it into a list</h2>
                    {isLoggedIn && exercise.id === getUserSaves.exId ? (
                        <div className="my-2">
                            <button
                                className="bi bi-suit-heart-fill btn btn-light btn-lg"
                                type="button"
                                aria-label="Save Exercise"
                            />
                        </div>
                    ) : !isLoggedIn ? (
                        <div>
                            <a href="/signin">Logg in to save this exercise</a>
                        </div>
                    ) : (
                        <div>
                            <button
                                className="bi bi-suit-heart btn btn-light btn-lg"
                                type="button"
                                aria-label="Save Exercise"
                            />
                        </div>
                    )}
                </section>
            </section>
        </main>
    )
}

export default ExercisePage

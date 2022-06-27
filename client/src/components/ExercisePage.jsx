import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function ExercisePage() {
    const params = useParams()
    const user = Cookies.get('access_token')
    const [exercise, setExercise] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
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

        getExercise()
    }, [params.id])
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
                <div>{isLoggedIn ? <h1>helloThere user</h1> : null}</div>
            </section>
        </main>
    )
}

export default ExercisePage

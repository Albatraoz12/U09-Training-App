import React, { useState } from 'react'
import axios from 'axios'

function Search() {
    // eslint-disable-next-line no-unused-vars
    const [exercises, setExcercises] = useState([])
    const [exerciseName, setExerciseName] = useState('')
    const [bodyPart, setBodyPart] = useState('')

    // options(getEx) will search for an exercise muscle group with user input
    const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/name/${exerciseName.toLowerCase()}`,
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
            'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
        },
    }

    const getEx = async () => {
        await axios
            .request(options)
            .then((response) => {
                setExcercises(response.data)
                // console.log(response.data)
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error)
            })
    }

    // OptionTwo(getExTwo), will search one targeted muscle groups with dropdown instead of user input.
    const optionsTwo = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart.toLowerCase()}`,
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
            'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
        },
    }

    const getExTwo = async () => {
        await axios
            .request(optionsTwo)
            .then((response) => {
                setExcercises(response.data)
                // console.log(response.data)
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getEx()
    }
    // Only display 10 exercises for better experiance, atlest for this project.
    // Can be deleted/commented out, user exercises variable instead then.
    const ten = exercises.filter((item, index) => {
        return index < 10
    })

    return (
        <main className="my-5">
            <section className="container mx-auto my-5">
                <h1>Search</h1>
                <form className="row g-3 mt-4">
                    <div className="col-12">
                        <label htmlFor="search" className="form-label">
                            Search exercise by name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            name="search"
                            placeholder="Enter a exercise name"
                            onChange={(e) => {
                                setExerciseName(e.target.value)
                            }}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary m-1"
                            onClick={handleSubmit}
                        >
                            Search
                        </button>
                    </div>
                    <div className="col-12">
                        <label htmlFor="selectedWorkoutGroup">Or search for muscle group</label>
                        <select
                            className="form-select form-select-sm mb-3"
                            aria-label=".form-select-lg example"
                            id="selectedWorkoutGroup"
                            onChange={(e) => {
                                setBodyPart(e.target.value)
                                getExTwo()
                            }}
                        >
                            <option defaultValue>Get Excersises by clicking on a bodypart</option>
                            <option value="back">Back</option>
                            <option value="chest">Chest</option>
                            <option value="lower%20arms">Lower Arm</option>
                            <option value="lower%20legs">Lower Legs</option>
                            <option value="shoulders">Shoulders</option>
                            <option value="neck">Neck</option>
                            <option value="cardio">Cardio</option>
                        </select>
                    </div>
                </form>
            </section>
            <section className="container my-5">
                <h1 className="text-start">You searched for: {exerciseName || ''}</h1>
                <div className="row row-cols-1 row-cols-md-3 g-2 mx-auto">
                    {ten.map((exercise) => {
                        return (
                            <div className="col" key={exercise.id}>
                                <a
                                    href={`/exercise/${exercise.id}`}
                                    className="text-decoration-none"
                                >
                                    <div className="card">
                                        <img
                                            src={`${exercise.gifUrl}`}
                                            className="card-img-top"
                                            alt="exercise-gif"
                                        />
                                        <div className="card-body">
                                            <h2 className="card-title text-dark fs-6 fw-bold">
                                                {exercise.name}
                                            </h2>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <span className="btn btn-primary rounded">
                                                    {exercise.equipment}
                                                </span>
                                                <span className="btn btn-primary rounded">
                                                    {exercise.target}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

export default Search

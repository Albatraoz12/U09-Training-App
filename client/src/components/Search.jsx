import React, { useState } from 'react'
import axios from 'axios'

function Search() {
    const [exercises, setExcercises] = useState([]) // Stores exercises into an arry
    const [exerciseName, setExerciseName] = useState('') // Stores user input value

    // Function to let users serach by input with a value
    const getExerciseByName = async () => {
        await axios
            .get(`https://exercisedb.p.rapidapi.com/exercises/name/${exerciseName.toLowerCase()}`, {
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
                },
            })
            .then((res) => {
                setExcercises(res.data)
            })
    }

    // Function to let user search exercises by body part direcly instead of typing.
    const getBodypartEx = async (bodypart) => {
        await axios
            .get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart.toLowerCase()}`, {
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
                },
            })
            .then((res) => {
                setExcercises(res.data)
            })
    }

    // When user click on dropdown menu to find exercises by bodypar
    const onChangeBP = (e) => {
        console.log(e.target.value)
        getBodypartEx(e.target.value)
    }

    // When user sumbits an exercise with input
    const handleSubmit = (e) => {
        e.preventDefault()
        getExerciseByName()
    }

    // Only display 10 exercises for better experiance, atlest for this project.
    // Can be deleted/commented out, use exercises variable instead then.
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
                            name="bodyPart"
                            onChange={onChangeBP}
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

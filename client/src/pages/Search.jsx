import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getBodypartEx, getExerciseByName } from '../components/utils'

function Search() {
    const [exercises, setExcercises] = useState([]) // Stores exercises into an arry
    const [exerciseName, setExerciseName] = useState('') // Stores user input value
    // When user click on dropdown menu to find exercises by bodypar
    const onChangeBP = async (e) => {
        const fetchBodyPart = await getBodypartEx(e.target.value)
        setExcercises(fetchBodyPart)
    }

    // When user sumbits an exercise with input
    const handleSubmit = async (e) => {
        e.preventDefault()
        const getExercises = await getExerciseByName(exerciseName)
        setExcercises(getExercises)
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
                            className="btn btn-primary mt-1"
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
                                <Link
                                    to={`/exercise/${exercise.id}`}
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
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

export default Search

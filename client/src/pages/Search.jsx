import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getBodypartEx, getExerciseByName } from '../components/utils'

function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [exercises, setExcercises] = useState([]) // Stores exercises into an arry
    const [exerciseName, setExerciseName] = useState('') // Stores user input value

    // When user click on dropdown menu to find exercises by bodypart
    const onChangeBP = async (e) => {
        const fetchBodyPart = await getBodypartEx(e.target.value)
        setExcercises(fetchBodyPart)
        setSearchTerm(e.target.value)
    }

    // When user submits an exercise with input
    const handleSubmit = async (e) => {
        e.preventDefault()
        const getExercises = await getExerciseByName(exerciseName)
        setExcercises(getExercises)
        setSearchTerm(exerciseName) // Update the searchTerm state with the input value
    }

    // Only display 10 exercises for better experience, at least for this project.
    // Can be deleted/commented out, use exercises variable instead then.
    const ten = exercises.filter((item, index) => index < 10)

    return (
        <main className="my-5 search-container">
            <section className="container mx-auto my-5 h-auto">
                <h1>Search</h1>
                <form className="row g-3 mt-4" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="search" className="form-label">
                            Search exercise by name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            name="search"
                            placeholder="Enter an exercise name"
                            onChange={(e) => setExerciseName(e.target.value)}
                            value={exerciseName} // Add this to control the input value
                            aria-label="Search exercise by name" // ARIA attribute
                        />
                        <button type="submit" className="btn btn-primary mt-1">
                            Search
                        </button>
                    </div>
                    <div className="col-12">
                        <label htmlFor="selectedWorkoutGroup">Or search for muscle group</label>
                        <select
                            className="form-select form-select-sm mb-3"
                            aria-label="Select muscle group" // ARIA attribute
                            id="selectedWorkoutGroup"
                            name="bodyPart"
                            onChange={onChangeBP}
                        >
                            <option defaultValue>Get Exercises by clicking on a bodypart</option>
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
            <section className="container my-5 test">
                <h2 className="text-start">You searched for: {searchTerm}</h2>
                <div className="row row-cols-1 row-cols-md-3 g-2 mx-auto">
                    {ten.map((exercise) => (
                        <div className="col" key={exercise.id}>
                            <Link to={`/exercise/${exercise.id}`} className="text-decoration-none">
                                <div className="card">
                                    <img
                                        src={`${exercise.gifUrl}`}
                                        className="card-img-top"
                                        alt={`GIF of ${exercise.name}`}
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
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Search

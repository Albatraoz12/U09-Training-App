import React, { useState } from 'react'
import axios from 'axios'

function Search() {
    // eslint-disable-next-line no-unused-vars
    const [exercises, setExcercises] = useState([])

    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises',
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
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <main>
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
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="selectedWorkoutGroup">Or search for muscle group</label>
                        <select
                            className="form-select form-select-sm mb-3"
                            aria-label=".form-select-lg example"
                            id="selectedWorkoutGroup"
                        >
                            <option defaultValue>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </form>
            </section>
            <section className="container">
                <h1 className="text-start">You searched for:</h1>
                <button type="button" onClick={getEx}>
                    Testa
                </button>
                <div className="row row-cols-1 row-cols-md-3 g-2">
                    <div>
                        <div className="col">
                            <a href="/exercise/1" className="text-decoration-none">
                                <div className="card">
                                    <img
                                        src="http://d205bpvrqc9yn1.cloudfront.net/1254.gif"
                                        className="card-img-top"
                                        alt="exercise-gif"
                                    />
                                    <div className="card-body">
                                        <h2 className="card-title text-dark">Exercise Name</h2>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <a href="/exercise/1" className="text-decoration-none">
                            <div className="card">
                                <img
                                    src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                                    className="card-img-top"
                                    alt="exercise-gif"
                                />
                                <div className="card-body">
                                    <h2 className="card-title text-dark">Exercise Name</h2>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col">
                        <a href="/exercise/1" className="text-decoration-none">
                            <div className="card">
                                <img
                                    src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                                    className="card-img-top"
                                    alt="exercise-gif"
                                />
                                <div className="card-body">
                                    <h2 className="card-title text-dark">Exercise Name</h2>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col">
                        <a href="/exercise/1" className="text-decoration-none">
                            <div className="card">
                                <img
                                    src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                                    className="card-img-top"
                                    alt="exercise-gif"
                                />
                                <div className="card-body">
                                    <h2 className="card-title text-dark">Exercise Name</h2>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col">
                        <a href="/exercise/1" className="text-decoration-none">
                            <div className="card">
                                <img
                                    src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                                    className="card-img-top"
                                    alt="exercise-gif"
                                />
                                <div className="card-body">
                                    <h2 className="card-title text-dark">Exercise Name</h2>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Search

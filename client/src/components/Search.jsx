import React from 'react'

function Search() {
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
                <div className="row row-cols-1 row-cols-md-3 g-2">
                    <div>
                        <div className="col">
                            <div className="card">
                                <img
                                    src="http://d205bpvrqc9yn1.cloudfront.net/1254.gif"
                                    className="card-img-top"
                                    alt="exercise-gif"
                                    height={150}
                                />
                                <div className="card-body">
                                    <h2 className="card-title text-dark">Exercise Name</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img
                                src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                                className="card-img-top"
                                alt="exercise-gif"
                                height={150}
                            />
                            <div className="card-body">
                                <h2 className="card-title text-dark">Exercise Name</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img
                                src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                                className="card-img-top"
                                alt="exercise-gif"
                                height={150}
                            />
                            <div className="card-body">
                                <h2 className="card-title text-dark">Exercise Name</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img
                                src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                                className="card-img-top"
                                alt="exercise-gif"
                                height={150}
                            />
                            <div className="card-body">
                                <h2 className="card-title text-dark">Exercise Name</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img
                                src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                                className="card-img-top"
                                alt="exercise-gif"
                                height={150}
                            />
                            <div className="card-body">
                                <h2 className="card-title text-dark">Exercise Name</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Search

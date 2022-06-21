import React from 'react'

function Search() {
    return (
        <main>
            <section className="container mx-auto my-5">
                <h1>Search</h1>
                <form className="row g-3 mt-2">
                    <div className="col-12">
                        <label htmlFor="search" className="form-label hidden">
                            Search Exercise
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
                        <select
                            className="form-select form-select-sm mb-3"
                            aria-label=".form-select-lg example"
                        >
                            <option defaultValue>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Search

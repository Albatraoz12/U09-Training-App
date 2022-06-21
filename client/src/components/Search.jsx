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
                </form>
            </section>
        </main>
    )
}

export default Search

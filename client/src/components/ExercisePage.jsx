import React from 'react'

function ExercisePage() {
    return (
        <main className="my-5">
            <section className="container col">
                <h1 className="pb-2">Exercise Name</h1>
                <article className="px-5 my-3">
                    <h2>About</h2>
                    <p className="px-2">
                        Exercise can increase your blood flow, try this exercise to strengthen your
                        legs
                    </p>
                </article>
                <div className="col-md-8 mx-auto">
                    <img
                        className="card-img-top"
                        src="http://d205bpvrqc9yn1.cloudfront.net/0024.gif"
                        alt="Exercise Gif"
                    />
                </div>
            </section>
        </main>
    )
}

export default ExercisePage

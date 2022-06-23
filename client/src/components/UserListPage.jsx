import React from 'react'

function UserListPage() {
    return (
        <main>
            <section className="my-5 py-5 ">
                <h1>List Title</h1>
                <ul className='className="d-flex justify-content-center flex-column list-unstyled gap-2'>
                    <li className="d-flex justify-content-center align-items-center gap-2">
                        <a className="text-white" href="/exercise/1">
                            Exercise 1
                        </a>
                        <button
                            type="button"
                            className="bi bi-x-lg btn btn-danger"
                            aria-label="remove item"
                        />
                    </li>
                    <li className="d-flex justify-content-center align-items-center gap-2">
                        <a className="text-white" href="/exercise/1">
                            Exercise 2
                        </a>
                        <button
                            type="button"
                            className="bi bi-x-lg btn btn-danger"
                            aria-label="remove item"
                        />
                    </li>
                    <li className="d-flex justify-content-center align-items-center gap-2">
                        <a className="text-white" href="/exercise/1">
                            Exercise 3
                        </a>
                        <button
                            type="button"
                            className="bi bi-x-lg btn btn-danger"
                            aria-label="remove item"
                        />
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default UserListPage

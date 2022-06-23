import React from 'react'

function UserListPage() {
    return (
        <main>
            <section className="my-5 py-5 ">
                <h1>List Title</h1>
                <ul className='className="d-flex justify-content-center flex-column list-unstyled gap-2'>
                    <li>
                        <a className="text-white" href="/exercise/1">
                            Exercise 1
                        </a>
                    </li>
                    <li>
                        <a className="text-white" href="/exercise/1">
                            Exercise 2
                        </a>
                    </li>
                    <li>
                        <a className="text-white" href="/exercise/1">
                            Exercise 3
                        </a>
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default UserListPage

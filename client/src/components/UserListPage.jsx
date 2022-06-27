import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function UserListPage() {
    const params = useParams()
    const [listInfo, setListInfo] = useState([])

    useEffect(() => {
        const getListInfo = async () => {
            try {
                await axios
                    .get(`${process.env.REACT_APP_API_URL}userListInfo/listInfo/${params.id}`)
                    .then((res) => {
                        if (res.data.lInfo) {
                            setListInfo(res.data.lInfo)
                        }
                    })
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }

        getListInfo()
    }, [params])

    const deleteListInfo = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_API_URL}userListInfo/listInfoDelete/${id}`)
            .then((res) => {
                if (res) {
                    window.location.reload()
                }
            })
    }

    return (
        <main>
            <section className="my-5 py-5 ">
                <h1>List Title</h1>
                <ul className='className="d-flex justify-content-center flex-column list-unstyled gap-2'>
                    {listInfo.map((info, index) => {
                        return (
                            <li
                                className="d-flex justify-content-center align-items-center gap-2"
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                            >
                                <a className="text-white" href="/exercise/1">
                                    {info.name}
                                </a>
                                <button
                                    type="button"
                                    className="bi bi-x-lg btn btn-danger"
                                    aria-label="remove item"
                                    onClick={() => {
                                        // eslint-disable-next-line no-underscore-dangle
                                        deleteListInfo(info._id)
                                    }}
                                />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default UserListPage

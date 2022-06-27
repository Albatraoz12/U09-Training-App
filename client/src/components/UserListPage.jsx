import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function UserListPage() {
    const params = useParams()
    const [listInfo, setListInfo] = useState([])
    const [formData, setFormData] = useState({
        title: '',
    })

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
    const { title } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const updateList = async (userData) => {
        await axios.put(
            `${process.env.REACT_APP_API_URL}userList/editList/${params.id}`,
            userData,
            {
                withCredentials: true,
            }
        )
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            title,
        }

        updateList(userData)
        window.location.reload()
    }

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
                <form className="d-flex justify-content-center row gap-1 my-3" onSubmit={onSubmit}>
                    <div className="d-flex align-items-center justify-content-center">
                        <label htmlFor="title" className="fs-2">
                            Update List
                        </label>
                    </div>
                    <input
                        type="text"
                        className="col-md-6 col-sm-auto rounded form-control-lg"
                        id="title"
                        placeholder="Enter a title for your list"
                        name="title"
                        onChange={onChange}
                    />
                    <button className="btn btn-primary col-md-6 col-sm-auto rounded" type="submit">
                        Update
                    </button>
                </form>
                <ul className='className="d-flex justify-content-center flex-column list-unstyled gap-2'>
                    {listInfo.map((info, index) => {
                        return (
                            <li
                                className="d-flex justify-content-center align-items-center gap-2"
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                            >
                                <a className="text-white" href={`/exercise/${info.exId}`}>
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

/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import * as api from '../components/utils'
import BackButton from '../components/BackButton'

function UserListPage() {
    const navigate = useNavigate() // navigate user twords an destination
    const params = useParams() // let developers get access to params
    const token = Cookies.get('access_token')
    const [listInfo, setListInfo] = useState([]) // stores all the saved exercises assosiated with list id (from params)
    const [formData, setFormData] = useState({
        title: '',
    }) // Formdata to update list title/name
    useEffect(() => {
        async function fetchInfo() {
            const response = await api.getListInfo(params.id, token)
            if (response.lInfo) setListInfo(response.lInfo)
        }
        fetchInfo()
    }, [params, token])
    // Function to update a list by title/name
    const { title } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const userData = {
            title,
        }
        const updated = await api.updateList(params.id, userData, token)
        if (updated.message) navigate(`/userList/${title}/${params.id}`)
    }
    const deleteListInfo = (id) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}userListInfo/listInfoDelete/${id}`)
            .then((res) => {
                if (res) window.location.reload()
            })
    }
    return (
        <main className="my-5 p-2">
            <section className="my-5 container">
                <BackButton navTo="dashboard" />
                <h1>{params.name}</h1>
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
                <div className="d-flex justify-content-center flex-column gap-1 container">
                    <ul className="mb-0">
                        {listInfo.map((info) => {
                            return (
                                <li
                                    className="list-unstyled d-flex justify-content-between align-items-center px-3 py-2"
                                    key={info._id}
                                >
                                    <a className="text-white" href={`/exercise/${info.exId}`}>
                                        {info.name}
                                    </a>
                                    <button
                                        type="submit"
                                        className="bi bi-x-lg btn btn-danger"
                                        aria-label="remove item"
                                        onClick={() => {
                                            deleteListInfo(info._id)
                                        }}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>
        </main>
    )
}
export default UserListPage

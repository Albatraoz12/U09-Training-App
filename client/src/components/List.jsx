/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { BiTrash, BiListUl } from 'react-icons/bi'
import DeleteModal from './modal/DeleteModal'

function List({ lists, getUserId }) {
    const token = Cookies.get('access_token')
    const [errorModal, setErrorModal] = useState(false)
    return (
        <div className="custom-list rounded">
            <ul className="mb-0">
                <li className="list-unstyled d-flex justify-content-between align-items-center px-3 py-2">
                    <Link className="text-white" to={`/userList/${lists.title}/${lists._id}`}>
                        <BiListUl /> {lists.title}
                    </Link>
                    <button
                        type="submit"
                        className="btn btn-danger"
                        aria-label="remove list"
                        onClick={() => {
                            setErrorModal(true)
                        }}
                    >
                        <BiTrash color="red" size={20} />
                    </button>
                </li>
            </ul>
            {errorModal && (
                <div className="d-flex align-items-center justify-content-center">
                    <DeleteModal
                        setErrorModal={setErrorModal}
                        listId={lists._id}
                        token={token}
                        userId={getUserId}
                    />
                </div>
            )}
        </div>
    )
}

List.defaultProps = {
    lists: [],
    getUserId: '',
}

List.propTypes = {
    lists: PropTypes.objectOf(PropTypes.node),
    getUserId: PropTypes.string,
}

export default List

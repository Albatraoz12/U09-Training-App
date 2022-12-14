/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { BiTrash, BiListUl } from 'react-icons/bi'
import * as api from './utils'

function List({ lists }) {
    const token = Cookies.get('access_token')
    return (
        <div className="custom-list rounded">
            <ul className="mb-0">
                <li className="list-unstyled d-flex justify-content-between align-items-center px-3 py-2">
                    <a className="text-white" href={`/userList/${lists.title}/${lists._id}`}>
                        <BiListUl /> {lists.title}
                    </a>
                    <button
                        type="submit"
                        className="btn btn-danger"
                        aria-label="remove list"
                        onClick={async () => {
                            const deleted = await api.deleteList(lists._id, token)
                            if (deleted.message) window.location.reload()
                        }}
                    >
                        <BiTrash color="red" size={20} />
                    </button>
                </li>
            </ul>
        </div>
    )
}

List.defaultProps = {
    lists: [],
}

List.propTypes = {
    lists: PropTypes.objectOf(PropTypes.node),
}

export default List

/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { BiTrash, BiHeart } from 'react-icons/bi'
import * as api from './utils'

function Saves({ save }) {
    const token = Cookies.get('access_token')
    return (
        <ul className="mb-0">
            <li className="list-unstyled d-flex justify-content-between align-items-center px-3 py-2">
                <Link className="text-white" to={`/exercise/${save.exId}`}>
                    <span className="mx-2">
                        <BiHeart color="red" />
                    </span>
                    {save.name}
                </Link>
                <button
                    type="submit"
                    className="btn btn-danger"
                    aria-label="remove saved exercise"
                    onClick={async () => {
                        const deleted = await api.deleteSave(save._id, token)
                        if (deleted.message) window.location.reload()
                    }}
                >
                    <BiTrash color="red" size={20} />
                </button>
            </li>
        </ul>
    )
}

Saves.defaultProps = {
    save: [],
}

Saves.propTypes = {
    save: PropTypes.objectOf(PropTypes.node),
}

export default Saves

/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import * as api from './utils'

function Saves({ save, key }) {
    const token = Cookies.get('access_token')
    return (
        <ul className="mb-0" key={key}>
            <li className="list-unstyled d-flex justify-content-between align-items-center px-3 py-2">
                <a className="text-white" href={`/exercise/${save.exId}`}>
                    {save.name}
                </a>
                <button
                    type="submit"
                    className="bi bi-x-lg btn btn-danger"
                    aria-label="remove saved exercise"
                    onClick={async () => {
                        const deleted = await api.deleteSave(save._id, token)
                        if (deleted.message) window.location.reload()
                    }}
                />
            </li>
        </ul>
    )
}

Saves.defaultProps = {
    save: [],
    key: '',
}

Saves.propTypes = {
    save: PropTypes.node,
    key: PropTypes.string,
}

export default Saves

//  {
//      getUserList.map((lists) => {
//          return (
//          )
//      })
//  }

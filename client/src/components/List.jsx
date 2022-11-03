/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import * as api from './utils'

function List({ lists, key }) {
    const token = Cookies.get('access_token')
    return (
        <div className="custom-list rounded" key={key}>
            <ul className="mb-0" key={key}>
                <li className="list-unstyled d-flex justify-content-between align-items-center px-3 py-2">
                    <a className="text-white" href={`/userList/${lists.title}/${lists._id}`}>
                        {lists.title}
                    </a>
                    <button
                        type="submit"
                        className="bi bi-x-lg btn btn-danger"
                        aria-label="remove list"
                        onClick={async () => {
                            const deleted = await api.deleteList(lists._id, token)
                            if (deleted.message) window.location.reload()
                        }}
                    />
                </li>
            </ul>
        </div>
    )
}

List.defaultProps = {
    lists: [],
    key: '',
}

List.propTypes = {
    lists: PropTypes.node,
    key: PropTypes.string,
}

export default List

//  {
//      getUserList.map((lists) => {
//          return (
//          )
//      })
//  }

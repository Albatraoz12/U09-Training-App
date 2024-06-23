import React from 'react'
import './Modal.css'
import PropTypes from 'prop-types'
import { deleteList } from '../utils'

function DeleteModal({ setErrorModal, listId, token }) {
    return (
        <section className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        type="button"
                        onClick={() => {
                            setErrorModal(false)
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h3>Warning!</h3>
                </div>
                <div className="body">
                    <p>Are you sure you want to delete?</p>
                </div>
                <div className="footer">
                    <button
                        type="button"
                        onClick={() => {
                            setErrorModal(false)
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={async () => {
                            const removeList = await deleteList(listId, token)
                            if (removeList) {
                                setErrorModal(false)
                                window.location.reload()
                            }
                        }}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </section>
    )
}

DeleteModal.defaultProps = {
    setErrorModal: () => {},
    listId: '',
    token: '',
}

DeleteModal.propTypes = {
    setErrorModal: PropTypes.func,
    listId: PropTypes.string,
    token: PropTypes.string,
}

export default DeleteModal

import React from 'react'
import './Modal.css'
import PropTypes from 'prop-types'

function DeleteModal({ setErrorModal, errorMessage, delFunc, listsId, token }) {
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
                    <button type="button" onClick={() => delFunc(listsId, token)}>
                        Yes
                    </button>
                </div>
            </div>
        </section>
    )
}

DeleteModal.defaultProps = {
    setErrorModal: () => {},
    errorMessage: '',
    delFunc: () => {},
    listId: '',
    token: '',
}

DeleteModal.propTypes = {
    setErrorModal: PropTypes.func,
    errorMessage: PropTypes.string,
    delFunc: PropTypes.func,
    listId: PropTypes.string,
    token: PropTypes.string,
}

export default DeleteModal

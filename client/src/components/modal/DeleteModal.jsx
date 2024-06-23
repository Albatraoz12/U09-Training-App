import React from 'react'
import './Modal.css'
import PropTypes from 'prop-types'

function DeleteModal({ setErrorModal, errorMessage }) {
    return (
        <section className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        type="button"
                        onClick={() => {
                            setOpenModal(false)
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
                            setOpenModal(false)
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button type="button" onClick={() => navigate('/search')}>
                        Yes
                    </button>
                </div>
            </div>
        </section>
    )
}

ErrorModal.defaultProps = {
    setErrorModal: () => {},
    errorMessage: '',
}

ErrorModal.propTypes = {
    setErrorModal: PropTypes.func,
    errorMessage: PropTypes.string,
}

export default DeleteModal

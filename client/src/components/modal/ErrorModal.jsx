import React from 'react'
import './Modal.css'
import PropTypes from 'prop-types'

function ErrorModal({ setErrorModal, errorMessage }) {
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
                    <h3>{errorMessage}</h3>
                </div>
            </div>
        </section>
    )
}

ErrorModal.defaultProps = {
    setErrorModal: () => {},
    errorMessage: 'Error',
}

ErrorModal.propTypes = {
    setErrorModal: PropTypes.func,
    errorMessage: PropTypes.string,
}

export default ErrorModal

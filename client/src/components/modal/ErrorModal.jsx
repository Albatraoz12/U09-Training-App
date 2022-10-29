import React from 'react'
import './Modal.css'
import PropTypes from 'prop-types'

function ErrorModal({ setErrorModal, setErrorMessage }) {
    return (
        <section className="errorModalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        type="button"
                        onClick={() => {
                            setErrorModal(false)
                            window.location.reload()
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h3>{setErrorMessage}</h3>
                </div>
            </div>
        </section>
    )
}

ErrorModal.defaultProps = {
    setErrorModal: () => {},
    setErrorMessage: 'error',
}

ErrorModal.propTypes = {
    setErrorModal: PropTypes.func,
    setErrorMessage: PropTypes.string,
}

export default ErrorModal

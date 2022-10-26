import React from 'react'
import './Modal.css'

/* eslint-disable react/prop-types */ // Needs to be disabled in order to work!
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

export default ErrorModal

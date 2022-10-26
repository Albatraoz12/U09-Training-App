import React from 'react'
import './Modal.css'
import { useNavigate } from 'react-router-dom'

/* eslint-disable react/prop-types */ // Needs to be disabled in order to work!
function Modal({ setOpenModal }) {
    const navigate = useNavigate()
    return (
        <section className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        type="button"
                        onClick={() => {
                            setOpenModal(false)
                            window.location.reload()
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h3>Are You Sure You Want to Continue?</h3>
                </div>
                <div className="body">
                    <p>The next page looks amazing. Hope you want to go there!</p>
                </div>
                <div className="footer">
                    <button
                        type="button"
                        onClick={() => {
                            setOpenModal(false)
                            window.location.reload()
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button type="button" onClick={() => navigate('/search')}>
                        Continue
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Modal

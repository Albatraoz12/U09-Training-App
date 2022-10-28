import React from 'react'
import './Modal.css'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

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
                    <h3>List has been created!</h3>
                </div>
                <div className="body">
                    <p>Press continue to start searching for exercises or press cancel to return</p>
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
Modal.defaultProps = {
    setOpenModal: true,
}

Modal.propTypes = {
    setOpenModal: PropTypes.bool,
}

export default Modal

import React from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import PropTypes from 'prop-types'

function BackButton({ navTo }) {
    return (
        <div className="d-flex align-self-start mx-5 mb-5">
            <Link
                to={`/${navTo}`}
                role="button"
                className="btn btn-primary btn-sm"
                rel="noopener noreferrer"
            >
                <BiArrowBack /> Back
            </Link>
        </div>
    )
}

BackButton.defaultProps = {
    navTo: '',
}

BackButton.propTypes = {
    navTo: PropTypes.string,
}

export default BackButton

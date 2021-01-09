import React from 'react'
import { Link } from 'react-router-dom'

const Landing = props => {
    return (
        <div>
            <h1>Landing page</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Landing

import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <h1>Welcome to Gymlog!</h1>
            <span><Link to="/dashboard">Dashboard</Link></span>
            <span><Link to="/signup">Sign up</Link></span>
        </div>
    )
}

export default Landing

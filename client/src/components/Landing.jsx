import React from 'react'
import '../styles/Landing.css'
import {Link} from 'react-router-dom'

export default function Landing() {
    return (
        <div className='landing'>
            <Link to='/home'>
                <button className='btn-HomePage'>Home Page</button>
            </Link>
        </div>
    )
}

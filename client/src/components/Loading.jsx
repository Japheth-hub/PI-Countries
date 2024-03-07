import React from 'react'
import '../styles/loading.css'

export default function Loading() {
  return (
    <div className="loading">
        <div className='loader'>
            <div className='ring'> </div>
        </div>
        <span> Loading ... </span>
    </div>
  )
}

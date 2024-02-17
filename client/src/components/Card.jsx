import React from 'react'
import '../styles/Card.css'

export default function Card({ id, name, population, subregion, area, capital, continent, flags, Activities }) {
  // console.log(id, name, population, subregion, area, capital, continent, flags, Activities)
  return (
    <>
      <div className='intro'>
        <div className='namePais'>
          <h4>{name}</h4>
        </div>
        <div className='imgFlag'>
          <img src={flags} alt={name} />
        </div>
      </div>
      <div className={`divInfo ${continent}`}>
        <div className='info'>
          <p>Continent:</p>
          <p>{continent}</p>
        </div>
        <div className='info'>
          <p>Population:</p>
          <p>{population}</p>
        </div>
      </div>
  </>
  )
}

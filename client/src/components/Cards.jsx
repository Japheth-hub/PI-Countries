import React from 'react'
import Card from './Card'
import '../styles/Cards.css'
import { Link } from 'react-router-dom'

export default function Cards({ pagina }) {

  return (
    <div className='cards'>
      <div className='bodyCards'>
        {pagina.map((pais) => {
          return <div className='card' key={pais.id} >
            <Link to={`/detail/${pais.id}`}>
              <Card
                name={pais.name}
                population={pais.population}
                continent={pais.continent}
                flags={pais.flags}
              />
            </Link>
          </div>
        })}
      </div>
    </div>
  )
}

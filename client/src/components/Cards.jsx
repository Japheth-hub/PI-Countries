import React from 'react'
import Card from './Card'
import '../styles/Cards.css'
import { Link } from 'react-router-dom'

export default function Cards({ pagina, title }) {

  return (
    <div className='cards'>
      {title === "All Countries" ? (<h3>{title}</h3>) : (<h3>Busqueda por : <i>{title}</i></h3>)}
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

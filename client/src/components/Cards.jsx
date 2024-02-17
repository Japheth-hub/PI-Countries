import React from 'react'
import Card from './Card'
import '../styles/Cards.css'
import {Link} from 'react-router-dom'

export default function Cards({ pagina, title }) {

  return (
    <div className='cards'>
      {title === "All Countries" ? (<h3>{title}</h3>) : (<h3>Busqueda por : {title}</h3>)}
      <div className='bodyCards'>
        {pagina.map((pais)=>{
          return <div className='card' key={pais.id} >
            <Link to={`/detail/${pais.id}`}>
              <Card 
                id={pais.id}
                name={pais.name}
                population={pais.population}
                capital={pais.capital}
                continent={pais.continent}
                flags={pais.flags}
                subregion={pais.subregion}
                area={pais.area}
                Activities={pais.Activities}
              />
            </Link>
          </div>
        })}
      </div>
    </div>
  )
}

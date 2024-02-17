import React from 'react'
import '../styles/Detail.css'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Detail() {
  const paises = useSelector(state => state.pagina)

  const { id } = useParams();
  const pais = paises.find((pais) => pais.id === id)

  return (
    <div className={`detail ${pais.continent.toUpperCase()}`}>

      <div className='actions'>
        <h3>{pais.name}</h3>
        <Link to={'/home'}>
          <button>Home</button>
        </Link>
      </div>

      <div className='details'>
        <div className='detailCountry'>
          <img src={pais.flags} alt={pais.name} />
            <ul>
              <li>ID : <i>{pais.id}</i></li>
              <li>Capital : <i>{pais.capital}</i></li>
              <li>Continent : <i>{pais.continent}</i></li>
              <li>Subregion : <i>{pais.subregion}</i></li>
              <li>Population :<i>{pais.population}</i></li>
              <li>Area : <i>{pais.area}</i></li>
            </ul>
        </div>
        <div className='activityTable'>
          <table className='table' border='1'>
            <caption>Activities</caption>
            <thead>
              <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Dificult</th>
              <th>Duration</th>
              <th>Season</th>
              </tr>
            </thead>
            <tbody>
            {pais.Activities.length > 0 ? (
                pais.Activities.map((item)=>{
                  return (<tr key={id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.dificult}</td>
                      <td>{item.duration}</td>
                      <td>{item.season}</td>
                    </tr>
                  )})
              ) : (
                <tr>
                  <td colSpan='5'>No existen Actividades en este Pais</td>
                </tr>
                )}
            </tbody>
          </table>
            <button className='btnCreate'>Create Activity</button>
        </div>
      </div>

    </div>
  )
}

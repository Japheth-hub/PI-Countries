import React from 'react'
import '../styles/Detail.css'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import FormActivity from './FormActivity'


export default function Detail() {
  const { id } = useParams();
  // Obteniendo pais de la store
  // const paises = useSelector(state => state.pagina)
  // const pais = paises.find((pais) => pais.id === id)

  const [pais, setPais] = useState({})
  const [load, setLoad] = useState(true)
  const [modal, setModal] = useState('none')
  const URL = `http://localhost:3001/countries/${id}`

  function showModal(){
    setModal('block')
  }

  useEffect(()=>{
    async function getPais(){
      try {
        const {data} = await axios(URL)
        setPais(data)
        setLoad(false)
      } catch (error) {
        alert("Error al mostra pais", error)
        setLoad(false)
      }
    }
    getPais();
  }, [])

  if(load){
    return <div>CARGANDO ....</div>
  }
  
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
                  return (<tr>
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
            <button className='btnCreate' onClick={()=>{showModal()}}>Create Activity</button>
        </div>
      </div>
        <FormActivity/>
    </div>
  )
}

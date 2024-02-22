import React from 'react'
import '../styles/Detail.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import FormActivity from './FormActivity'
import {modal} from '../redux/actions'



export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [pais, setPais] = useState({})
  const [load, setLoad] = useState(true)
  const [allPaises, setAllPaises] = useState([])
  const displayModal = useSelector(state => state.modal)
  const dispatch = useDispatch();
  
  const URL = `http://localhost:3001/countries/${id}`
  const URLCountries = 'http://localhost:3001/countries'

  function showModal(){
    dispatch(modal('block'))
  }
  function getPaises(){
    axios(URLCountries)
      .then((res)=>{
        const array = res.data.map((pais)=>{
          return {
            name:pais.name, 
            id:pais.id
          }
        })
        setAllPaises(array)
      })
      .catch(error=> console.log(error))
  }

  useEffect(()=>{
    async function getPais(){
      try {
        const {data} = await axios(URL)
        setPais(data)
        getPaises()
        setTimeout(() => {
          setLoad(false)
        }, 1000);
      } catch (error) {
        navigate('/home')
        setLoad(false)
        alert(error.response.data.error)
      }
    }
    getPais();
  }, [])

  if(load){
    return <div className='loading'></div>
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
              <th>Name</th>
              <th>Dificult</th>
              <th>Duration</th>
              <th>Season</th>
              </tr>
            </thead>
            <tbody>
            {pais.Activities.length > 0 ? (
                pais.Activities.map((item)=>{
                  return (<tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.dificult}</td>
                      <td>{item.duration} - Hrs</td>
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
    <div className='modal' style={{display:displayModal}}>
      <FormActivity paises={allPaises} id={id}/>
    </div>
    </div>
  )
}

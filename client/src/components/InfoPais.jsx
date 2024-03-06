import '../styles/InfoPais.css'
import React from 'react'
import { modal } from '../redux/actions'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { URLrelaciones } from '../helpers/endPoints';


export default function InfoPais({ pais }) {

  const dispatch = useDispatch();

  function showModal() {
    dispatch(modal('block'))
  }

  async function borrar(e){
    try {
      const name = e.target.id;
      const confirmacion = confirm('Estas seguro de que deseas eliminar la Actividad')
      if(confirmacion) {
        await axios.delete(`${URLrelaciones}?name=${name}&pais=${pais.id}`)
        alert('Actividad eliminada con exito')
        window.location.reload()
      }
      
    } catch (error) {
      alert(error)
    }
  }

  return (<>
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
      <table className='table'>
        <caption>Activities</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dificult</th>
            <th>Duration</th>
            <th>Season</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {pais.Activities.length > 0 ? (
            pais.Activities.map((item) => {
              return (<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.dificult}</td>
                <td>{item.duration} - Hrs</td>
                <td>{item.season}</td>
                <td>
                  <div className='optionsTable'>
                    <button className='delete' id={item.name} onClick={borrar}>✘</button>
                  </div>
                </td>
              </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan='5'>No existen Actividades en este Pais</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className='btnCreate' onClick={() => { showModal() }}>Create Activity</button>
    </div>
  </>)
}

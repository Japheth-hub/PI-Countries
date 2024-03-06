import { React, useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Activities.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { URLrelaciones, URLactivities, URLcountries } from '../helpers/endPoints'
import { actividad, modal } from '../redux/actions'
import FormActivity from './FormActivity'


export default function Activities() {

  const allActivities = useSelector(state => state.allActivities)
  const [paisesSelect, setPaisesSelect] = useState([])
  const displayModal = useSelector(state => state.modal)


  const dispatch = useDispatch()

  function showModal() {
    dispatch(modal('block'))
  }

  async function getPaises() {
    try {
      const { data } = await axios(URLcountries)
      const array = data.map((pais) => {
        return {
          name: pais.name,
          id: pais.id
        }
      })
      setPaisesSelect(array)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  async function deletePais(name, pais) {
    try {
      const confirmmacion = confirm('Estas apunto de eliminar este pais de la actividad')
      if(confirmmacion){
        const {data} = await axios.delete(`${URLrelaciones}?name=${name}&pais=${pais}`)
        alert(data.message)
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function deleteActivity(name){
    try {
      const confirmacio = confirm('Estas apunto de eliminar esta actividad de forma permanente')
      if(confirmacio){
        const {data} = await axios.delete(`${URLactivities}/${name}`)
        alert(data)
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if(allActivities.length === 0){
      dispatch(actividad())
    }
    getPaises()
  }, [allActivities])

  return (
    <div className='activities'>
      <div className='head'>
        <h1>Activities</h1>

        <button onClick={showModal}>Create Activity</button>

        <Link to={'/home'}>
          <button>Home</button>
        </Link>
      </div>
      <div className='listActivities'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Dificult</th>
              <th>Season</th>
              <th>Countries</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allActivities.message ? <tr><td colSpan='6'>{allActivities.message}</td></tr>
              : allActivities.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.duration}</td>
                    <td>{item.dificult}</td>
                    <td>{item.season}</td>
                    <td className='listCountries'>{item.Countries.length <= 0 ? 'No hay paises' : item.Countries.map((pais) => {
                      return (
                        <p key={pais.id}>{pais.name}<button onClick={()=>{deletePais(item.name, pais.id)}} id={pais.id} className='iconClose'>✘</button></p>
                      )
                    })}</td>
                    <td><button onClick={()=>{deleteActivity(item.name)}} className='btn-delete'>Delete</button></td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <div className='modal' style={{ display: displayModal }}>
        <FormActivity paises={paisesSelect} id={'MEX'}/>
      </div>

    </div>
  )
}

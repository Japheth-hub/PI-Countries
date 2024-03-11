import { React, useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Activities.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { URLrelaciones, URLactivities, URLcountries } from '../helpers/endPoints'
import { actividad, modal } from '../redux/actions'
import FormActivity from './FormActivity'
import ResponsiveAct from './ResponsiveAct'


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
      if (confirmmacion) {
        await axios.delete(`${URLrelaciones}?name=${name}&pais=${pais}`)
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function deleteActivity(name) {
    try {
      const confirmacio = confirm('Estas apunto de eliminar esta actividad de forma permanente')
      if (confirmacio) {
        await axios.delete(`${URLactivities}/${name}`)
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (allActivities.length === 0) {
      dispatch(actividad())
    }
    getPaises()
  }, [allActivities])

  return (
    <div className='activities'>
      <div className='head'>
        <h1>Activities</h1>

        <Link to={'/home'}>
          <button>Home</button>
        </Link>

        <button onClick={showModal}>Create Activity</button>

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
                        <p key={pais.id}><Link to={`/detail/${pais.id}`}><i>{pais.name}</i></Link><button onClick={() => { deletePais(item.name, pais.id) }} id={pais.id} className='iconClose'>✘</button></p>
                      )
                    })}</td>
                    <td><button onClick={() => { deleteActivity(item.name) }} className='btn-delete'>Delete</button></td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <div className='divResponsive'>
        <ResponsiveAct />
      </div>
      <div className='modal' style={{ display: displayModal }}>
        <FormActivity paises={paisesSelect} id={'MEX'} />
      </div>

    </div>
  )
}

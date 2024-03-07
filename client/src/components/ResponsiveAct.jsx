import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import '../styles/ResponsiveAct.css'
import axios from 'axios'
import { URLactivities } from '../helpers/endPoints'

export default function ResponsiveAct() {

  const allActivities = useSelector(state => state.allActivities)

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

  return (
    <div className='listActivities responsive'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Season</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {allActivities.message ? <tr><td colSpan='4'>{allActivities.message}</td></tr>
            : allActivities.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.season}</td>
                  <td>
                    <div className='optionsResponsive'>
                      <button onClick={() => { deleteActivity(item.name) }} className='btn-delete btnRes'>Delete</button>
                      <Link to={`/activity/${item.name}`}>
                        <button className='btnRes' style={{ backgroundColor: 'green' }}>Info</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

import { React, useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Activity.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { URLactivities, URLrelaciones } from '../helpers/endPoints'

export default function Activity() {
    const { name } = useParams()
    const [activity, setActivity] = useState({})
    const navigate = useNavigate();

    async function getActivities() {
        try {
            const { data } = await axios(URLactivities)
            const actividad = data.find((act) => act.name === name)
            setActivity(actividad)
        } catch (error) {
            console.log(error)
        }
    }

    async function deletePais(name, pais) {
        try {
            const confirmmacion = confirm('Estas apunto de eliminar este pais de la actividad')
            if (confirmmacion) {
                const { data } = await axios.delete(`${URLrelaciones}?name=${name}&pais=${pais}`)
                alert(data.message)
                navigate('/activities')
                window.location.reload()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getActivities()
    }, [])


    return (
        <div className='activityResponsive'>
            <Link to='/activities'><button className='return'>Regresar</button></Link>
            <div className='contenedor'>
                <h3>{activity.name}</h3>
                <ul>
                    <li>Dificult : <i>{activity.dificult}</i></li>
                    <li>Duration : <i>{activity.duration}</i></li>
                    <li>Season : <i>{activity.season}</i></li>
                </ul>
                <h4>Countries :</h4>
                <div className='pCountries'>
                    {activity.Countries && activity.Countries.length <= 0 ? <p>No hay paises</p> : activity.Countries && activity.Countries.map((pais) => {
                        return (
                            <p key={pais.id}>{pais.name}<button onClick={() => { deletePais(activity.name, pais.id) }} id={pais.id} className='iconClose'>✘</button></p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

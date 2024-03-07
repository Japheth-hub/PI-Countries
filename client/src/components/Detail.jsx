import '../styles/Detail.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { React, useEffect, useState } from 'react'
import axios from 'axios'
import FormActivity from './FormActivity'
import InfoPais from './InfoPais'
import { URLcountries } from '../helpers/endPoints'
import Loading from './Loading.jsx'


export default function Detail() {
  const { id } = useParams();
  const [pais, setPais] = useState({})
  const [load, setLoad] = useState(true)
  const [paisesSelect, setPaisesSelect] = useState([])
  const displayModal = useSelector(state => state.modal)
  const navigate = useNavigate()


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

  useEffect(() => {
    async function getPais() {
      try {
        const { data } = await axios(`${URLcountries}/${id}`)
        setPais(data)
        getPaises()
        setTimeout(() => {
          setLoad(false)
        }, 500);
      } catch (error) {
        navigate('/home')
        setLoad(false)
        alert(error.response.data.error)
      }
    }
    getPais();
  }, [])

  if (load) {
    return <Loading />
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
        <InfoPais pais={pais} />
      </div>

      <div className='modal' style={{ display: displayModal }}>
        <FormActivity paises={paisesSelect} id={id} />
      </div>

    </div>
  )
}

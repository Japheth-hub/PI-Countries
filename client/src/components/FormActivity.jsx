import '../styles/FormActivity.css'
import { useDispatch } from 'react-redux'
import { useState, React } from 'react'
import { modal } from '../redux/actions'
import { validate } from '../helpers/validaciones'
import createActivity from '../helpers/createActivity'

export default function FormActivity({ paises, id }) {
  paises.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    dificult: 0,
    horas: 0,
    minutos: 0,
    season: "Season",
    paises: [id]
  })
  const [errores, setErrores] = useState([])

  function handleName(e) {
    setForm((state) => ({
      ...state,
      name: e.target.value.trim()
    }))
  }

  function handleDificutl(e) {
    setForm((state) => ({
      ...state,
      dificult: e.target.value
    }))
  }

  function handleHour(e) {
    setForm((state) => ({
      ...state,
      horas: Number(e.target.value)
    }))
    if (e.target.value < 0) {
      setForm((state) => ({
        ...state,
        horas: 0
      }))
    }
  }

  function handelMinutes(e) {
    if (form.horas === 0 && e.target.value < 0) {
      setForm((state) => ({
        ...state,
        minutos: 0
      }))
      return;
    }
    setForm((state) => ({
      ...state,
      minutos: Number(e.target.value)
    }))
    if (e.target.value < 0) {
      setForm((state) => ({
        ...state,
        horas: Number(state.horas) - 1,
        minutos: 59
      }))
    } else if (e.target.value >= 60) {
      setForm((state) => ({
        ...state,
        horas: Number(state.horas) + 1,
        minutos: 0
      }))
    }
  }

  function handleSeason(e) {
    setForm((state) => ({
      ...state,
      season: e.target.value
    }))
  }

  function handlePaises(e) {
    if (form.paises.includes(e.target.value)) {
      alert('Este pais ya existe')
      return;
    }
    setForm((state) => ({
      ...state,
      paises: [...state.paises, e.target.value]
    }))
  }

  function deletePais(e) {
    const id = e.target.id
    setForm((state) => ({
      ...state,
      paises: state.paises.filter((pais) => pais !== id)
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errores = validate(form)
    if (errores.length > 0) {
      setErrores(errores)
    } else {
      const message = await createActivity(form)
      if(message[0]){
        alert(message[1])
        dispatch(modal('none'))
        window.location.reload();
      } else {
        alert(message[1])
      }
    }
  }

  function closeModal(e) {
    e.preventDefault()
    dispatch(modal('none'))
  }


  return (
    <div className='modalContainer'>
      <form onSubmit={handleSubmit}>
        <h3>Create Activity</h3>
        <div className='errores'>
          {errores.length > 0 ? errores.map((error)=> <span className='alert'>* {error}</span>) : ""} 
        </div>

        <label htmlFor="name">Name Activity
          <input type="text" value={form.name} onChange={handleName} />
        </label>

        <label htmlFor="dificult">
          <span>Dificult : {form.dificult}</span>
          <input type="range" min="0" max="5" value={form.dificult} onChange={handleDificutl} />
        </label>

        <label className='duration' htmlFor="duration">Duration (In Hours)
          <div className='horas'>
            <input type="number" name='horas' onChange={handleHour} value={form.horas} />
            <span>:</span>
            <input type="number" name='minutos' onChange={handelMinutes} value={form.minutos} />
            <span>Horas</span>
          </div>
        </label>

        <label htmlFor="season">Select Season
          <select name="season" defaultValue='Season' onChange={handleSeason}>
            <option value="Season" disabled='disabled'>Season</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
        </label>

        <div className='selectPaises'>
          <label htmlFor="paises">
            <select name="paises" defaultValue='all' onChange={handlePaises}>
              <option value="all" disabled='disabled'>Selec. Paises</option>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>{pais.name}</option>
              ))}
            </select>
          </label>
          <div className='listaPaises'>
            {form.paises.length === 0 ?
              (<span style={{ margin: '0px auto' }}>Aun no hay paises seleccionados</span>) :
              (form.paises.map((pais) => (
                <p key={pais}>{pais}<button onClick={deletePais} id={pais} className='iconClose'>✘</button></p>
              )))
            }
          </div>
        </div>

        <div className='botones'>
          <button className='closeModal' onClick={closeModal} style={{ backgroundColor: 'red' }}>Close</button>
          <input type="submit" value="Create" style={{ backgroundColor: 'green' }} />
        </div>

      </form>
    </div>
  )
}

import '../styles/FormActivity.CSS'
import { modal } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { useState, React, useEffect } from 'react'
import validate from '../helpers/validaciones'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FormActivity({paises, id}) { 
  paises.sort((a, b)=>{
    return a.name.localeCompare(b.name)
  })

  const URLActivitites = 'http://localhost:3001/activities'
  const navigate = useNavigate();
  const [errores, setErrores] = useState([])
  const [form, setForm] = useState({
    name: '',
    dificult: 1,
    horas: 0,
    minutos: 0,
    season: "Season",
    paises:[id]
  })
  const dispatch = useDispatch();

  function handleName(e) {
    setForm((state) => ({
      ...state,
      name: e.target.value
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
    if(e.target.value < 0){
      setForm((state) => ({
        ...state,
        horas: 0
      }))
    }
  }

  function handelMinutes(e){
    if(form.horas === 0 && e.target.value < 0){
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
    if(e.target.value < 0){
      setForm((state) => ({
        ...state,
        horas: Number(state.horas) - 1,
        minutos: 59
      }))
    } else if(e.target.value >= 60){
      setForm((state) => ({
        ...state,
        horas: Number(state.horas) + 1,
        minutos: 0
      }))
    }
  }

  function handleSeason(e){
    setForm((state)=>({
      ...state,
      season: e.target.value
    }))
  }

  function handlePaises(e){
    if(form.paises.includes(e.target.value)){
      alert('Este pais ya existe')
      return;
    }
    setForm((state)=>({
      ...state,
      paises: [...state.paises, e.target.value]
    }))
  }
  function deletePais(e){
    const id = e.target.id
    setForm((state)=>({
      ...state,
      paises: state.paises.filter((pais)=>pais !== id)
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errores = validate(form)
    if(errores.length > 0){
      setErrores(errores)
      alert(errores[0])
    } else {
      for (let i = 0; i < form.paises.length; i++) {
        const element ={
          name: form.name,
          dificult: form.dificult,
          duration: form.horas + ':' + (form.minutos < 10 ? '0' + form.minutos : form.minutos),
          season: form.season,
          idPais: form.paises[i]
        };
        // console.log(element)
        axios.post(URLActivitites, element)
          .then(res=>{
            // console.log(res.data.message)
            navigate('/home')
            window.location.reload();
            dispatch(modal('none'))
          })
          .catch(error=>console.log(error.response.data.message, element))
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
        {form.horas > 6 ? <span className='alert'>Actividad debe tener un maximo de hasta 6 Horas</span> : ""}
        {form.horas === 6 && form.minutos > 0 ? <span className='alert'>Actividad debe tener un maximo de hasta 6 Horas</span> : ""}

        <label htmlFor="name">Name Activity
          <input type="text" value={form.name} onChange={handleName} />
        </label>

        <label htmlFor="dificult">
          <span>Dificult : {form.dificult}</span>
          <input type="range" min="1" max="5" value={form.dificult} onChange={handleDificutl} />
        </label>

          <label className='duration' htmlFor="duration">Duration (In Hours)
            <div className='horas'>
              <input type="number" name='horas' onChange={handleHour} value={form.horas}/>:
              <input type="number" name='minutos' onChange={handelMinutes} value={form.minutos}/>
              Hrs
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
            (<span style={{margin:'0px auto'}}>Aun no hay paises seleccionados</span>):
            (form.paises.map((pais)=>(
              <p key={pais}>{pais}<button onClick={deletePais} id={pais} className='iconClose'>✘</button></p>  
            )))  
            }
          </div>
          </div>

        <div className='botones'>
          <button className='closeModal' onClick={closeModal} style={{backgroundColor:'red'}}>Close</button>
          <input type="submit" value="Create" style={{backgroundColor:'green'}} />
        </div>

      </form>
    </div>
  )
}

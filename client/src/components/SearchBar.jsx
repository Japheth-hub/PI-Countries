import "../styles/SearchBar.css"
import {React, useState} from 'react'
import {validateSeacrh} from '../helpers/validaciones'
import { useDispatch } from "react-redux"
import {coincidencia, title} from '../redux/actions'
import { useNavigate } from "react-router-dom"

export default function SearchBar() {

  const [search, setSearch] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function handleSearch(e) {
    setSearch(e.target.value)
  }

  function searchPais(text) {
    const errores = validateSeacrh(text)
    if(errores.length > 0){
      alert(errores[0])
      return
    }
    dispatch(coincidencia(text))
    dispatch(title(text))
    setSearch("");
  }

  function allPaises() {
    navigate('/home')
    window.location.reload()
  }

    return (<>
        <div className="search">
            <input type="text" placeholder="Buscar por..." value={search} onChange={handleSearch} />
            <button onClick={() => { searchPais(search) }}>Search</button>
        </div>
        <button id="verTodos" onClick={() => { allPaises() }}>Ver Todos</button>
    </>)
}

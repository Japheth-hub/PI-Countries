import "../styles/SearchBar.css"
import {React, useState} from 'react'
import {validateSeacrh} from '../helpers/validaciones'
import { useDispatch } from "react-redux"
import {coincidencia, paises, title} from '../redux/actions'

export default function SearchBar() {

  const [search, setSearch] = useState("")
  const dispatch = useDispatch();


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
    dispatch(paises())
    dispatch(title('All Countries'))
  }

    return (<>
        <div className="search">
            <input type="text" placeholder="Buscar coincidencia..." value={search} onChange={handleSearch} />
            <button onClick={() => { searchPais(search) }}>Search</button>
        </div>
        <button onClick={() => { allPaises() }}>Ver Todos</button>
        {/* <a href="http://localhost:5173/home"><button>Ver Todos</button></a> */}
    </>)
}

import React from "react"
import "../styles/Home.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { paises, coincidencia, continente, actividad, filterActivity, updateState } from "../redux/actions.js"



export default function home() {

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("") 
  const [pagina, setPagina] = useState([]) 
  const selectPaises = useSelector(state => state.allCountries);
  const selectActividades = useSelector(state => state.allActivities);
  const dispatch = useDispatch(); 

  function menos(page) {
    if (page > 1) setPage(page - 1)
    if (page < 1) setPage(1)
  }
  function mas(page) {
    const max = Math.ceil(selectPaises.length / 10)
    if (page < max) setPage(page + 1)
    if (page > max) setPage(max)
  }
  function showPagina(paises, page){
    const offset = ((page - 1) * 10);
    const limit = offset + 10;
    const pagina = paises.slice(offset, limit);
    setPagina(pagina)
  }

  function handlePage(e) {
    setPage(parseInt(e.target.value))
  }
  
  function handleSearch(e) {
    setSearch(e.target.value)
  }

  function searchPais(text){
    dispatch(coincidencia(text))
    setSearch("");
    setPage(1)
  }

  function allPaises() {
    dispatch(paises())
  }

  function hanldeContinent(e){
    dispatch(continente(e.target.value));
    setPage(1)
  }

  function handleActivity(e){
    dispatch(filterActivity(e.target.value))
  }

  function handleAlfabetic(e){
    dispatch(updateState(e.target.value, "alfabetic"))
  }
  function handlePopulation(e){
    dispatch(updateState(e.target.value, "population"))
  }

  useEffect(() => {
    allPaises()
    dispatch(actividad())
  }, [])

  useEffect(()=>{
    if(selectPaises.length > 0){
      showPagina(selectPaises, page)
    }
  },[selectPaises, page, selectActividades])

  console.log(pagina)
  

  return (
    <div className="home">
      <div className="navBar">
        <div className="opciones">
          <div className="searchBar">
            <input 
            type="text"
            placeholder="Buscar coincidencia..."
            value={search}
            onChange={handleSearch}
            />
            <button onClick={()=>{searchPais(search)}}>Search</button>
            <button onClick={()=>{allPaises()}}>Ver Todos</button>
          </div>
          <div className="paginado">
            <button onClick={() => { menos(page) }}>-</button>
            <input
              id="inputPage"
              type="number"
              value={page}
              onChange={handlePage}
            />
            <button onClick={() => { mas(page) }}>+</button>
          </div>
          <div className="filtros">
            <select name="continent" defaultValue="continente" onChange={hanldeContinent}>
              <option value="continente" disabled="disabled">Por Continentes</option>
              <option value="Todos">Todos</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Americas">Americas</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Antarctic">Antarctic</option>
            </select>
            <select name="activity" defaultValue="activity" onChange={handleActivity}>
              <option value="activity" disabled="disabled">Por Actividiad</option>
              
              {selectActividades.message ? (
                <option value="null" disabled="disabled">{selectActividades.message}</option>
                ) : (
                  selectActividades.map((actividad)=>(
                    <option key={actividad.id} value={actividad.name}>{actividad.name}</option>
                  )
              ))};
            </select>
          </div>
          <div className="orden">
            <select name="alfabetic" defaultValue="alfabetic" onChange={handleAlfabetic}>
              <option value="alfabetic" disabled="disabled">Por Nombre</option>
              <option value="desc">A-Z</option>
              <option value="asc">Z-A</option>
            </select>
            <select name="population" defaultValue="population" onChange={handlePopulation}>
              <option value="population" disabled="disabled">Por Poblacion</option>
              <option value="desc">Mayor</option>
              <option value="asc">Menor</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

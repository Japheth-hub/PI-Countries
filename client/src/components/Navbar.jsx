import "../styles/Navbar.css"
import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import SearchBar from './SearchBar'
import { paises, continente, actividad, filterActivity, updateState, listaPagina, title } from "../redux/actions.js"


export default function Navbar() {

  const [page, setPage] = useState(1)
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
  function showPagina(paises, page) {
    dispatch(listaPagina(paises, page))
  }

  function handlePage(e) {
    setPage(parseInt(e.target.value))
  }

  function allPaises() {
    dispatch(paises())
    dispatch(title("All Countries"))
  }

  function hanldeContinent(e) {
    dispatch(continente(e.target.value));
    dispatch(title(e.target.value))
    e.target.value = "continente"
  }

  function handleActivity(e) {
    dispatch(filterActivity(e.target.value))
    dispatch(title(e.target.value))
    e.target.value = "activity"
  }

  function handleAlfabetic(e) {
    dispatch(updateState(e.target.value, "alfabetic"))
    e.target.value = "alfabetic"
  }
  function handlePopulation(e) {
    dispatch(updateState(e.target.value, "population"))
    e.target.value = "population"
  }

  useEffect(() => {
    if (selectPaises.length === 0) allPaises()
    if (selectActividades.length === 0) dispatch(actividad())
  }, [])

  useEffect(() => {
    setPage(1)
  }, [selectPaises])

  useEffect(() => {
    if (selectPaises.length > 0) {
      showPagina(selectPaises, page)
    }
  }, [selectPaises, page])


  return (
    <div className="Navbar">

      <div className="searchBar">
        <SearchBar />
      </div>

      <div className="pageAndFilters">
        <div className="filtros">
          <select name="continent" defaultValue="continente" onChange={hanldeContinent}>
            <option value="continente" disabled="disabled">Por Continentes</option>
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
              selectActividades.map((actividad) => (
                <option key={actividad.id} value={actividad.name}>{actividad.name}</option>
              ))
            )};
          </select>
        </div>

        <div className="paginado">
          <button onClick={() => { menos(page) }}>&#10094;</button>
          <input id="inputPage" type="number" value={page} onChange={handlePage} />
          <button onClick={() => { mas(page) }}>&#10095;</button>
        </div>

        <div className="filtros">
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
  )
}

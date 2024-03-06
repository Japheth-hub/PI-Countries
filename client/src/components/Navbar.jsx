import "../styles/Navbar.css"
import { React, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import SearchBar from './SearchBar'
import { paises, continente, actividad, filterActivity, updateState, title } from "../redux/actions.js"


export default function Navbar() {

  const selectPaises = useSelector(state => state.allCountries);
  const selectActividades = useSelector(state => state.allActivities);
  const dispatch = useDispatch();

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

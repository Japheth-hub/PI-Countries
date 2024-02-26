import "../styles/Home.css"
import React from "react"
import { useSelector } from "react-redux"
import Navbar from "./Navbar"
import Cards from "./Cards"

export default function home() {

  const selectPagina = useSelector(state => state.pagina);
  const title = useSelector(state => state.title);

  return (
    <div className="home">
      <Navbar />
      <Cards title={title} pagina={selectPagina} />
      <footer>Creado y Desarrollado por Angel Ramirez &copy;</footer>
    </div>
  )
}

import "../styles/Home.css"
import React from "react"
import { useSelector } from "react-redux"
import Navbar from "./Navbar"

export default function home() {

  const selectPagina = useSelector(state => state.pagina);
  const title = useSelector(state => state.title);
  // console.log(selectPagina)
  // console.log(title)
  
  return (
    <div className="home">
      <Navbar/>
      
    </div>
  )
}

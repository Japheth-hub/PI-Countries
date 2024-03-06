import "../styles/Home.css"
import {React, useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import Navbar from "./Navbar"
import Cards from "./Cards"
import {listaPagina} from "../redux/actions.js"

export default function Home() {

  const [page, setPage] = useState(1)
  const [array, setArray] = useState([])
  const selectPaises = useSelector(state => state.allCountries);
  const selectPagina = useSelector(state => state.pagina);
  const title = useSelector(state => state.title);
  const dispatch = useDispatch();
  let max = Math.ceil(selectPaises.length / 10)


  function menos(page) {
    if (page > 1) setPage(page - 1)
    if (page < 1) setPage(1)
  }
  function mas(page) {
    if (page < max) setPage(page + 1)
    if (page > max) setPage(max)
  }

  function showPagina(paises, page) {
    dispatch(listaPagina(paises, page))
  }

  function numPagina(item){
    setPage(item)
  }

  useEffect(() => {
    setPage(1)
    function allPaginas(paginas){
      const arreglo = []
      for(let i = 1; i <= paginas; i++){
        arreglo.push(i)
      }
      setArray(arreglo)
    }
    allPaginas(max)
  }, [selectPaises])

  useEffect(() => {
    if (selectPaises.length > 0) {
      showPagina(selectPaises, page)
    }
  }, [selectPaises, page])


  return (
    <div className="home">
      <Navbar />

      {title === "All Countries" ? (<h3>{title}</h3>) : (<h3>Busqueda por : <i>{title}</i></h3>)}

      <div className="paginado">
        <button onClick={() => { menos(page) }}>&#10094;</button>
            <span>{array.length > 0 ? array.map((item) => <button className={item === page ? 'active': ''} onClick={()=>numPagina(item)} key={item}>{item}</button>) : '1'}</span>
        <button onClick={() => { mas(page) }}>&#10095;</button>
      </div>

      <Cards pagina={selectPagina} />

      <footer>Creado y Desarrollado por Angel Ramirez &copy;</footer>
    </div>
  )
}

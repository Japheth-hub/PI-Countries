import {listaPagina} from "../redux/actions.js"

export function menos(page) {
    if (page > 1) setPage(page - 1)
    if (page < 1) setPage(1)
  }
  
export function mas(page) {
    if (page < max) setPage(page + 1)
    if (page > max) setPage(max)
  }

export function showPagina(paises, page, dispatch) {
    dispatch(listaPagina(paises, page))
  }

export function numPagina(item){
    setPage(item)
  }
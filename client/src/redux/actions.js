import { CONTINENTE, ACTIVIDAD, PAISES, COINCIDENCIA, FILTERACTIVITY, UPDATESTATE, LISTAPAGINA, TITLE, MODAL } from "./actionsTypes";
import axios from 'axios';
import { URLactivities, URLcountries } from "../helpers/endPoints";


export const paises = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URLcountries);
      return dispatch({
        type: PAISES,
        payload: data
      });
    } catch (error) {
      alert(error.response.data.error)
    }
  };
};

export const coincidencia = (text) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URLcountries}/name?name=${text}`)
      return dispatch({
        type: COINCIDENCIA,
        payload: data
      });
    } catch (error) {
      alert(error.response.data.error)
    }
  };
};

export const continente = (continente) => {
  return {
    type: CONTINENTE,
    payload: continente
  }
}

export const updateState = (orden, tipo) => {
  return {
    type: UPDATESTATE,
    payload: { orden, tipo }
  }
}

export const filterActivity = (activity) => {
  return {
    type: FILTERACTIVITY,
    payload: activity
  }
}

export const actividad = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URLactivities);
      return dispatch({
        type: ACTIVIDAD,
        payload: data
      })
    } catch (error) {
      alert(error.response.data.error)
    }
  }
}

export const listaPagina = (paises, page) => {
  const numPaises = 10;
  const offset = ((page - 1) * numPaises);
  const limit = offset + numPaises;
  const pagina = paises.slice(offset, limit);
  return {
    type: LISTAPAGINA,
    payload: pagina
  }
}

export const title = (title) => {
  return {
    type: TITLE,
    payload: title
  }
}

export const modal = (modal) => {
  return {
    type: MODAL,
    payload: modal
  }
}

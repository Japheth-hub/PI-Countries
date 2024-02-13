import { CONTINENTE, ACTIVIDAD, ORDEN, PAISES, COINCIDENCIA } from "./actionsTypes";
import axios from 'axios';

const URL = 'http://localhost:3001/countries'


export const paises = ()=>{
    return async (dispatch) => {
        try {
            const {data} = await axios(URL);
            return dispatch({
                type: PAISES,
                payload: data
            });
        } catch (error) {
            console.error(`Tenemos este error : ${error}`)
        }
    };
};

export const coincidencia = (text) => {
    return async (dispatch) => {
        try {
            const {data} = await axios(`${URL}/name?name=${text}`)
            return dispatch({
                type: COINCIDENCIA,
                payload: data
            });
        } catch (error) {
            console.error(`Tenemos este error : ${error}`)
        }
    };
};

export const continente = (continente)=>{
    return{
        type: CONTINENTE,
        payload: continente
    }
}
export const actividad = (actividad)=>{
    return{
        type: ACTIVIDAD,
        payload: actividad
    }
}

export const orden =(orden)=>{
    return{
        type: ORDEN,
        payload: orden
    }
}
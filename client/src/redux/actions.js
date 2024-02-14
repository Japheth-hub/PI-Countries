import { CONTINENTE, ACTIVIDAD, ORDEN, PAISES, COINCIDENCIA, FILTERACTIVITY, UPDATESTATE } from "./actionsTypes";
import axios from 'axios';

const URL = 'http://localhost:3001/countries'
const URLactivities = 'http://localhost:3001/activities'


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

export const actividad = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios(URLactivities);
            return dispatch({
                type: ACTIVIDAD,
                payload: data
            })
        } catch (error) {
            console.log('Tenemos este error : ' + error)
        }
    }
}

export const updateState =(orden, tipo) => {
    return {
        type: UPDATESTATE,
        payload: {orden, tipo}
    }
}

export const continente = (continente)=>{
    return{
        type: CONTINENTE,
        payload: continente
    }
}

export const filterActivity = (activity)=>{
    return{
        type: FILTERACTIVITY,
        payload: activity
    }
}

export const orden =(orden)=>{
    return{
        type: ORDEN,
        payload: orden
    }
}
import { CONTINENTE, ACTIVIDAD, ORDEN, PAISES, COINCIDENCIA } from "./actionsTypes";

const initialState = {
    allCountries: [],
    countries: []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case PAISES:
            return {    
                ...state,
                allCountries: action.payload,
                countries: action.payload
            };
        case COINCIDENCIA:
            return {
                ...state,
                allCountries: action.payload
            };
        case CONTINENTE:
            if(action.payload === 'Todos'){
                return {
                    ...state,
                    allCountries: [...state.countries]
                }
            } else {
                return {
                    ...state,
                    allCountries: state.countries.filter((pais) => pais && pais.continent === action.payload)
                }
            }
        default:
            return state;
    }
}
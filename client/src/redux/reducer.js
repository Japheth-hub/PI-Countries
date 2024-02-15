import { CONTINENTE, ACTIVIDAD, PAISES, COINCIDENCIA, FILTERACTIVITY, UPDATESTATE, LISTAPAGINA, TITLE } from "./actionsTypes";

const initialState = {
    allCountries: [],
    countries: [],
    allActivities:[],
    activities:[],
    pagina: [],
    title: ""
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
                return {
                    ...state,
                    allCountries: state.countries.filter((pais) => pais && pais.continent === action.payload)
                }

        case UPDATESTATE:
            const {orden, tipo} = action.payload;
            if(tipo === "population"){
                if(orden === "desc") state.allCountries.sort((a, b)=> b.population - a.population)
                if(orden === "asc") state.allCountries.sort((a, b)=> a.population - b.population)
            }
            if(tipo === "alfabetic"){
                if(orden === "desc") state.allCountries.sort((a, b)=> a.name.localeCompare(b.name))
                if(orden === "asc") state.allCountries.sort((a, b)=> b.name.localeCompare(a.name))
            }
            return{
                ...state,
                allCountries: [...state.allCountries]
            }

        case FILTERACTIVITY: 
            return {
                ...state,
                allCountries: state.countries.filter((pais)=> pais && pais.Activities.find((activity)=> activity && activity.name === action.payload))
            }

        case ACTIVIDAD:
            return {
                ...state, 
                allActivities: action.payload,
                activities: action.payload
            }

        case LISTAPAGINA:
            return {
                ...state,
                pagina: action.payload
            }
        
        case TITLE:
            return {
                ...state,
                title: action.payload
            }

        default:
            return state;
    }
}
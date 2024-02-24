import axios from 'axios'
import { URLactivities } from './endPoints';


export default async function createActivity(form) {
  try {
    const element = {
      name: form.name,
      dificult: form.dificult,
      duration: form.horas + ':' + (form.minutos < 10 ? '0' + form.minutos : form.minutos),
      season: form.season,
      paises: form.paises
    };
    const {data} = await axios.post(URLactivities, element)

    return [true, data.message]

  } catch (error) {
    return [false, error.response.data.message]
  }
}
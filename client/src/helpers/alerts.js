import axios from 'axios'


export default async function alertas(form) {
    let alert = []
    const URLActivitites = 'http://localhost:3001/activities'
    const array = [];

    for (let i = 0; i < form.paises.length; i++) {
        const element = {
            name: form.name,
            dificult: form.dificult,
            duration: form.horas + ':' + (form.minutos < 10 ? '0' + form.minutos : form.minutos),
            season: form.season,
            idPais: form.paises[i]
        };
        array.push(axios.post(URLActivitites, element))
    }

    await Promise.all(array)
        .then((res) => {
            console.log(res)
            alert.push(res[0].data.message)
            alert.push(true)
        })
        .catch((error) => {
            alert.push(`${error.response.data.message} : ${form.name}`)
            alert.push(false)
        })

    return alert;
}
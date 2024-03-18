import {React, useState} from 'react'


export default function Confirm({datos}) {
    console.log(datos.display)
    const [dis, setDis] = useState(datos.display)

    

  return (
    <div className='confirm' style={{display:dis}}>
        <div className='divConfirm'>
            <h5>¿?</h5>
            <div className='botonesConfirm'>
                <button onClick={()=>{confirmar(true)}}>Aceptar</button>
                <button onClick={()=>{confirmar(false)}}>Cancelar</button>
            </div>
        </div>
      </div>

  )
}

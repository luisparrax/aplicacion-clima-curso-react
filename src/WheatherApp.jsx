import { useState } from "react"

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = ''
    const difKelvin = 273.15
    const idioma = 'es'
    
 

    const [ciudad, setCiudad] = useState('')

    const [dataClima, setDataClima] = useState(null)

    const handleCambioDeCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0)
            fetchClima()
    }

    const fetchClima = async () => {
        try {
            const reponse = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}&lang=${idioma}`)
            const data = await reponse.json()
            setDataClima(data)
        } catch (error) {
            console.error('ocurrio el siguiente problema')
        }
    }

    return (
        <div className="container">
            <h1>Aplicacion de Clima</h1>


            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioDeCiudad}
                />
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                        <p>Condicion Meteorologica: {dataClima.weather[0].description}</p>
                        <img src={` https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                    </div>

                )
            }
        </div>
    )
}


import React, { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'

export const CardDetail = () => {

    const [ world , setWorld] = useState([])

    let params = useParams()
    

    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${params.id}`)
        .then(result => result.json())
        .then(response => {
            setWorld(response)
            console.log(world)
        })
        .catch((error) => console.log(error.errorMsg ? error.errorMsg : "Error de Red"));
    }, [])

    return (
        <div className='container'>
            {
                world.length !== 0 ?
                <table className="table table-dark">
                <tbody>
                    <tr>
                    <th scope="row">Nombre</th>
                    <td>{world.name}</td>
                    </tr>
                    <tr>
                    <th scope="row">Periodo de Rotación</th>
                    <td>{world.rotation_period} Hs</td>
                    </tr>
                    <tr>
                    <th scope="row">Periodo Orbital</th>
                    <td>{world.orbital_period} dias</td>
                    </tr>
                    <tr>
                    <th scope="row">Diametro</th>
                    <td>{world.diameter} Km</td>
                    </tr>
                    <tr>
                    <th scope="row">Clima</th>
                    <td>{world.climate}</td>
                    </tr>
                    <tr>
                    <th scope="row">Gravedad</th>
                    <td>{world.gravity}</td>
                    </tr>
                    <tr>
                    <th scope="row">Terreno</th>
                    <td>{world.terrain}</td>
                    </tr>
                    <tr>
                    <th scope="row">Superficie cubierta de agua</th>
                    <td>{world.surface_water} %</td>
                    </tr>
                    <tr>
                    <th scope="row">Población</th>
                    <td>{world.population}</td>
                    </tr>
                </tbody>
            </table> 
            : <p> Cargando... </p>
            }
         <Link className='btn btn-success' to="/">Volver</Link>
        </div>
    )
}

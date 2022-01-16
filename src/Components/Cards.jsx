import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export const Cards = (props) => {
    const [worlds, setWorlds] = useState([])
    const [valueInput, setValueInput] = useState([])

    const [loading, setLoading] = useState(false)

    const [nextPage, setNextPage] = useState([])
    const [previousPage, setPreviousPage] = useState([])

    var buscador = '?search=' + valueInput
    let url
    valueInput.length === 0 ?
        url = `https://swapi.dev/api/planets/` : url = `https://swapi.dev/api/planets/${buscador}`

    const fetchApi = async () => {
        await fetch(url)
            .then((result) => {
                if (result.ok) {
                    setLoading(false)
                    return result.json()
                } else {
                    throw {
                        status: result.status,
                        errorMsg: "Fallo el pedido"
                    }
                }
            })
            .then(response => {
                let { results, next, previous } = response
                setWorlds(results)
                setNextPage(next)
                setPreviousPage(previous)
            })
            .catch((error) => console.log(error.errorMsg ? error.errorMsg : "Error de Red"))
    }

    const getInput = (e) => {
        setValueInput(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (search) => {
        var resultSearch = worlds.filter((world) => {
            if (world.name.toLowerCase().includes(search.toLowerCase())) { return world }
        })
        setWorlds(resultSearch)
    }
    const prevPag = () => {
        previousPage && fetch(previousPage)
            .then(result => result.json())
            .then(response => {
                let { results, next, previous } = response
                setWorlds(results)
                setNextPage(next)
                setPreviousPage(previous)
            })
            .catch((error) => console.log(error.errorMsg ? error.errorMsg : "Error de Red"));
        window.scrollTo(0, 0)
    }

    const nextPag = () => {
        nextPage && fetch(nextPage)
            .then(result => result.json())
            .then(response => {
                let { results, next, previous } = response
                setWorlds(results)
                setNextPage(next)
                setPreviousPage(previous)
            })
            .catch((error) => console.log(error.errorMsg ? error.errorMsg : "Error de Red"));
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        setLoading(true)
        fetchApi()
    }, [valueInput])

    return (
        <div className='container-fluid'>
            <div className='container'>
                <form onSubmit={(e) => { e.preventDefault() }} className="form-inline d-flex">
                    <input value={valueInput}
                    onChange={(e) => { getInput(e) }} 
                    className="form-control mr-sm-2" type="search" 
                    placeholder="Search" aria-label="Search" 
                    name='search' />
                </form>
            </div>
            <div className='d-flex flex-wrap justify-content-around m-3'>
                {
                    worlds.length !== 0 ?
                        worlds.map((world, index) => (
                            <div key={index} className="card col-5 mb-3 text-center">
                                <img src="" className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h2 className="card-title text-success">{world.name}</h2>
                                    <p className="card-text">Diametro: {world.diameter} Km</p>
                                    <p className="card-text">Clima: {world.climate}</p>
                                    <p className="card-text">Terreno: {world.terrain}</p>
                                    <Link to={`/${index + 1}`} className="btn btn-primary">Ir al detalle </Link>
                                </div>
                            </div>
                        )) : loading ? <p> Caragando...</p> : <p> No se encontro resultado para <b>"{valueInput}"</b></p>
                }
            </div>
            {
                worlds.length !== 0 ?
                    <nav aria-label="" className='d-flex justify-content-center'>
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link"
                                    onClick={() => { prevPag() }}
                                >Anterior</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link"
                                    onClick={() => { nextPag() }}
                                >Siguiente</button>
                            </li>
                        </ul>
                    </nav> : ""
            }
        </div>
    )
}
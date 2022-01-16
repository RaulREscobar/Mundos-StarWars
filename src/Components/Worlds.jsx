import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CardDetail } from './CardDetail'
import { Cards } from './Cards'

export const Worlds = () => {

    return (
        <div className=''>
            <nav className="navbar navbar-light bg-light justify-content-around">
                <h1 className='text-danger'>Mundos de StarWars</h1>
            </nav>
            <Routes>
                <Route index path="/" element={< Cards />}/>
                <Route path="/:id" element={< CardDetail />}/>
            </Routes>
        </div>
    )
}

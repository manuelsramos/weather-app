import React, { useState } from 'react'
import { UilSearch, UilMapMarkerAlt } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inputs = ({ setQuery, units, setUnits }) => {

    const [city, setCity] = useState('')

    const handleSearchButton = () => {
        if (city !== '') setQuery({ q: city })
    }

    const handleLocationButton = () => {
        if (navigator.geolocation) {
            toast.info('Looking users location.')
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success('User Founded!')
                let lat = position.coords.latitude
                let lon = position.coords.longitude

                setQuery({ lat, lon })
            })
        }
    }

    const handleUnitsBottom = (e) => {
        const selectedUnit = e.currentTarget.name
        if (units !== selectedUnit) setUnits(selectedUnit);

    }

    return (

        <div className='flex flex-row justify-center my-6 '>

            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder='Search...' className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase" />
                <UilSearch size={25} className='text-white cursor-pointer transition 
                ease-out hover:scale-125' onClick={handleSearchButton} />

                <UilMapMarkerAlt size={25} className='text-white cursor-pointer transition 
                ease-out hover:scale-125' onClick={handleLocationButton} />
            </div>

            <div className="flex flex-row w-1/4 items-center justify-center">
                <button name='metric' className='text-xl text-white font-light transition 
                ease-out hover:scale-125' onClick={handleUnitsBottom}>°C </button>

                <p className="text-xl text-white mx-1"> |</p>

                <button name='imperial' className='text-xl text-white font-light transition 
                ease-out hover:scale-125' onClick={handleUnitsBottom}>°F</button>
            </div>
        </div>
    )
}

export default Inputs
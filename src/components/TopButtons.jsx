import React from 'react'

const TopButtons = ({ setQuery }) => {
    const cities = [
        {
            id: 1,
            title: 'Buenos Aires',

        },
        {
            id: 2,
            title: 'Maracaibo',
        },
        {
            id: 3,
            title: 'Medellin',
        },
        {
            id: 4,
            title: 'New York',
        },
        {
            id: 5,
            title: 'Santiago',
        }
    ]
    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map((city) => (
                <button key={city.id} className='text-white text-lg font-medium'
                    onClick={() => setQuery({ q: city.title })}>{city.title}</button>

            ))}
        </div>
    )
}

export default TopButtons
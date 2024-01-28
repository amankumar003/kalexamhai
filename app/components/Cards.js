import React from 'react'
import Link from 'next/link'

const Cards = ({ title, img, link }) => {
    return (
        <div className="max-w-xs rounded-xl overflow-hidden shadow-xl">
            <img className="w-full" src={img} alt="Card Image" />
            <div className="px-6 py-4">
                <div className=" font-semibold text-md mb-2">{title}</div>
                <Link href={`${link}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 text-sm px-4 rounded mt-4 mb-6">
                        See more
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Cards

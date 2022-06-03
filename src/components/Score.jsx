import React from 'react'

function Score({ value, highScore }) {
    return (
        <>
            <div className='info-text'>{`Score: ${value}`}</div>
            <div className='info-text'>{`High-Score: ${highScore}`}</div>
        </>
    )
}

export default Score;
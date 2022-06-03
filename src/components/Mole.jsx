import React from 'react'

const MOLE_SCORE = 100;

function Mole({onWhack}) {
  return (
    <button onClick={() => onWhack(MOLE_SCORE)}>Mole</button>
  )
}

export default Mole
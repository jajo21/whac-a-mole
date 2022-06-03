import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';

import Score from './components/Score';
import Timer from './components/Timer';
import Moles from './components/Moles';
import Mole from './components/Mole';

const TIME_LIMIT = 30000;
const NUMBER_OF_MOLES = 5;

function Game() {
    const [playing, setPlaying] = useState(false);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);

    const onWhack = points => setScore(score + points);

    const startGame = () => {
        setScore(0);
        setPlaying(true);
        setFinished(false);
    }

    const endGame = () => {
        setPlaying(false);
        setFinished(true);
    }

    return (
        <>
            {!playing && !finished &&
                <>
                    <h1>Whac-A-Mole</h1>
                    <button onClick={startGame}>Start Game</button>
                </>
            }

            {playing && (
                <>
                    <button 
                        className='end-game' 
                        onClick={endGame}
                        >End Game
                    </button>
                    <Score value={score} />
                    <Timer
                        time={TIME_LIMIT}
                        onEnd={endGame} />
                    <Moles>
                        {//Create 5 Moles
                            new Array(NUMBER_OF_MOLES).fill().map(
                                (_, index) => <Mole key={index} onWhack={onWhack}></Mole>
                            )
                        }
                    </Moles>
                </>)
            }
            {finished &&
                <>
                    <Score value={score}/>
                    <button onClick={startGame}>Play Again</button>
                </>
            }
        </>
    )
}

export default Game;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);


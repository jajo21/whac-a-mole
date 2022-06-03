import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';

import Score from './components/Score';
import Timer from './components/Timer';
import Moles from './components/Moles';
import Mole from './components/Mole';

import usePersistentState from './hooks/use-persistent-state';
import useAudio from './hooks/use-audio';

const TIME_LIMIT = 30000;
const NUMBER_OF_MOLES = 5;
const MOLE_SCORE = 100;

const generateMoles = amount => new Array(amount).fill().map(() => ({
    speed: gsap.utils.random(0.5, 1),
    delay: gsap.utils.random(0.5, 4),
    points: MOLE_SCORE
}))

function Game() {
    const [playing, setPlaying] = useState(false);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [moles, setMoles] = useState(generateMoles(NUMBER_OF_MOLES));
    const [highScore, setHighScore] = usePersistentState('whac-a-mole-hi', 0);
    const [newHighScore, setNewHighScore] = useState(false);
    const { play: playSqueak } = useAudio('https://assets.codepen.io/605876/squeak-in.mp3');

    const onWhack = points => {
        playSqueak();
        setScore(score + points);
    }

    const startGame = () => {
        setScore(0);
        setPlaying(true);
        setFinished(false);
        setNewHighScore(false);
    }

    const endGame = () => {
        setPlaying(false);
        setFinished(true);
        if(score > highScore) {
            setHighScore(score);
            setNewHighScore(true);
        }
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
                    <div className="info">
                        <Score value={score} highScore={highScore} />
                        <Timer
                            time={TIME_LIMIT}
                            onEnd={endGame} />
                    </div>
                    <Moles>
                        {//Create 5 Moles
                            moles.map(({ delay, speed, points }, index) =>
                                <Mole
                                    key={index}
                                    onWhack={onWhack}
                                    points={points}
                                    delay={delay}
                                    speed={speed}
                                ></Mole>
                            )
                        }
                    </Moles>
                </>)
            }
            {finished &&
                <>
                    {newHighScore && <div className="info-text">NEW High Score!</div>}
                    <Score value={score} highScore={highScore} />
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


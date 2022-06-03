import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap';

const POINTS_MULTIPLIER = 0.9
const TIME_MULTIPLIER = 1.25

function Mole({ onWhack, points, delay, speed, pointsMin = 10 }) {
    const [whacked, setWhacked] = useState(false)
    const buttonRef = useRef(null);
    const bobRef = useRef(null);
    const pointsRef = useRef(points);

    const whack = () => {
        setWhacked(true);
        onWhack(pointsRef.current);
    }

    useEffect(() => {
        gsap.set(buttonRef.current, {
            yPercent: 100,
            display: 'block'
        })
        bobRef.current = gsap.to(buttonRef.current, {
            yPercent: 0,
            duration: speed,
            yoyo: true,
            repeat: -1,
            delay: delay,
            repeatDelay: delay,
            onRepeat: () => {
                pointsRef.current = Math.floor(
                    Math.max(pointsRef.current * POINTS_MULTIPLIER, pointsMin)
                )
            },
        })
        return () => {
            if (bobRef.current) bobRef.current.kill()
        }
    }, [pointsMin, delay, speed])

    useEffect(() => {
        if(whacked) {
            pointsRef.current = points;
            bobRef.current.pause();
            gsap.to(buttonRef.current, {
                yPercent: 100,
                duration: 0.1,
                onComplete: () => {
                    gsap.delayedCall(gsap.utils.random(1, 3), () => {
                        setWhacked(false);
                        bobRef.current
                            .restart()
                            .timeScale(bobRef.current.timeScale() * TIME_MULTIPLIER)
                    })
                },
            })
        }
    }, [whacked]);

    return (
        <div className="mole-hole">
            <button
                className="mole"
                ref={buttonRef}
                onClick={whack}
            >
                <span className="sr-only">Whack</span>
            </button>
        </div>
    )
}

export default Mole
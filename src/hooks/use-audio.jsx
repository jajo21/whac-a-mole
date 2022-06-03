import { useState, useEffect } from 'react'

function useAudio(src, volume = 0.1) {
    const [audio, setAudio] = useState(null);
    useEffect(() => {
        const AUDIO = new Audio(src);
        AUDIO.volume = volume;
        setAudio(AUDIO);
    }, [src]);
    return {
        play: () => audio.play(),
        pause: () => audio.pause(),
        stop: () => {
            audio.pause();
            audio.currentTime = 0;
        },
    }
}

export default useAudio;
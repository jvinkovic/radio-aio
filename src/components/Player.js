import { useEffect, useRef } from 'react';

const Player = ({stream, streamName}) => {

    let playerRef = useRef();   

    useEffect(() => {
        playerRef.current.volume = 0.5;
        playerRef.current.load();
        playerRef.current.play();
    });

    return (<div>
        <h2>Banovina {streamName}</h2>        
        <audio ref={playerRef}
                preload="none"
                controls
                title="Radio Banovina">
            <source src={stream} />
        </audio>
    </div>);
}

export default Player;
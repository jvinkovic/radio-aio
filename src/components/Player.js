import { useEffect, useRef } from 'react';

const Player = ({stream, streamName, webUrl}) => {

    let playerRef = useRef();   

    useEffect(() => {
        playerRef.current.volume = 0.5;
        playerRef.current.load();
        playerRef.current.play();
    });

    return (<div className='player'>
        <h2>
            {(webUrl && <a target='_blank' href={webUrl} rel='noreferrer'>{streamName}</a>)
                || streamName}
        </h2>        
        <audio ref={playerRef}
                preload="none"
                controls
                title="Radio Banovina">
            <source src={stream} />
        </audio>
    </div>);
}

export default Player;
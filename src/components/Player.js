import { useEffect, useRef } from 'react';

const Player = ({stream}) => {

    let playerRef = useRef();   

    useEffect(() => {
        playerRef.current.volume = 0.5;
        playerRef.current.load();
        playerRef.current.play();
    });

    return (<div className='player'>
        <h2>
            {(stream.web && <a target='_blank' href={stream.web} rel='noreferrer'>{stream.name}</a>)
                || stream.name}
        </h2>
        
        {stream.frequencies && 
        <div style={{margin: '10px'}}>
            {stream.frequencies?.map(f => 
                <span key={f} style={{margin: '5px', fontStyle: 'italic'}}>{f}</span>
            )} Mhz
        </div>}
        <audio ref={playerRef}
                preload="none"
                controls
                title="Radio Banovina">
            <source src={stream.url} />
        </audio>
    </div>);
}

export default Player;

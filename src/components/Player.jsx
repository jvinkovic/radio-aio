import { useEffect, useRef } from 'react';

const Player = ({stream}) => {
    let playerRef = useRef();

    useEffect(() => {
        const player = playerRef.current;
        try {
            player.volume = 0.5;
            player.load();
            player.play()
                .catch(e => {
                    console.warn('Auto play failed:', e);
                });
        } catch (e) {
            console.warn('Cannot auto start playing audio:', e);
        }        
    }, [stream.url]);

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
                preload="metadata"
                controls
                title="Radio">
            <source src={stream.url} />
        </audio>
    </div>);
}

export default Player;

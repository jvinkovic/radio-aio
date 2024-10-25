import './App.css';
import { useEffect, useState } from 'react';
import Player from './components/Player';
import CurrentSong from './components/CurrentSong';
import streams from './shared/Streams';

const App = () => { 
  const [currentStream, setCurrentStream] = useState(streams[0]);  

  const changeStream = (stream) => {
    setCurrentStream(stream);
  }

  useEffect(() => {
    const wl = navigator.wakeLock.request();
    wl.then(r => console.log('wake lock:', !r.released));
  }, []);

  useEffect(() => {
    document.title = 'Radio: ' + currentStream.name;
  }, [currentStream.name]);

  const changeTheme = (e) => {
    // not to interupt player / make rerender
    document.getElementById('app').classList.toggle('dark');
    document.getElementById('checkbox').setAttribute('checked', !e.target.checked);
  }

  const showHistory = () => {
    // not to interupt player / make rerender
    document.getElementById('history-urls').classList.toggle('invisible');
  }

  return (
    <div id='app' className={'App dark'}>
      <aside>
        <div style={{textAlign: 'left'}}>
          <span onClick={showHistory}>Povijest</span>
          {showHistory && 
            <div className='invisible' id='history-urls' style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxHeight: '15vh'}}>          
              {streams.map(s => 
                s.historyUrl && <a key={s.url} target='_blank' rel='noreferrer' href={s.historyUrl} style={{marginRight: '10px'}}>{s.name}</a>
              )}          
            </div>}
        </div>

        <div className="theme-switch-wrapper">
        <label className="theme-switch" htmlFor="checkbox">
          <input type="checkbox" id="checkbox" onClick={changeTheme} />
          <div className="slider round"></div>
        </label>
      </div>
      </aside>

      <Player stream={currentStream} />
       {(currentStream.currentSongUrl 
          && <CurrentSong isPlaying={true} url={currentStream.currentSongUrl} interval={15} songDataFunc={currentStream.currentSongDataFunc}/>)
        || <span>??</span>}
      <hr/>
      
      <div className='streams'>
        {streams.map(s => 
              <button key={s.url} className={s.url === currentStream.url ? 'selected stream-select' : 'stream-select'} onClick={() => changeStream(s)}>{s.name}</button>
        )}
      </div>

      <hr />

      <div className='current-songs' style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {streams.map(s =>           
          <div key={s.url}>
            <h4 className={s.url === currentStream.url ? 'selected stream-select-mini' : 'stream-select-mini'} 
              onClick={() => changeStream(s)}>{s.name}</h4>
            <CurrentSong url={s.currentSongUrl} songDataFunc={s.currentSongDataFunc} onTitleClicked={() => changeStream(s)} />
          </div>
          )}
      </div>
    </div>
  );
}

export default App;

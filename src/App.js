import './App.css';
import Player from './components/Player';
import CurrentSong from './components/CurrentSong';

import { Uzivo, Light, Turbo } from './shared/Streams';
import { UzivoCurrent, LightCurrent, TurboCurrent } from './shared/CurrentSongs';
import { UzivoList, LightList, TurboList } from './shared/Lists';

import { useEffect, useState } from 'react';

function App() { 
  const [stream, setStream] = useState(Uzivo);
  const [streamName, setStreamName] = useState('Uživo');
  const [songUrl, setSongUrl] = useState(UzivoCurrent);

  const changeStream = (stream, name, currentUrl) => {
    setStream(stream);
    setStreamName(name);
    setSongUrl(currentUrl);
  }

  useEffect(() => {
    const wl = navigator.wakeLock.request();
    wl.then(r => console.log('wake lock:', !r.released));
  }, []);

  useEffect(() => {
    document.title = streamName + ' - Banovina AIO';
  }, [streamName]);

  const changeTheme = (e) => {
    // not to interupt player / make rerender
    document.getElementById('app').classList.toggle('dark');    
    document.getElementById('checkbox').setAttribute('checked', !e.target.checked);
  }

  return (
    <div id='app' className={'App dark'}>
      <aside>
        <div>
          <a target='_blank' rel='noreferrer' href={UzivoList}>Uživo povijest</a>
          <a target='_blank' rel='noreferrer' href={LightList}>Light povijest</a>
          <a target='_blank' rel='noreferrer' href={TurboList}>Turbo povijest</a>
        </div>

        <div className="theme-switch-wrapper">
        <label className="theme-switch" htmlFor="checkbox">
          <input type="checkbox" id="checkbox" onClick={changeTheme} />
          <div className="slider round"></div>
        </label>
      </div>
      </aside>

      <h1>Banovina All in one</h1>
      <Player stream={stream} streamName={streamName} />
      <CurrentSong url={songUrl} interval={15}/>

      <hr/>
      
      <div className='streams'>
        <button className={Uzivo === stream ? 'selected' : null} onClick={() => changeStream(Uzivo, 'Uživo', UzivoCurrent)}>Uživo</button>
        <button className={Light === stream ? 'selected' : null} onClick={() => changeStream(Light, 'Light', LightCurrent)}>Light</button>
        <button className={Turbo === stream ? 'selected' : null} onClick={() => changeStream(Turbo, 'Turbo', TurboCurrent)}>Turbo</button>
      </div>

      <hr />

      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{width: '33vw'}}>
          <h4>Uživo</h4>
          <CurrentSong url={UzivoCurrent} />
        </div>
        <div style={{width: '33vw'}}>
          <h4>Light</h4>
          <CurrentSong url={LightCurrent} />
        </div>
        <div style={{width: '33vw'}}>
          <h4>Turbo</h4>
          <CurrentSong url={TurboCurrent} />
        </div>
      </div>
    </div>
  );
}

export default App;

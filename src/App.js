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
    document.title = streamName + ' - Banovina AIO';
  }, [streamName]);

  return (
    <div className="App"> 
      <h1>Banovina All in one</h1>
      <Player stream={stream} streamName={streamName} />
      <CurrentSong url={songUrl} interval={15}/>

      <aside>
        <a target='_blank' rel='noreferrer' href={UzivoList}>Uživo povijest</a>
        <a target='_blank' rel='noreferrer' href={LightList}>Light povijest</a>
        <a target='_blank' rel='noreferrer' href={TurboList}>Turbo povijest</a>
      </aside>
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

import { useEffect, useState } from 'react';
import useInterval from "use-interval-hook";

const CurrentSong = ({url, interval}) => {

    const [songData, setSongData] = useState(null);

    const getData = () => {
        fetch(url).then(r => r.json())
            .then(data => setSongData(data));
    }

    const {
        stop,
      } = useInterval({
        interval: (interval || 30)*1000,
        callback: getData,
        delay: 300
      });

    useEffect(() => {
        getData();

        return function cleanup() {
          stop();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    let title = songData?.nowplaying;
    if(!title) {
      title = "??";
    }

    let cover = songData?.coverart;
    if(!cover) {
      cover = songData?.covers[0];
    }

    return (<>
            <h3>{title}</h3>
            <img src={ cover || ''} alt='Cover' />
        </>);
}

export default CurrentSong;
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
    }, [url]);

    return (<>
            <h3>{songData?.nowplaying}</h3>
            <img src={songData?.coverart} alt='Cover' />
        </>);
}

export default CurrentSong;
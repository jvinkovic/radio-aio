import { useEffect, useState } from 'react';
import useInterval from "use-interval-hook";
import PropTypes from 'prop-types';

const CurrentSong = ({url, songDataFunc, interval: checkInterval}) => {
    const [songData, setSongData] = useState(null);

    const getData = () => {
        fetch(url).then(r => r.json())
            .then(data => songDataFunc(data, setSongData));
    }

    const {
        stop,
      } = useInterval({
        interval: (checkInterval || 30)*1000,
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

    const cover = songData?.coverart;
    const artist = songData?.artist;

    return (<>
            <h3>{title}</h3>
            <h4>{artist}</h4>
            <img src={ cover || ''} alt='Cover' />
        </>);
}

CurrentSong.propTypes = {
  url: PropTypes.string.isRequired,
  songDataFunc: PropTypes.func,
  checkInterval: PropTypes.number
};
/*
songDataFunc = {
  data: PropTypes.any,
  setFunc: PropTypes.func({data: PropTypes.shape({
      nowplaying: PropTypes.string.isRequired,
      coverart: PropTypes.string,
      artist: PropTypes.string
    })
  }).isRequired
}
  */

export default CurrentSong;
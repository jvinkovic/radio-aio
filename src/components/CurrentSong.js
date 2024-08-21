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

    let cover = songData?.coverart;
    if(!cover) {
      cover = songData?.covers[0];
    }

    return (<>
            <h3>{title}</h3>
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
      covers: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired
}
  */

export default CurrentSong;
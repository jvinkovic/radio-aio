import { useEffect, useState } from 'react';
import useInterval from "use-interval-hook";
import PropTypes from 'prop-types';
import genericCover from '../assets/cover.jpg';
import ModalImage from "react-modal-image";

const CurrentSong = ({url, songDataFunc, checkInterval, onTitleClicked}) => {
    const [songData, setSongData] = useState(null);

    const getData = () => {
      if(!!songDataFunc && !!url) {
        songDataFunc(url, setSongData);
      }
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
            <h3 className='song-title' style={{cursor: !!onTitleClicked ? 'pointer' : 'auto'}} 
              onClick={onTitleClicked}>{title}</h3>
            <h4 className='artist'>{artist}</h4>
            <ModalImage
              className='cover-img'
              small={cover || genericCover}
              large={cover || genericCover}
              alt="Cover art" />            
        </>);
}

CurrentSong.propTypes = {
  url: PropTypes.string,
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
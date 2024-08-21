const banovinaSongDataFunc = (input, setFunc) => {
    const data = {
        nowplaying: input.nowplaying,
        coverart: input.coverart,
        covers: input.covers
    };
    
    setFunc(data);
};

/* list of streams to be shown
    name: name to show
    url: stream url
    web: radio webpage
    historyUrl: link to songs history (optional)
    currentSongUrl: url to current song details (optional)
    currentSongDataFunc: function to transform current song data (optional)
*/
const streams = [
    { 
        name: 'Banovina Uživo',
        url: 'https://audio.radio-banovina.hr:9998/stream',
        web: 'https://www.radio-banovina.hr/',
        historyUrl: 'https://www.radio-banovina.hr/uzivo/song_history.html',
        currentSongUrl: 'https://pool.alter-media.hr:2020/json/stream/banovina',
        currentSongDataFunc: banovinaSongDataFunc
    },
    { 
        name: 'Banovina Light',
        url: 'https://audio.radio-banovina.hr:7008/stream',
        web: 'https://www.radio-banovina.hr/',
        historyUrl: 'https://www.radio-banovina.hr/light/povijest.html',
        currentSongUrl: 'https://pool.alter-media.hr:2020/json/stream/light',
        currentSongDataFunc: banovinaSongDataFunc
    },
    { 
        name: 'Banovina Turbo',
        url: 'https://audio.radio-banovina.hr:7010/stream',
        web: 'https://www.radio-banovina.hr/',
        historyUrl: 'https://www.radio-banovina.hr/turbo/povijest.html',
        currentSongUrl: 'https://pool.alter-media.hr:2020/json/stream/turbo',
        currentSongDataFunc: banovinaSongDataFunc
    },
    { 
        name: 'Đakovo',
        url: 'https://ec2s.crolive.com.hr:8305/stream',
        web: 'https://www.radio-djakovo.hr/'
    }
];

export default streams;
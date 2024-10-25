const getDataSocket = (url, onMessageFunc) => {
    const socket = new WebSocket(url);

    socket.onopen = function(event) {
    // Handle connection open
    };

    socket.onmessage = function(event) {
        onMessageFunc(event.data);
    };

    socket.onclose = function(event) {
    // Handle connection close
    };

    const sendMessage = (message) => {
        socket.send(message);
    }

    return {};
}

const banovinaSongDataFunc = (url, setFunc) => {
    fetch(url).then(r => r.json()).then(result => {
        const data = {
            nowplaying: result.nowplaying,
            coverart: result.coverart
        };
        
        setFunc(data);
    });
};

const tamburaskiSongDataFunc = (url, setFunc) => {
    fetch(url).then(r => r.json()).then(result => {
        const album = !!result?.album ? result.album : ' / ';
        const data = {
            nowplaying: `${result.title} (${album})`,
            coverart: result.cover,
            artist: result.artist
        };
        
        setFunc(data);
    });
}

const antenaSongDataFunc = (url, setFunc) => {
    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url))
        .then(response => response.json())
        .then(result => {
            const data = {
                nowplaying: `${result?.contents.split(' - ')[1]}`,
                coverart: null,
                artist: result?.contents.split(' - ')[0]
            };
            
            setFunc(data);
        })
        .catch(error => console.error('Fetch error:', error));
}

const otvoreniSongDataFunc = (url, setFunc) => {
    getDataSocket(url, (data) => {
        setFunc(data);
    });
}

/* list of streams to be shown
    name: name to show
    url: stream url
    web: radio webpage
    historyUrl: link to songs history (optional)
    currentSongUrl: url to current song details (optional)
    currentSongDataFunc: function to transform current song data (optional)
    frequencies: FM frequencies on which radio is available (MHz)
*/
const streams = [
    { 
        name: 'Tamburaški',
        url: 'https://listen.radioking.com/radio/552965/stream/612287',
        web: 'https://www.tamburaski.com/',        
        currentSongUrl: 'https://api.radioking.io/widget/radio/tamburaskiradio/track/current',
        currentSongDataFunc: tamburaskiSongDataFunc,
    },
    { 
        name: 'DRS',
        url: 'https://eu2.fastcast4u.com/proxy/mic0?mp=/stream&1724290816711',
        web: 'https://drugacija.me/',
        frequencies: ['104,8', '101,5', '97,1', '95,5', '93,0', '90,3'],
    },
    { 
        name: 'Banovina Uživo',
        url: 'https://audio.radio-banovina.hr:9998/stream',
        web: 'https://www.radio-banovina.hr/',
        frequencies: ['99,1', '96,8', '93,2'],
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
        web: 'https://www.radio-djakovo.hr/',
        frequencies: ['100,2', '89,6'],
    },
    { 
        name: 'Slavonski',
        url: 'https://ec2s.crolive.com.hr:8035/stream',
        web: 'https://www.slavonskiradio.hr/',
        frequencies: ['106,2', '100,6', '91,0', '89,7'],
    },
    { 
        name: 'Antena Zagreb',
        url: 'https://audio.social3.hr/listen/antena_aac/stream?9637',
        web: 'https://www.antenazagreb.hr/',
        frequencies: ['89,7'],
        currentSongUrl: 'https://streaming.antenazagreb.hr/stream/player/info/listen_antena_aac_.txt',
        currentSongDataFunc: antenaSongDataFunc
    },
    { 
        name: 'Otvoreni',
        url: 'https://stream2.otvoreni.hr/otvoreni',
        web: 'https://www.otvoreni.hr/',
        frequencies: ['107,9', '107,5', '107,3', '105,6', '104,4', '104,3', '104,2', '103,3', '102,6', 
                        '99,3', '97,7', '93,2', '97,3', '92,6', '92,5', '91,2', '91,1', '90,6', '89,6', '88,3', '87,6'],
        currentSongUrl: 'wss://s-usc1f-nss-2501.firebaseio.com/.ws?v=5&ns=otvoreni-radio-player',
        currentSongDataFunc: otvoreniSongDataFunc
    }
];

export default streams;

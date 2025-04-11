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


const shoutemDataRead = (url) => {
    return fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url))
            .then(response => response.json())
            .then(result => {            
                const htmlObject = document.createElement('div');
                htmlObject.innerHTML = result?.contents;
                const info = htmlObject.innerText;
    
                if(!info) {
                    return;
                }
    
                const listeners = info.split(',')[0];
                let currentInfo = info.split(',');
                currentInfo.reverse();
                currentInfo = currentInfo[0];
                const artist = currentInfo.split(' - ')[0];
                const title = currentInfo.split(' - ')[1];
                const data = {
                    nowplaying: `${title} [#${listeners}]`,
                    artist: artist,                        
                };
                
                return data;
            });
}

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

const DRSSongDataFunc = (url, setFunc) => {
    shoutemDataRead(url).then(r => {
        const data = {
            nowplaying: r.nowplaying,
            artist: r.artist,
            coverart: 'https://amu.me/wp-content/uploads/2018/04/DRS-logo3-300x192-1.jpg'
        };
        
        setFunc(data);    
    });
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

const radioDjakovoSongDataFunc = (url, setFunc) => {
    const data = {
        coverart: 'https://www.radio-djakovo.hr/wp-content/uploads/2018/06/Radio-Djakovo-live-stream-logo-final.jpg'
    };
    setFunc(data);
}

const slavonskiSongDataFunc = (url, setFunc) => {
    const data = {
        coverart: 'https://slavonskiradio.hr/wp-content/uploads/2024/09/LOGO-SLAVONSKI-COLOR-PNG.png'
    };
    setFunc(data);
}

const antenaSongDataFunc = (url, setFunc) => {
    try {
    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url))
        .then(response => response.json())
        .then(result => {
            const data = {
                nowplaying: `${result?.contents.split(' - ')[1]}`,
                coverart: 'https://scontent.fzag4-1.fna.fbcdn.net/v/t39.30808-6/304747763_5345156328853214_6405861778952560806_n.jpg?_nc_eui2=AeHn9JS_sn2soMekfRFyBWTZs2tcGviE0TWza1wa-ITRNd10UfHQpM8nPQLSxAnEp46y_WOfOBU2wf1fw6_5ySDU&_nc_ohc=ptgtTJawwb8Q7kNvgF08lXt&_nc_ht=scontent.fzag4-1.fna&_nc_gid=AOmTKboOwr4TDgfhyN88dss&oh=00_AYDow_jwQ8jP0O9blAwEbHyTAOZhStPPg3HP8yauNMhaog&oe=67220793',
                artist: result?.contents.split(' - ')[0]
            };
            
            setFunc(data);
        })
        .catch(error => console.warn('Fetch error:', error));
    }catch(e){
        console.error('Antena get song error:', e)
    }
}

const otvoreniSongDataFunc = (url, setFunc) => {
    getDataSocket(url, (result) => {
        const data = {
            nowplaying: result.nowplaying,
            coverart: 'https://www.otvoreni.hr/ea/wp-content/themes/otvoreni-wp/assets/art/logo-v3.png'
        };
        setFunc(data);
    });
}

/////////////////////
/// Format for streams
////////////////////
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
        url: 'https://eu2.fastcast4u.com/proxy/mic0?mp=/stream',  
        web: 'https://drugacija.me/',
        frequencies: ['104,8', '101,5', '97,1', '95,5', '93,0', '90,3'],
        currentSongUrl: 'https://eu2.fastcast4u.com/proxy/mic0/7.html',
        currentSongDataFunc: DRSSongDataFunc,
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
        currentSongUrl: 'dummy',
        currentSongDataFunc: radioDjakovoSongDataFunc

    },
    { 
        name: 'Slavonski',
        url: 'https://ec2s.crolive.com.hr:8035/stream',
        web: 'https://www.slavonskiradio.hr/',
        frequencies: ['106,2', '100,6', '91,0', '89,7'],
        currentSongUrl: 'dummy',
        currentSongDataFunc: slavonskiSongDataFunc
    },
    { 
        name: 'Antena Zagreb',
        url: 'https://audio.social3.hr/listen/antena_aac/stream',
        web: 'https://www.antenazagreb.hr/',
        historyUrl: 'https://streaming.antenazagreb.hr/stream/player/player.html',
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

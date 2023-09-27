import './App.css';
import ClosedHH from './static/Cev_H2.mp3';
import OpenHH from './static/Dsc_Oh.mp3';
import Heater1 from './static/Heater-1.mp3';
import Heater2 from './static/Heater-2.mp3';
import Heater3 from './static/Heater-3.mp3';
import Heater4 from './static/Heater-4_1.mp3';
import Clap from './static/Heater-6.mp3';
import KickNHat from './static/Kick_n_Hat.mp3';
import Kick from './static/RP4_KICK_1.mp3';
import React from 'react';

const sounds = [
  {
    title: 'Heater 1',
    src: Heater1,
    keyid: 'q'
  },
  {
    title: 'Heater 2',
    src: Heater2,
    keyid: 'w'
  },
  {
    title: 'Heater 3',
    src: Heater3,
    keyid: 'e'
  },
  {
    title: 'Heater 4',
    src: Heater4,
    keyid: 'a'
  },
  {
    title: 'Clap',
    src: Clap,
    keyid: 's'
  },
  {
    title: 'Open HH',
    src: OpenHH,
    keyid: 'd'
  },
  {
    title: 'Kick & Hat',
    src: KickNHat,
    keyid: 'z'
  },
  {
    title: 'Kick',
    src: Kick,
    keyid: 'x'
  },
  {
    title: 'Closed HH',
    src: ClosedHH,
    keyid: 'c'
  }
]

const DrumPad = ({audiosrc, title, keyid, clickHandler, backgroundRef}) => {
  const [isPlaying, setPlaying] = React.useState(false);

  const audioRef = React.useRef(null);

  const buttonRef = React.useRef(null);

  const keyDownHandler = event => {
    if (event.key.toLowerCase() === keyid){
      // audioRef.current.play()
      buttonRef.current.focus();
      buttonRef.current.click();
    }
  };
  React.useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const handleClick = (e) => {
    clickHandler(e);
    audioRef.current.play();
    setPlaying(true);
    backgroundRef.current.classList.add('animate');
    setTimeout(() => {
      setPlaying(false);
      backgroundRef.current.classList.remove('animate');
    }, 100);

  }

  return (
    <button className="drum-pad" onClick={handleClick} name={keyid} ref={buttonRef} style={{backgroundColor: isPlaying ? '#6F5643' : '',}}>
      <audio src={audiosrc}  id={keyid} ref={audioRef}/>
      {keyid.toUpperCase()}
    </button>
  )
};

const Display = (props) => {
  return (
    <div id="display">
      {props.drumPlaying}
    </div>
  )
}
const App = () => {

  const backgroundRef = React.useRef(null);

  const matchKeytoTitle = (sounds, pressedid) => {
    for (const sound of sounds){
      if (sound.keyid === pressedid.toLowerCase()){
        return sound.title
      }
    }
  }

  const [drumPlaying, setDrumPlaying] = React.useState(null);

  const clickHandler = e => {
    setDrumPlaying(matchKeytoTitle(sounds, e.target.name));
  }

  const extractKeys = sounds => {
    return sounds.map(sound => {return sound.keyid})
  }

  const keysarr = extractKeys(sounds);
  const keyDownHandler = event => {
    if (keysarr.includes(event.key)){
      setDrumPlaying(matchKeytoTitle(sounds, event.key))
    }
  };
  React.useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (

    <div className="App">
      <div className="background-circle" ref={backgroundRef}></div>
     <div id="drum-machine">
     {
          sounds.map((sound) => {
            return <DrumPad audiosrc={sound.src} title={sound.title} keyid={sound.keyid} key={sound.keyid} clickHandler={clickHandler} backgroundRef={backgroundRef}/>

          })
        }
     </div>
     <Display drumPlaying={drumPlaying}/>
    </div>
  );
}

export default App;

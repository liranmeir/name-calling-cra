import { useEffect, useState } from "react";
import liranImg from "./assets/liran.png";
import liranAudio from "./assets/liran.mp3";
import tzippiImg from "./assets/tzippi.png";
import tzippiAudio from "./assets/tzippi.mp3";
import galImg from "./assets/gal.png";
import galAudio from "./assets/gal.mp3";
import benImg from "./assets/ben.png";
import benAudio from "./assets/ben.mp3";
import razImg from "./assets/raz.png";
import razAudio from "./assets/raz.mp3";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./App.css";
// import SpeechToText from "./SpeechToText";
type FamilyAudioMap = {
  [key: string]: {
    audio: HTMLAudioElement;
    image: string;
  };
};
const FAMILY_AUDIO_MAP: FamilyAudioMap = {
  liran: { audio: new Audio(liranAudio), image: liranImg },
  tzippi: { audio: new Audio(tzippiAudio), image: tzippiImg },
  gal: { audio: new Audio(galAudio), image: galImg },
  ben: { audio: new Audio(benAudio), image: benImg },
  raz: { audio: new Audio(razAudio), image: razImg },
};

function App() {
  const [multiplier, setMultiplier] = useState(1);
  const [transcript, setTranscript] = useState("");
  const { finalTranscript, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setTranscript(finalTranscript);
    resetTranscript();
  };
  useEffect(() => {
    // Obtain access to user's microphone
    //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    //     const audioContext = new AudioContext();
    //     const source = audioContext.createMediaStreamSource(stream);
    //     const analyser = audioContext.createAnalyser();
    //     // Connect microphone data to analyser node
    //     source.connect(analyser);
    //     // Process microphone data every 100ms
    //     // setInterval(() => {
    //     //   const bufferLength = analyser.frequencyBinCount;
    //     //   const dataArray = new Uint8Array(bufferLength);
    //     //   analyser.getByteFrequencyData(dataArray);
    //     //   // Calculate average volume of microphone data
    //     //   const sum = dataArray.reduce((a, b) => a + b, 0);
    //     //   const avg = sum / bufferLength;
    //     //   // Set multiplier based on average volume
    //     //   setMultiplier(avg / 128 + 1);
    //     // }, 2000);
    //   });
  }, []);

  const handleClick = (p: string) => {
    const audio = FAMILY_AUDIO_MAP[p].audio;
    audio.play();
  };

  return (
    <div className="App">
      <div className="wrapper">
        {Object.keys(FAMILY_AUDIO_MAP).map((p, index) => {
          let randomNumber = Math.floor(Math.random() * 4) + 1;
          const style =
            randomNumber === index ? { transform: `scale(${multiplier})` } : {};
          return (
            <div className="card" style={style}>
              <button onClick={() => handleClick(p)}>
                <img src={FAMILY_AUDIO_MAP[p].image} className="card-image" />
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handleListen}>Start Listening</button>
        <button onClick={handleStop}>Stop Listening</button>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default App;

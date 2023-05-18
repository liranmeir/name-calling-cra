import { useEffect, useRef, useState } from "react";
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
  const lockRef = useRef<boolean | null>(null);
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);

  const {
    interimTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  useEffect(() => {
    handleInterimTranscript(interimTranscript);

    function handleInterimTranscript(interimTranscript: string) {
      if (interimTranscript.toLowerCase() === "abba") {
        // SpeechRecognition.stopListening();
        handleClick("liran", 0);
      }
      
    }
  }, [interimTranscript]);

  const handleClick = (p: string, index: number) => {
    if (lockRef.current) {
      return;
    }
    lockRef.current = true;
    const audio = FAMILY_AUDIO_MAP[p].audio;
    audio.play()
        .then(() => {
          setEnlargedIndex(index);

          setTimeout(() => {
            setEnlargedIndex(null);
            lockRef.current = null;
          }, 2000);
        })
        .catch((error) => {
          console.error('Failed to play audio:', error);
        });
  };

  return (
    <div className="App">
      <div>
        <h1>
          {listening && "you said:"}
          {interimTranscript}
        </h1>
      </div>
      <div className="wrapper">
        {Object.keys(FAMILY_AUDIO_MAP).map((p, index) => {
          const enlargeClassName = enlargedIndex === index ? "enlarged" : "";
          return (
            <div className={"card " + enlargeClassName} key={index}>
              <button onClick={() => handleClick(p, index)}>
                {/*  eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={FAMILY_AUDIO_MAP[p].image} className="card-image" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

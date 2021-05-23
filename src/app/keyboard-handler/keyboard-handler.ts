import React from "react";
import * as Tone from "tone";
import { ActionCreatorWithoutPayload, Dispatch } from "@reduxjs/toolkit";
import kick from "../../assets/drums/kick.mp3";
import bugara1 from "../../assets/drums/bugara1.mp3";
import bugara2 from "../../assets/drums/bugara2.mp3";
import ceng from "../../assets/drums/ceng.mp3";
import demung1 from "../../assets/drums/demung1.mp3";
import demung2 from "../../assets/drums/demung2.mp3";
import demung3 from "../../assets/drums/demung3.mp3";
import djembe1 from "../../assets/drums/djembe1.mp3";
import djembe2 from "../../assets/drums/djembe2.mp3";
import djembe3 from "../../assets/drums/djembe3.mp3";
import jegog from "../../assets/drums/jegog.mp3";
import hat from "../../assets/drums/hat.mp3";
import kantilan from "../../assets/drums/kantilan.mp3";
import kempur from "../../assets/drums/kempur.mp3";
import piano from "../../assets/drums/piano.mp3";
import spring from "../../assets/drums/tuned-spring.mp3";
import snare from "../../assets/drums/snare.mp3";
import tambura from "../../assets/drums/tambura.mp3";
import tom from "../../assets/drums/tom.mp3";
import trumpet from "../../assets/drums/trumpet.mp3";
import kalimba from "../../assets/drums/kalimba.mp3";
import gamelan1 from "../../assets/drums/gamelan.mp3";
import gamelan2 from "../../assets/drums/gamelan2.mp3";
import gamelan3 from "../../assets/drums/gamelan3.mp3";
import ruler from "../../assets/drums/tuned-ruler.mp3";
import bowl from "../../assets/drums/bowl.mp3";
import harmonium from "../../assets/drums/harmonium.mp3";
import kazoo from "../../assets/drums/kazoo.mp3";
import oboe from "../../assets/drums/oboe.mp3";
import organ from "../../assets/drums/organ.mp3";
import oud from "../../assets/drums/oud.mp3";
import rebana from "../../assets/drums/rebana.mp3";
import ride from "../../assets/drums/ride.mp3";
import hiss from "../../assets/drums/trumpethiss.mp3";
import voice from "../../assets/drums/voice.mp3";
import singing from "../../assets/drums/singing.mp3";
import Player from "../music-logic/Player";

interface SampleUrls {
  [key: string]: string;
}

export const sampleUrls: SampleUrls = {
  " ": kick,
  a: kick,
  b: bugara1,
  c: bugara2,
  d: ceng,
  e: demung1,
  f: demung2,
  g: demung3,
  h: djembe1,
  i: djembe2,
  j: djembe3,
  k: jegog,
  l: hat,
  m: kantilan,
  n: kalimba,
  o: kazoo,
  p: kempur,
  q: piano,
  r: singing,
  s: snare,
  t: spring,
  u: tambura,
  v: tom,
  w: trumpet,
  x: gamelan1,
  y: gamelan2,
  z: gamelan3,
  "0": ruler,
  "1": bowl,
  "2": harmonium,
  "3": oboe,
  "4": organ,
  "5": oud,
  "6": rebana,
  "7": ride,
  "8": hiss,
  "9": voice,
};
const players: Player[] = [];
const playTypes: ["SINGLE", "LOOP", "RAPID"] = ["SINGLE", "LOOP", "RAPID"];
export const setSamples = (
  dispatch: Dispatch,
  setStarted: ActionCreatorWithoutPayload<string>,
  setAttemptingToLoad: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let sampleBuffers: { [key: string]: Tone.ToneAudioBuffer } = {};
  const sampleUrlsKeys = Object.keys(sampleUrls);
  for (let i = 0; i < sampleUrlsKeys.length; i++) {
    const sampleBuffer = new Tone.ToneAudioBuffer(
      sampleUrls[sampleUrlsKeys[i]],
      () => {
        sampleBuffers[sampleUrlsKeys[i]] = sampleBuffer;
        const player = new Player(
          sampleUrlsKeys[i],
          playTypes[Math.floor(Math.random() * playTypes.length)],
          sampleUrls[sampleUrlsKeys[i]]
        );
        player.player.buffer = sampleBuffer;
        player.playType === "LOOP"
          ? (player.player.loop = true)
          : (player.player.loop = false);
        players.push(player);
        dispatch(setStarted());
        setAttemptingToLoad(false);
      }
    );
  }
};

let currentKeys: null | string[] = null;
const resetPlayersNotCurrentlyPlaying = () => {
  players.forEach((player) => {
    if (!currentKeys?.includes(player.keyAssignment) && player.playing) {
      player.playing = false;
      if (player.playType === "LOOP") player.player.stop();
    }
  });
};
export const musicLoop = () => {
  if (currentKeys) {
    resetPlayersNotCurrentlyPlaying();
    currentKeys.forEach((key) => {
      const currPlayer = players.find((player) => player.keyAssignment === key);
      if (currPlayer?.playType === "RAPID") {
        currPlayer.player.start();
      } else if (currPlayer && !currPlayer.playing) {
        currPlayer.playing = true;
        currPlayer.player.start();
      }
    });
  }
  requestAnimationFrame(musicLoop);
};

export const setCurrentKeys = (cK: string[]) => (currentKeys = cK);

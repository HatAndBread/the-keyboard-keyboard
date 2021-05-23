import React from "react";
import KeyboardKey from "./KeyboardKey";
import { sampleUrls } from "../../keyboard-handler/keyboard-handler";
import "./KeyboardEditor.css";

const KeyboardEditor = () => {
  const validKeys = Object.keys(sampleUrls);
  return (
    <div className="KeyboardEditor">
      <div className="keyboard-row key-nums">
        <KeyboardKey key={"1"} myKey={"1"} />
        <KeyboardKey key={"2"} myKey={"2"} />
        <KeyboardKey key={"3"} myKey={"3"} />
        <KeyboardKey key={"4"} myKey={"4"} />
        <KeyboardKey key={"5"} myKey={"5"} />
        <KeyboardKey key={"6"} myKey={"6"} />
        <KeyboardKey key={"7"} myKey={"7"} />
        <KeyboardKey key={"8"} myKey={"8"} />
        <KeyboardKey key={"9"} myKey={"9"} />
        <KeyboardKey key={"0"} myKey={"0"} />
      </div>
      <div className="keyboard-row qwer">
        <KeyboardKey key={"Q"} myKey={"Q"} />
        <KeyboardKey key={"W"} myKey={"W"} />
        <KeyboardKey key={"E"} myKey={"E"} />
        <KeyboardKey key={"R"} myKey={"R"} />
        <KeyboardKey key={"T"} myKey={"T"} />
        <KeyboardKey key={"Y"} myKey={"Y"} />
        <KeyboardKey key={"U"} myKey={"U"} />
        <KeyboardKey key={"I"} myKey={"I"} />
        <KeyboardKey key={"O"} myKey={"O"} />
        <KeyboardKey key={"P"} myKey={"P"} />
      </div>
      <div className="keyboard-row asdf">
        <KeyboardKey key={"A"} myKey={"A"} />
        <KeyboardKey key={"S"} myKey={"S"} />
        <KeyboardKey key={"D"} myKey={"D"} />
        <KeyboardKey key={"F"} myKey={"F"} />
        <KeyboardKey key={"G"} myKey={"G"} />
        <KeyboardKey key={"H"} myKey={"H"} />
        <KeyboardKey key={"J"} myKey={"J"} />
        <KeyboardKey key={"K"} myKey={"K"} />
        <KeyboardKey key={"L"} myKey={"L"} />
      </div>
      <div className="keyboard-row zxcva">
        <KeyboardKey key={"Z"} myKey={"Z"} />
        <KeyboardKey key={"X"} myKey={"X"} />
        <KeyboardKey key={"C"} myKey={"C"} />
        <KeyboardKey key={"V"} myKey={"V"} />
        <KeyboardKey key={"B"} myKey={"B"} />
        <KeyboardKey key={"N"} myKey={"N"} />
        <KeyboardKey key={"M"} myKey={"M"} />
      </div>
    </div>
  );
};

export default KeyboardEditor;

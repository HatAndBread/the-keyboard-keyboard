import React from "react";
import "./KeyboardKey.css";

const KeyboardKey = ({ myKey }: { myKey: string }) => {
  return <div className="KeyboardKey">{myKey}</div>;
};

export default KeyboardKey;

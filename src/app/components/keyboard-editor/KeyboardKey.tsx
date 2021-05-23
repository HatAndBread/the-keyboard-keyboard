import React from "react";
import "./KeyboardKey.css";

const KeyboardKey = ({
  myKey,
  extraClassName,
}: {
  myKey: string;
  extraClassName?: string;
}) => {
  const getCorrectLabel = () => {
    switch (myKey) {
      case " ":
        return "space";
      default:
        return myKey.toUpperCase();
    }
  };
  return (
    <div
      className={
        extraClassName ? `KeyboardKey ${extraClassName}` : "KeyboardKey"
      }>
      {getCorrectLabel()}
    </div>
  );
};

export default KeyboardKey;

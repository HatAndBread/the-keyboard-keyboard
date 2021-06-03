import React, { useState, useRef, useEffect } from 'react';
import p5 from 'p5';
interface Props {
  currentText: string;
  width: number;
  height: number;
}
const Sketch = ({ currentText, width, height }: Props) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState<null | p5>(null);
  useEffect(() => {
    let myDiv: null | HTMLDivElement;
    const canRef = canvasRef.current;
    if (canRef) {
      const sketch = (myP: p5) => {
        myP.setup = () => {
          myP.createCanvas(width, height);
          myP.background(
            myP.random(0, 250),
            myP.random(0, 250),
            myP.random(0, 250)
          );
        };
      };
      myDiv = document.createElement('div');
      canRef.appendChild(myDiv);
      setP(new p5(sketch, myDiv));
    }
    return () => {
      myDiv && canRef?.removeChild(myDiv);
    };
  }, []);
  useEffect(() => {
    const ran = () => Math.floor(Math.random() * 250);
    const color = `rgb(${ran()}, ${ran()}, ${ran()})`;
    if (p) {
      p.draw = () => {
        p.background(color);
        p.text(currentText, 10, 10);
      };
    }
  }, [currentText]);

  useEffect(() => {
    if (p) {
      p.resizeCanvas(width, height);
    }
  }, [width, height]);

  return <div ref={canvasRef} style={{ borderRadius: '16px' }}></div>;
};

export default Sketch;

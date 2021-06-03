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
          myP.createCanvas(100, 100);
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
    const ran = (num: number) => Math.floor(Math.random() * num);
    const color = `rgb(${ran(250)}, ${ran(250)}, ${ran(250)})`;
    const randBW = Math.floor(Math.random() * 2) ? color : 'black';
    const bez = {
      x1: ran(width),
      x2: ran(width),
      x3: ran(width),
      x4: ran(width),
      y1: ran(height),
      y2: ran(height),
      y3: ran(height),
      y4: ran(height),
    };
    if (p) {
      p.resizeCanvas(width, height);
      p.draw = () => {
        p.text(currentText, 10, 10);
        bez.x1 += p.random([-3, 3]);
        bez.x2 += p.random([-3, 3]);
        bez.x3 += p.random([-3, 3]);
        bez.x4 += p.random([-3, 3]);
        bez.y1 += p.random([-3, 3]);
        bez.y2 += p.random([-3, 3]);
        bez.y3 += p.random([-3, 3]);
        bez.y4 += p.random([-3, 3]);
        p.strokeWeight(10);
        p.fill(bez.x1, bez.x2, bez.x3);
        p.bezier(
          bez.x1,
          bez.y1,
          bez.x2,
          bez.y2,
          bez.x3,
          bez.y3,
          bez.x4,
          bez.y4
        );
        p.fill(bez.y1, bez.y2, bez.y3);
        p.bezier(
          bez.x1,
          bez.y1,
          bez.x2,
          bez.y2 * 2,
          bez.x3,
          bez.y3 * 2,
          bez.x4,
          bez.y4
        );
        p.stroke(randBW);
        p.line(bez.x1, bez.y1, bez.x4, bez.y4);
      };
    }
  }, [currentText, width, height, p]);

  return <div ref={canvasRef}></div>;
};

export default Sketch;

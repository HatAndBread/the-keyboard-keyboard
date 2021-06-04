import React, { useState, useRef, useEffect } from 'react';
import p5 from 'p5';
import { random } from 'lodash';

interface Props {
  currentText: string;
  width: number;
  height: number;
}
let vars: any = {};
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
    vars = {};
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
      p.clear();
      const randomColor = () =>
        `rgb(${p.random(255)}, ${p.random(255)}, ${p.random(255)})`;
      const sketches: (() => any)[] = [
        () => {
          p.clear();
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
        },
        () => {
          if (!vars.letters) {
            vars.letters = [];
            for (let i = 0; i < p.floor(p.random(20)); i++) {
              vars.letters.push({
                letter: currentText[currentText.length - 1],
                x: p.random(width),
                y: p.random(height),
                velX: p.random(-10, 10),
                velY: p.random(-10, 10),
              });
            }
          }
          vars.letters.forEach((letter: any) => {
            let ranNum = p.floor(p.random(10));
            if (ranNum === 1) {
              letter.velX = p.random(-10, 10);
              letter.velY = p.random(-10, 10);
            }
            p.strokeWeight(1);
            p.fill(p.random(255), p.random(255), p.random(255));
            p.textSize(width / p.floor(p.random(15, 20)));
            p.text(letter.letter, letter.x, letter.y);
            letter.x += letter.velX;
            letter.y += letter.velY;
          });
        },
        () => {
          if (!vars.xOff) {
            vars.xOff = p.random(0, 10000);
            vars.yOff = p.random(0, 10000);
            vars.zOff = p.random(0, 10000);
            vars.rOff = p.random(0, 10000);
            vars.gOff = p.random(0, 10000);
            vars.bOff = p.random(0, 10000);
            vars.qOff = p.random(0, 10000);
            vars.noiser1 = 0;
            vars.noiser2 = 0;
            vars.noiser3 = 0;
            vars.rNoiser = 0;
            vars.gNoiser = 0;
            vars.bNoiser = 0;
            vars.qNoiser = 0;
            vars.whiteBack = false;
          }
          const spiralMaker = (x: number, y: number, radius: number) => {
            let decreasingR = radius;
            let decreasingCos = 1;
            let decreasingSin = 1;
            p.noFill();
            p.beginShape();
            for (let i = 0; i < Math.PI * 2 * 30; i += 0.01) {
              let newX = x + decreasingR * Math.cos(i - decreasingCos);
              let newY = y + decreasingR * Math.sin(i - decreasingSin);
              p.vertex(newX, newY);
              decreasingR -= vars.noiser1;
              decreasingCos -= vars.noiser2;
              decreasingSin -= vars.noiser2;
            }
            p.endShape();
          };

          vars.noiser1 = p.noise(vars.xOff);
          vars.noiser2 = p.noise(vars.yOff);
          vars.noiser3 = p.noise(vars.zOff);
          vars.rNoiser = p.noise(vars.rOff);
          vars.gNoiser = p.noise(vars.gOff);
          vars.bNoiser = p.noise(vars.bOff);
          vars.qNoiser = p.noise(vars.qOff);

          let ran = p.floor(p.random(0, 1000));

          if (ran === 420) {
            vars.whiteBack = true;
          }
          if (ran === 421) {
            vars.whiteBack = false;
          }

          p.background(
            p.map(vars.rNoiser, 0, 1, 0, 255),
            p.map(vars.gNoiser, 0, 1, 0, 255),
            p.map(vars.bNoiser, 0, 1, 0, 255)
          );
          p.strokeWeight(p.round(p.map(vars.qNoiser, 0, 1, 1, 5)));
          if (vars.whiteBack) {
            p.stroke(255);
          } else {
            p.stroke(0);
          }
          spiralMaker(width / 2, height / 2, width);
          vars.xOff += 0.0003;
          vars.yOff += 0.0003;
          vars.zOff += 0.0003;
          vars.rOff += 0.01;
          vars.gOff += 0.01;
          vars.bOff += 0.01;
          vars.qOff += 0.05;
        },
      ];
      p.resizeCanvas(width, height);
      p.draw = sketches[Math.floor(Math.random() * sketches.length)];
    }
  }, [currentText, width, height, p]);

  return <div ref={canvasRef}></div>;
};

export default Sketch;

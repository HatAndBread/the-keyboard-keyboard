import React, { useState, useRef, useEffect } from 'react';
import p5 from 'p5';
import { random } from 'lodash';
import { Player } from 'tone';

interface Props {
  currentText: string;
  latestLetter: string;
  width: number;
  height: number;
}
let vars: any = {};
const Sketch = ({ currentText, latestLetter, width, height }: Props) => {
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
            vars.clear = p.floor(p.random(2));
            for (let i = 0; i < p.floor(p.random(20, 30)); i++) {
              vars.letters.push({
                letter: currentText[currentText.length - 1],
                x: p.width / 2,
                y: p.height / 2,
                r: p.floor(p.random(255)),
                g: p.floor(p.random(255)),
                b: p.floor(p.random(255)),
                velX: p.random(-10, 10),
                velY: p.random(-10, 10),
              });
            }
          }
          if (vars.clear) p.clear();
          vars.letters.forEach((letter: any) => {
            let ranNum = p.floor(p.random(10));
            if (ranNum === 1) {
              letter.velX = p.random(-10, 10);
              letter.velY = p.random(-10, 10);
            }
            p.strokeWeight(1);
            p.fill(letter.r, letter.g, letter.b);
            p.textSize(width / p.floor(p.random(15, 20)));
            p.text(letter.letter, letter.x, letter.y);
            letter.x += letter.velX;
            letter.y += letter.velY;
            letter.r > 255
              ? (letter.r = p.floor(p.random(255)))
              : (letter.r += 1);
            letter.g > 255
              ? (letter.g = p.floor(p.random(255)))
              : (letter.g += 1);
            letter.b > 255
              ? (letter.b = p.floor(p.random(255)))
              : (letter.b += 1);
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
        () => {
          if (!vars.noiseX) {
            vars.noiseX = 0;
            vars.noiseY = 100000;
            vars.lineStart = 10000;
            vars.lineEnd = 20000;
            vars.ellHeight = 1;
            vars.ellWidth = 1;
            vars.clear = p.floor(p.random(2));
          }
          if (vars.clear) p.clear();
          let ellX = p.noise(vars.noiseX) * width;
          let ellY = p.noise(vars.noiseY) * height;
          let startNoise = p.noise(vars.lineStart) * width;
          let endNoise = p.noise(vars.lineEnd) * height;
          p.strokeWeight(1);
          p.stroke(255);
          p.fill(ellX / 2, ellY / 2, random(0, 255));

          p.ellipse(ellX, ellY, ellX / 4, ellY / 4);
          vars.noiseX += 0.01;
          vars.noiseY += 0.01;
          vars.ellHeight += 0.05;
          vars.ellWidth += 0.05;
          vars.lineStart += 0.03;
          vars.lineEnd += 0.03;

          p.beginShape();
          p.vertex(startNoise, endNoise);
          p.vertex(ellX, ellY);
          for (let i = 0; i < 10; i += 0.05) {
            p.noFill();
            p.vertex(
              p.noise(vars.noiseX + i) * width,
              p.noise(vars.noiseY + i) * height
            );
          }
          p.vertex(startNoise, endNoise);
          p.endShape();
        },
        () => {
          if (!vars.wanderer) {
            vars.wanderer = 0.05;
            vars.changer = 0.05;
            vars.reverse = false;
            vars.mouseX = p.floor(p.random(200));
            vars.mouseY = p.floor(p.random(200));
          }
          const spiralMaker = (
            x: number,
            y: number,
            radius: number,
            deviation: number,
            changingR: number
          ) => {
            let decreasingR = radius;
            let decreasingCos = 1;
            let decreasingSin = 1;
            p.noFill();
            p.beginShape();

            for (let i = 0; i < Math.PI * 2 * 50; i += 0.01) {
              let newX = x + decreasingR * Math.cos(i - decreasingCos);
              let newY = y + decreasingR * Math.sin(i - decreasingSin);
              p.vertex(newX, newY);
              decreasingR -= vars.mouseY * 0.001;
              decreasingCos -= vars.mouseX * 0.0005;
              decreasingSin -= vars.mouseX * 0.0005;
            }

            p.endShape();
          };
          p.strokeWeight(p.floor(p.random(1, 3)));
          if (vars.changer <= 0.05) {
            vars.reverse = false;
          }
          let ran = p.floor(p.random(0, 400));
          if (ran === 4) {
            vars.reverse = true;
          }
          if (ran === 5) {
            vars.reverse = false;
          }
          vars.wanderer += +0.0001;
          if (vars.reverse) {
            vars.changer -= 0.001;
          } else {
            vars.changer += 0.001;
          }
          p.background(0);
          p.stroke(220);
          spiralMaker(
            width / 2,
            height / 2,
            width,
            vars.wanderer,
            vars.changer
          );
          vars.mouseX += p.floor(p.random(-3, 3));
          vars.mouseY += p.floor(p.random(-3, 3));
          if (vars.mouseX > p.width) {
            vars.mouseX = p.floor(200);
          }
          if (vars.mouseY > p.height) {
            vars.mouseY = p.floor(200);
          }
        },
      ];
      p.resizeCanvas(width, height);
      p.draw = sketches[Math.floor(Math.random() * sketches.length)];
    }
  }, [latestLetter, width, height, p]);

  return <div ref={canvasRef}></div>;
};

export default Sketch;
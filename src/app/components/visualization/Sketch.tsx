import React, { useState, useRef, useEffect } from 'react';
import { resetDisplayText } from '../../music-logic/music-loop';
import p5 from 'p5';

let dontShowAnyKey = false;
interface Props {
  currentText: string;
  latestLetter: string;
  width: number;
  height: number;
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
  isBadBrowser: boolean | undefined;
}
let vars: any = {};
const Sketch = ({
  currentText,
  latestLetter,
  width,
  height,
  setCurrentText,
  isBadBrowser,
}: Props) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState<null | p5>(null);
  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    setCurrentText('');
    resetDisplayText();
    return () => {
      setCurrentText('');
      resetDisplayText();
    };
  }, [setCurrentText]);

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
      setP(null);
    };
  }, []);
  useEffect(() => {
    return () => {
      if (p) {
        p.noLoop();
        p.draw = () => {};
      }
    };
  }, [p]);
  useEffect(() => {
    vars = {};
    const ran = (num: number) => Math.floor(Math.random() * num);
    const color = `rgb(${ran(250)}, ${ran(250)}, ${ran(250)})`;
    const randBW = Math.floor(Math.random() * 2) ? color : 'black';

    if (p) {
      p.clear();
      const randomColor = () =>
        `rgb(${p.floor(p.random(255))}, ${p.floor(p.random(255))}, ${p.floor(
          p.random(255)
        )})`;
      const sketches: (() => any)[] = [
        () => {
          if (!vars.myLetters) {
            p.frameRate(30);
            const startPoint = p.width / 2 - 100;
            vars.myLetters = [
              { letter: 'p', x: startPoint, y: p.height / 2 },
              { letter: 'r', x: startPoint + 20, y: p.height / 2 },
              { letter: 'e', x: startPoint + 40, y: p.height / 2 },
              { letter: 's', x: startPoint + 60, y: p.height / 2 },
              { letter: 's', x: startPoint + 80, y: p.height / 2 },
              { letter: ' ', x: startPoint + 100, y: p.height / 2 },
              { letter: 'a', x: startPoint + 120, y: p.height / 2 },
              { letter: 'n', x: startPoint + 140, y: p.height / 2 },
              { letter: 'y', x: startPoint + 160, y: p.height / 2 },
              { letter: ' ', x: startPoint + 180, y: p.height / 2 },
              { letter: 'k', x: startPoint + 200, y: p.height / 2 },
              { letter: 'e', x: startPoint + 220, y: p.height / 2 },
              { letter: 'y', x: startPoint + 240, y: p.height / 2 },
            ];
          }
          p.clear();
          p.textFont('monospace');
          p.strokeWeight(1);
          p.stroke(
            p.floor(p.random(255)),
            p.floor(p.random(255)),
            p.floor(p.random(255))
          );
          p.fill(
            p.floor(p.random(255)),
            p.floor(p.random(255)),
            p.floor(p.random(255))
          );
          p.textSize(40);
          vars.myLetters.forEach(
            (
              letter: { letter: string; x: number; y: number },
              index: number
            ) => {
              p.text(letter.letter, letter.x, letter.y);
              letter.x += p.random(-1, 1);
              letter.y += p.random(-1, 1);
            }
          );
        },
        () => {
          if (!vars.bez) {
            vars.bez = {
              x1: ran(width),
              x2: ran(width),
              x3: ran(width),
              x4: ran(width),
              y1: ran(height),
              y2: ran(height),
              y3: ran(height),
              y4: ran(height),
            };
          }
          vars.bez.x1 += p.random([-3, 3]);
          vars.bez.x2 += p.random([-3, 3]);
          vars.bez.x3 += p.random([-3, 3]);
          vars.bez.x4 += p.random([-3, 3]);
          vars.bez.y1 += p.random([-3, 3]);
          vars.bez.y2 += p.random([-3, 3]);
          vars.bez.y3 += p.random([-3, 3]);
          vars.bez.y4 += p.random([-3, 3]);
          p.strokeWeight(10);
          p.fill(vars.bez.x1, vars.bez.x2, vars.bez.x3);
          p.bezier(
            vars.bez.x1,
            vars.bez.y1,
            vars.bez.x2,
            vars.bez.y2,
            vars.bez.x3,
            vars.bez.y3,
            vars.bez.x4,
            vars.bez.y4
          );
          p.fill(vars.bez.y1, vars.bez.y2, vars.bez.y3);
          p.bezier(
            vars.bez.x1,
            vars.bez.y1,
            vars.bez.x2,
            vars.bez.y2 * 2,
            vars.bez.x3,
            vars.bez.y3 * 2,
            vars.bez.x4,
            vars.bez.y4
          );
          p.stroke(randBW);
          p.line(vars.bez.x1, vars.bez.y1, vars.bez.x4, vars.bez.y4);
        },
        () => {
          if (!vars.letters) {
            p.frameRate(50);
            vars.letters = [];
            vars.clear = p.floor(p.random(2));
            vars.fontSize = p.floor(p.random(50)) + 6;
            for (let i = 0; i < p.floor(p.random(20, 30)); i++) {
              vars.letters.push({
                letter: latestLetter,
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
            p.textSize(vars.fontSize);
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
            p.frameRate(20);
            vars.xOff = p.random(500, 1000);
            vars.yOff = p.random(500, 1000);
            vars.zOff = p.random(500, 1000);
            vars.rOff = p.random(500, 1000);
            vars.gOff = p.random(500, 1000);
            vars.bOff = p.random(500, 1000);
            vars.qOff = p.random(500, 1000);
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
            for (let i = 0; i < Math.PI * 10; i += 0.01) {
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
          if (!vars.wanderer) {
            p.frameRate(20);
            vars.wanderer = 0.05;
            vars.changer = 0.05;
            vars.reverse = false;
            vars.mouseX = p.floor(p.random(200));
            vars.mouseY = p.floor(p.random(200));
            vars.clear = p.floor(p.random(2));
            vars.background = randomColor();
            vars.noFill = p.floor(p.random(2));
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
            vars.noFill
              ? p.noFill()
              : p.fill(
                  p.floor(p.random(255)),
                  p.floor(p.random(255)),
                  p.floor(p.random(255))
                );
            p.stroke(
              p.floor(p.random(255)),
              p.floor(p.random(255)),
              p.floor(p.random(255))
            );
            p.beginShape();

            for (let i = 0; i < Math.PI * 2 * 30; i += 0.01) {
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
          if (vars.clear) p.background(vars.background);
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
        () => {
          if (!vars.circles) {
            p.frameRate(50);
            vars.noFill = p.floor(p.random(3));
            if (vars.noFill) {
              p.noFill();
            }
            vars.circles = [];
            let numTimes = isBadBrowser ? 20 : 200;
            for (let i = 0; i < numTimes; i++) {
              vars.circles.push({
                x: p.floor(p.random() * width),
                y: p.floor(p.random() * height),
                color: randomColor(),
                radius: p.floor(p.random(100)),
              });
              vars.weight = p.floor(p.random(10)) + 1;
            }
          }
          p.strokeWeight(vars.weight);
          p.clear();
          vars.circles.forEach(
            (circle: {
              x: number;
              y: number;
              color: string;
              radius: number;
            }) => {
              if (!vars.noFill && !isBadBrowser) {
                p.fill(randomColor());
              }
              p.stroke(circle.color);
              p.ellipse(circle.x, circle.y, circle.radius, circle.radius);
              circle.radius += 3;
            }
          );
        },
      ];
      p.resizeCanvas(width, height);
      if (firstTime && !dontShowAnyKey) {
        p.draw = sketches[0];
        dontShowAnyKey = true;
      } else {
        p.draw =
          sketches[Math.floor(Math.random() * (sketches.length - 1)) + 1];
      }
    }
  }, [latestLetter, width, height, p, firstTime, isBadBrowser]);
  useEffect(() => {
    if (currentText.length === 1) {
      setFirstTime(false);
    }
  }, [currentText, setFirstTime]);

  return <div ref={canvasRef} className='Sketch'></div>;
};

export default Sketch;

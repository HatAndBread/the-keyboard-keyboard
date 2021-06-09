import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../App';
import './KeyboardTabs.css';

const KeyboardTabs = () => {
  const ctx = useContext(Context);
  const currentKeyboard = ctx.currentKeyboardName;
  const numberOfTabs = ctx.keyboardNames ? ctx.keyboardNames.length : 0;
  const [elementDragging, setElementDragging] = useState<
    undefined | { name: string; index: number }
  >();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleChange = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleChange);
    return () => window.removeEventListener('resize', handleChange);
  }, [setScreenWidth]);

  const colors = [
    'springgreen',
    'tomato',
    'yellow',
    'PowderBlue',
    'orange',
    'LightPink',
    'tan',
    'red',
    'PaleGoldenRod',
    'MediumTurquoise',
    'LightSalmon',
    'lime',
    'green',
  ];
  const setKeyboard = (name: string) => {
    if (ctx.setCurrentKeyboardName) ctx.setCurrentKeyboardName(name);
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const dataset = e.currentTarget.dataset;
    if (dataset.name && dataset.index) {
      setElementDragging({
        name: dataset.name,
        index: parseInt(dataset.index),
      });
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const index = parseInt(
      e.currentTarget.dataset.index ? e.currentTarget.dataset.index : '0'
    );
    const newKeyboardNames = ctx.keyboardNames?.map((kName) => kName);
    if (newKeyboardNames && elementDragging && ctx.setKeyboardNames) {
      newKeyboardNames.splice(elementDragging.index, 1);
      newKeyboardNames.splice(index, 0, elementDragging.name);
      ctx.setKeyboardNames(newKeyboardNames);
      setKeyboard(elementDragging.name);
    }
    setElementDragging(undefined);
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (ctx.setCurrentModal) ctx.setCurrentModal('edit-keyboard-name');
  };

  return (
    <div className='KeyboardTabs'>
      {ctx.keyboardNames &&
        ctx.keyboardNames.map((name, index) => {
          return (
            <div
              draggable
              onDragStart={handleDragStart}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDoubleClick={handleDoubleClick}
              data-index={index}
              data-name={name}
              key={name}
              className='keyboard-tab'
              onDrop={handleDrop}
              onClick={() => setKeyboard(name)}
              style={{
                backgroundColor: colors[index]
                  ? colors[index]
                  : colors[index % colors.length],
                boxShadow:
                  name === currentKeyboard
                    ? `#7189ff 0px 4px 8px 2px`
                    : 'grey 2px 2px 2px 0px',
                right: `${index * 20}px`,
                zIndex: name === currentKeyboard ? 500 : 499 - index,
                fontWeight: name === currentKeyboard ? 'bold' : 'initial',
                width: `${
                  screenWidth / 15 - numberOfTabs * 2 > 40
                    ? screenWidth / 15 - numberOfTabs * 2
                    : 40
                }px`,
              }}>
              {name}
            </div>
          );
        })}
    </div>
  );
};

export default KeyboardTabs;

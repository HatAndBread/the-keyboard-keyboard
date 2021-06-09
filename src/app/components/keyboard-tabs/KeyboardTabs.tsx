import React, { useContext, useState } from 'react';
import { Context } from '../../../App';
import './KeyboardTabs.css';

const KeyboardTabs = () => {
  const ctx = useContext(Context);
  const currentKeyboard = ctx.currentKeyboardName;
  const [elementDragging, setElementDragging] = useState<
    undefined | { name: string; index: number }
  >();
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
              }}>
              {name}
            </div>
          );
        })}
    </div>
  );
};

export default KeyboardTabs;

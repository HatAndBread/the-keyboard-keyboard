import React, { useContext } from 'react';
import { Context } from '../../../App';
import './KeyboardTabs.css';

const KeyboardTabs = () => {
  const ctx = useContext(Context);
  const currentKeyboard = ctx.currentKeyboardName;
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
    if (ctx.setCurrentKeyboardName) {
      ctx.setCurrentKeyboardName(name);
    }
  };
  return (
    <div className='KeyboardTabs'>
      {ctx.keyboardNames &&
        ctx.keyboardNames.map((name, index) => {
          return (
            <div
              key={name}
              className='keyboard-tab'
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

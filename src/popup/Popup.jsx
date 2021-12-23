import React, { useEffect, useState } from 'react';
import 'twin.macro';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { PopupWrapper, ItemWrapper, Title } from './Popup.style';

const Popup = () => {
  const [theme, setTheme] = useState();

  const getActiveTheme = async () => {
    // Call bg.js to get the stored theme
    const res = await chrome.runtime.sendMessage({
      message: 'getTheme',
    }, (res) => {
      const { theme } = res || [{
        name: 'colorfulErrorColor',
        properyName: ' --colorful-error-color',
        value: '#d33682',
      }];
      setTheme(theme);
    });
  };

  const handleChange = async (color, name) => {
    await chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          message: 'logColor',
          action: { color, name },
        });
      });
    });

    await chrome.runtime.sendMessage({
      message: 'updateTheme',
      action: { color, name },
    });
  };

  useEffect(() => {
    getActiveTheme();
  }, []);

  return (
    <PopupWrapper>
      {
        theme?.length > 0 && theme.map((i) => {
          return (
            <ItemWrapper key={i.name}>
              <Title>{i.name}</Title>
              <HexColorPicker
                color={i.value}
                onChange={(e) => handleChange(e, i.name)}
              />
            </ItemWrapper>
          );
        })
      }
    </PopupWrapper>
  );
};

export default Popup;

/* eslint-disable prefer-const */

chrome.runtime.onMessage.addListener((request) => {
  const getTheme = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['key'], (result) => {
        resolve(result);
      });
    });
  };

  const { message: msg, action } = request;

  const { color, name } = action;
  getTheme().then((val) => {
    const prevTheme = val.key;

    if(msg === 'logColor') {
      const targetIndex = prevTheme.map((i) => i.name).indexOf(name);

      prevTheme[targetIndex].value = color;

      const newTheme = prevTheme;

      const r = document.querySelector(':root');

      const a = document.querySelector('#top > div.logo > div.text');

      newTheme.forEach((property, id) => {
        r.style.setProperty(newTheme[id].propertyName, newTheme[id].value);
      });
    }
  });
});

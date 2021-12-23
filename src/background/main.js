const theme = [
  {
    name: 'bgColor',
    propertyName: '--bg-color',
    value: '#fdf6e3',
  },
  {
    name: 'mainColor',
    propertyName: '--main-color',
    value: '#859900',
  },
  {
    name: 'caretColor',
    propertyName: '--caret-color',
    value: '#dc322f',
  },
  {
    name: 'subColor',
    propertyName: '--sub-color',
    value: '#2aa198',
  },
  {
    name: 'textColor',
    propertyName: '--text-color',
    value: '#181819',
  },
  {
    name: 'errorColor',
    propertyName: '--error-color',
    value: '#d33682',
  },
  {
    name: 'errorExtraColor',
    propertyName: '--error-extra-color',
    value: '#9b225c',
  },
  {
    name: 'colorfulErrorColor',
    propertyName: '--colorful-error-color',
    value: '#d33682',
  },
  {
    name: 'colorfulErrorExtraColor',
    propertyName: '--colorful-error-extra-color',
    value: '#9b225c',
  },
];

chrome.storage.local.set({ key: theme }, () => {
  console.log('Value is set');
});

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    const { message, action } = request;
    const getTheme = () => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(['key'], (result) => {
          resolve(result);
        });
      });
    };

    if(message === 'getTheme') {
      getTheme().then((val) => {
        sendResponse({
          theme: val.key || theme,
        });
        chrome.tabs.executeScript({
          file: 'content-scripts.js',
        });
      });
    }

    if(message === 'updateTheme') {
      const { color, name } = action;
      getTheme().then((val) => {
        const prevTheme = val.key;

        const targetIndex = prevTheme.map((i) => i.name).indexOf(name);

        prevTheme[targetIndex].value = color;

        const newTheme = prevTheme;
        chrome.storage.local.set({ key: newTheme }, () => {
          console.log('Value is set');
        });
      });
    }

    return true;
  },
);

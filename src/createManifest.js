const fs = require('fs');
const { resolve } = require('path');

const manifest = {
  name: 'First Chrome Extension',
  description: 'A Chrome Extension',
  version: '1.0',
  manifest_version: 2,
  icons: {
    16: './assets/icon-512.png',
    48: './assets/icon-512.png',
    128: './assets/icon-512.png',
  },
  content_scripts: [
    {
      matches: ['https://monkeytype.com/*'],
      js: ['./content-scripts.js'],
    },
  ],
  background: {
    persistent: true,
    page: './dist/background/index.html',
  },
  options_ui: {
    page: './dist/options/index.html',
    open_in_tab: true,
    chrome_style: false,
  },
  browser_action: {
    default_icon: './assets/icon-512.png',
    default_popup: './dist/popup/index.html',
  },
  permissions: [
    'tabs',
    'storage',
    'activeTab',
    '*://*/*',
    'unlimitedStorage',
  ],
};

const writeManifest = async () => {
  const json = JSON.stringify(manifest);

  fs.writeFileSync(resolve(__dirname, '../extension/manifest.json'), json);
};

writeManifest();

const { contextBridge, ipcRenderer } = require('electron');

const ipcChannels = {
  download: {
    send: 'download-platform-tools',
    receive: 'download-complete',
    progress: 'download-progress'
  }
};

contextBridge.exposeInMainWorld('ipcRender', {
  send: (channel, data) => {
    const validChannels = [ipcChannels.download.send];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.error(`Invalid channel: ${channel}`);
    }
  },
  on: (channel, callback) => {
    const validChannels = [ipcChannels.download.receive, ipcChannels.download.progress];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, callback);
    } else {
      console.error(`Invalid channel: ${channel}`);
    }
  },
  invoke: (channel, data) => {
    const validChannels = [ipcChannels.download.send];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    } else {
      console.error(`Invalid channel: ${channel}`);
    }
  },
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

console.log('Preload script loaded successfully');
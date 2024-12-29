const { contextBridge, ipcRenderer } = require('electron');

// White-listed channels for secure communication
const ipcChannels = {
  // Channels for interaction between renderer and main
  download: {
    send: 'download-platform-tools', // This is the channel used to trigger the download
    receive: 'download-complete', // This is for sending the completion status back
  }
};

// Expose safe methods to the renderer process
contextBridge.exposeInMainWorld('ipcRender', {
  // Send data to the main process (trigger download action)
  send: (channel, data) => {
    const validChannels = [ipcChannels.download.send];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.error(`Invalid channel: ${channel}`);
    }
  },

  // Listen for messages from the main process (download status)
  on: (channel, callback) => {
    const validChannels = [ipcChannels.download.receive];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, callback);
    } else {
      console.error(`Invalid channel: ${channel}`);
    }
  },

  // Invoke a method in the main process and get a response (used for async actions)
  invoke: (channel, data) => {
    const validChannels = [ipcChannels.download.send];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    } else {
      console.error(`Invalid channel: ${channel}`);
    }
  }
});

// Additional logging to verify preload.js is loading correctly
console.log('Preload script loaded successfully');

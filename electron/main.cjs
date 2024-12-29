const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const unzipper = require('unzipper');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL('http://localhost:5173'); // Adjust for Vite dev server
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle('download-platform-tools', async (event, { tool }) => {
  console.log(`Starting download for: ${tool}`);

  if (tool === 'android') {
    const url = "https://dl.google.com/android/repository/platform-tools-latest-windows.zip";
    const fileName = "platform-tools-latest-windows.zip";

    const file = fs.createWriteStream(fileName);
    
    https.get(url, (response) => {
      const totalLength = parseInt(response.headers['content-length'], 10);
      let downloaded = 0;

      response.pipe(file);
      
      response.on('data', (chunk) => {
        downloaded += chunk.length;
        const progress = Math.round((downloaded / totalLength) * 100);
        
        mainWindow.webContents.send('download-progress', progress);
      });

      response.on('end', () => {
        mainWindow.webContents.send('download-complete', 'Download Complete');
        console.log('Download completed');

        // Unzip and set environment variables
        fs.createReadStream(fileName)
          .pipe(unzipper.Extract({ path: './platform-tools' }))
          .on('close', () => {
            const platformToolsPath = path.resolve('./platform-tools/platform-tools');
            process.env.PATH += `;${platformToolsPath}`;
            console.log(`Environment variable set: PATH=${process.env.PATH}`);
          });
      });

      response.on('error', (err) => {
        console.error('Download error:', err);
        mainWindow.webContents.send('download-complete', 'Download Failed');
      });
    });
  }
});
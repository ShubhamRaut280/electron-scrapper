const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https'); // Assuming the download will be done over HTTPS
const unzipper = require('unzipper'); // You can use any library for unzipping, here we use 'unzipper'

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Enable context isolation for security
      nodeIntegration: false, // Ensure that nodeIntegration is false for security
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

// Handle download request from the renderer process
ipcMain.handle('download-platform-tools', async (event, { tool }) => {
  console.log(`Starting download for: ${tool}`);

  // Example for downloading Android platform tools (you can expand for other tools)
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
        
        // Send download progress to renderer
        mainWindow.webContents.send('download-progress', progress);
      });

      response.on('end', () => {
        // Send completion signal to renderer
        mainWindow.webContents.send('download-complete', 'Download Complete');
        console.log('Download completed');
      });

      response.on('error', (err) => {
        console.error('Download error:', err);
        mainWindow.webContents.send('download-complete', 'Download Failed');
      });
    });
  }
});

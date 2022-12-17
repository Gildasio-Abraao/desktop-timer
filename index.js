const { app, BrowserWindow, ipcMain } = require('electron');
const { PowerShell } = require('node-powershell');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1360,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setMenu(null);
  ipcMain.handle('lockScreen', () => PowerShell.$`Rundll32.exe user32.dll, LockWorkStation`)
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});
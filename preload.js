const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('controller', {
  lockScreen: () => ipcRenderer.invoke('lockScreen'),
});
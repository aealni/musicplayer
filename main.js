const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true, // Hides the menu bar
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Preload script
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    win.loadFile('index.html');
};

// Handle request for music files
ipcMain.handle('get-music-files', async () => {
    const musicDir = path.join(__dirname, 'music');
    try {
        const files = fs.readdirSync(musicDir);
        return files.filter(file => file.endsWith('.mp3')); // Return only .mp3 files
    } catch (err) {
        console.error('Error reading music directory:', err);
        return [];
    }
});

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
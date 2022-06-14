"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var mainWindow;
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        minHeight: 600,
        minWidth: 800,
        height: 800,
        width: 1280,
        resizable: true,
        center: true,
        autoHideMenuBar: true,
        kiosk: !isDev,
        webPreferences: {
            nodeIntegration: true,
            devTools: isDev
        }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000/' : "file://".concat(path.join(__dirname, '../../public/index.html')));
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    mainWindow.on('closed', function () { return (mainWindow = undefined); });
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

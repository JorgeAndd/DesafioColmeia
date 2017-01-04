const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 768,
        minWidth: 1300,
        height: 768,
    });

    mainWindow.setMenu(null);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/index.html'),
        protocol: 'file:',
        slashes: true
    }))
});

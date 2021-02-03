const electron = require('electron')
// Module to control application life.
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const dialog = electron.dialog;
app.showExitPrompt = true;
app.commandLine.appendSwitch('explicitly-allowed-ports', '6667,6697');
const session = electron.session;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;
var openUrl = require("openurl");
var os = require("os");
var preventQuit = true;
const path = require('path')
const url = require('url')
const notify = require("node-notifier");

var yummy_cookies ={};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

/* requestSingleInstanceLock should be used instead... :)

var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

if (shouldQuit) {
  app.quit();
  return;
}
*/

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'icons/kiwiirclogo_512x512.png'),
    requestSingleInstanceLock: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.webContents.on('new-window', function(event, url){
    console.log("Link: " + url + " has been clicked. Detected platform: " + os.platform);
    openUrl.open(url);
    event.preventDefault();
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()


mainWindow.on('close', function(e) { //   <---- Catch close event
  if (app.showExitPrompt && preventQuit == false) {
      e.preventDefault() // Prevents the window from closing 
      dialog.showMessageBox({
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'You will be disconnected from all of your networks and channels, are you sure that you would like to exit KiwiIRC?'
      }, function (response) {
          if (response === 0) { // Runs the following if 'Yes' is clicked
              preventQuit=false;
              app.showExitPrompt = false
              mainWindow.close()
              app.quit();
          }
      })
  } 
  if(preventQuit == true)
  {
    mainWindow.hide();
    e.preventDefault();
  }
});


  // Emitted when the window is closed.
  mainWindow.on('closed', function (e) {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    app.quit();
    /*e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
    mainWindow.hide();
    e.preventDefault();*/
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  tray = new Tray(path.join(__dirname, '/icons/kiwiirclogo_512x512.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click:function(){ preventQuit = false; app.quit(); }
    },
    {
      label: 'Show/Hide Window',
      click: function(){ mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show() }
    }
  ]);
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  Menu.setApplicationMenu(null)
  tray.setToolTip('KiwiIRC')
  tray.setContextMenu(contextMenu)
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function (e) {
    app.quit();
})
app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// 
notify.notify({
  title: "KiwiIRC",
  message: "KiwiIRC is ready to use!"
});

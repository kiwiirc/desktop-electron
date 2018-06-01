const electron = require('electron')
// Module to control application life.
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
app.commandLine.appendSwitch('explicitly-allowed-ports', '6667,6697');
const session = electron.session;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;
var openUrl = require("openurl");
var os = require("os");

const path = require('path')
const url = require('url')

var yummy_cookies ={};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'kiwiirclogo.png'),
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

/*
mainWindow.on('close', function(e) { //   <---- Catch close event
    e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
    mainWindow.hide();
    e.preventDefault();
});
*/  

  // Emitted when the window is closed.
  mainWindow.on('closed', function (e) {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    /*e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
    mainWindow.hide();
    e.preventDefault();*/
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  tray = new Tray('kiwiirclogo.png')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      type: 'radio',
      click:function(){ app.quit(); }
    },
    {
      label: 'Show/Hide Window',
      type: 'radio',
      click: function(){ mainWindow.hide(); }
    }
  ]);
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  /*
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })
  */
  tray.setToolTip('KiwiIRC')
  tray.setContextMenu(contextMenu)
  createWindow();
});

/*
app.on("beforeunload", function(e) {
  e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
  mainWindow.hide();
});
*/
// Quit when all windows are closed.
app.on('window-all-closed', function (e) {
    /*mainWindow.hide();
    e.preventDefault();*/
    app.quit();
    //e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
    //mainWindow.hide();
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

/*
mainWindow.on(BeforeUnloadEvent) = (e) => {
  e.returnValue = false;  // this will *prevent* the closing no matter what value is passed

  if(confirm('Do you really want to close the application?')) { 
    mainWindow.destroy();  // this will bypass onbeforeunload and close the app
  }  
};
*/
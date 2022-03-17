// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const windowStateKeeper = require('electron-window-state')  // window-state
const path = require('path')
const { MainMenu } = require('./MainMenu')

let mainWindow, secondaryWindow


function createWindow () {
  new MainMenu()

  let winState = windowStateKeeper({    // window-state
      defaultHeight: 800,
      defaultWidth: 600
  })

  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 400,
    maxHeight: 300,
    width: winState.width,                    // window-state
    height: winState.height,                  // window-state
    x: winState.x,                            // window-state
    y: winState.y,                            // window-state
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    // frame: false  // Hide the main top menu
  })

  // secondaryWindow = new BrowserWindow({
  //   width: 400,
  //   height: 300,
  //   parent: mainWindow
  // })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  winState.manage(mainWindow)                         // window-state
  // secondaryWindow.loadFile('secondary.html')
  mainWindow.once("ready-to-show", mainWindow.show)   // To show the system after ready

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()


  mainWindow.on('closed', () => {          // To null of garbage in the devices memory
    mainWindow = null
  })
  // secondaryWindow.on('closed', () => {
  //   secondaryWindow = null
  // })


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

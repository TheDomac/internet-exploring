const path = require("path");
const steamworks = require("steamworks.js")
const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const axios = require("axios")

let mainWindow;
let client;

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    icon: path.join(__dirname, "../build/game_icon_linux.png")
  });
  win.maximize();

  // and load the index.html of the app.
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  mainWindow = createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("fetch-user", (evt, arg) => {
  try {
    client = steamworks.init(2050870)
    evt.reply("fetch-user-reply", {
      id: client.localplayer.getSteamId().accountId,
      nickname: client.localplayer.getName(),
    })
  } catch (error) {
    evt.reply("fetch-user-reply", null)
  }
});


ipcMain.on("fetch-all-riddles", async (evt, arg) => {
  try {
    const allRiddles = await axios.get(`https://www.internetexploring.io/allPuzzles.json`, { 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  })
    evt.reply("fetch-all-riddles-reply", allRiddles.data)
  } catch (error) {
    evt.reply("fetch-all-riddles-reply", null)
  }
});

ipcMain.on("fetch-riddle", async (evt, path) => {
  try {
    const riddle = await axios.get(`https://www.internetexploring.io/${path}`, { 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  })
    evt.reply("fetch-riddle-reply", riddle.data)
  } catch (error) {
    evt.reply("fetch-riddle-reply", null)
  }
});

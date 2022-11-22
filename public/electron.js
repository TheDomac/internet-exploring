const path = require("path");
const steamworks = require("steamworks.js")
const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

const firebaseApp = require("firebase/app");
const firebaseConfig = require("../src/common/firebaseConfig");

firebaseApp.initializeApp(firebaseConfig)
const firebaseStorage = require("firebase/storage")
const getStorage = firebaseStorage.getStorage
const storage = getStorage()

const ref = firebaseStorage.ref
const uploadBytes = firebaseStorage.uploadBytes
const getDownloadURL = firebaseStorage.getDownloadURL

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

ipcMain.on("upload-images", async (evt, args) => {
  const { imagesToUpload, status, imagesToDelete } = args;
  const userId = client.localplayer.getSteamId().accountId;
  const uploadedImages = [];

   for (const imageToUpload of imagesToUpload) {
    const file = await fetch(imageToUpload.value);
    const fileBlob = await file.blob();
    const imageRef = ref(storage, `imagesSteam/${userId}/${imageToUpload.id}`);
    await uploadBytes(imageRef, fileBlob);
    const downloadURL = await getDownloadURL(imageRef);
    uploadedImages.push({ id: imageToUpload.id, downloadURL });
  }

  console.log("UPLOADED IMAGES", JSON.stringify(uploadedImages))
  evt.reply("upload-images-complete", {uploadedImages, status, imagesToDelete})

});

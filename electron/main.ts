import { app, BrowserWindow, ipcMain } from 'electron'
import { FETCH_DATA_FROM_STORAGE, FETCH_DIRECTORY, SET_DATA_TO_STORAGE } from './utils/constants.json'
import path from 'node:path'
import fs from 'node:fs'
import { createPathIfNotExist } from './utils/helpers'
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')
const working = __dirname;

ipcMain.on(FETCH_DIRECTORY, (event, _path) => {
  try {
    event.returnValue = fs.readdirSync(path.join(working, _path))
  } catch (error) {
    event.returnValue = error
  }
})

ipcMain.on(FETCH_DATA_FROM_STORAGE, (event, _path) => {
  try {
    event.returnValue = fs.readFileSync(path.join(working, _path))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    event.returnValue = {
      error: error?.message,
      code: error?.code,
    }
  }
})

ipcMain.handle(SET_DATA_TO_STORAGE, async (_, _path, data) => {
  try {
    if (createPathIfNotExist(_path)) {
      fs.writeFileSync(path.join(working, _path), JSON.stringify(data))
      return true
    } else {
      return false
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error?.message,
      code: error?.code,
    }
  }
})

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })




  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  win = null
})


app.whenReady().then(createWindow)

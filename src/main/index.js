import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('getApiOne', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiOne', response.data)
      })
      .catch(function (error) {
        console.log('error')
      })
  })
  ipcMain.on('getApiTwo', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiTwo', response.data)
      })
      .catch(function (error) {
        console.log('error')
      })
  })

  ipcMain.on('getApiThree', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiThree', response.data)
      })
      .catch(function (error) {
        console.log('error')
      })
  })

  ipcMain.on('getApiFour', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiFour', response.data)
      })
      .catch(function (error) {
        console.log('error')
      })
  })

  ipcMain.on('getApiFive', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiFive', response.data)
      })
      .catch(function (error) {
        console.log('error')
      })
  })

  ipcMain.on('getApiSix', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiSix', response.data)
      })
      .catch(function (error) {
        console.log('error')
      })
  })

  ipcMain.on('getApiSeven', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiSeven', response.data)
      })
      .catch(function (error) {
        console.log('error')
      })
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('close', () => {
  app.quit()
})

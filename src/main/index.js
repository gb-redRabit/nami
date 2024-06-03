import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'
import { table } from 'console'

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
        console.log('error getApiOne')
      })
  })
  ipcMain.on('getApiTwo', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiTwo', response.data)
      })
      .catch(function (error) {
        console.log('error getApiTwo')
      })
  })

  ipcMain.on('getApiThree', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiThree', response.data)
      })
      .catch(function (error) {
        console.log('error getApiThree')
      })
  })

  ipcMain.on('getApiFour', async (event, data) => {
    axios
      .get(data[0])
      .then(function (response) {
        event.reply('sendApiFour', [response.data[0], data[1]])
      })
      .catch(function (error) {
        console.log('error sendApiFour')
      })
  })

  ipcMain.on('getApiFive', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiFive', response.data)
      })
      .catch(function (error) {
        console.log('error getApiFive', error.code)
        event.reply('sendApiFive', error.code)
      })
  })

  ipcMain.on('getApiSix', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiSix', response.data)
      })
      .catch(function (error) {
        console.log('error getApiSix', error.code)
        event.reply('sendApiSix', error.code)
      })
  })

  ipcMain.on('getApiSeven', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiSeven', response.data)
      })
      .catch(function (error) {
        console.log('error getApiSeven')
      })
  })

  ipcMain.on('getApiEight', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiEight', response.data.data)
      })
      .catch(function (error) {
        console.log('error getApiEight')
      })
  })
  ipcMain.on('getApiNewSeson', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiNewSeson', response.data)
      })
      .catch(function (error) {
        console.log('error getApiNewSeson')
      })
  })
  ipcMain.on('getApiNew', async (event, data) => {
    axios
      .get(data)
      .then(function (response) {
        event.reply('sendApiNew', response.data)
      })
      .catch(function (error) {
        console.log('error getApiNew')
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

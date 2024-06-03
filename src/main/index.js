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
    // https://www.youtube.com/watch?v=jzmen0gYQrM
    //  zrobić własna ramke z przesuwaniem
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
    try {
      const response = await axios.get(data)
      event.reply('sendApiOne', response.data)
    } catch (error) {
      console.error('Error in getApiOne:', error.message)
    }
  })
  ipcMain.on('getApiTwo', async (event, data) => {
    try {
      const response = await axios.get(data)
      event.reply('sendApiTwo', response.data)
    } catch (error) {
      console.error('Error in getApiOne:', error.message)
    }
  })
  ipcMain.on('getApiThree', async (event, data) => {
    try {
      const response = await axios.get(data)
      event.reply('sendApiThree', response.data)
    } catch (error) {
      console.error('Error in getApiOne:', error.message)
    }
  })
  ipcMain.on('getApiFour', async (event, data) => {
    try {
      const response = await axios.get(data[0])
      event.reply('sendApiFour', [response.data[0], data[1]])
    } catch (error) {
      console.error('Error in getApiFour:', error.message)
    }
  })

  ipcMain.on('getApiFive', async (event, data) => {
    try {
      const response = await axios.get(data)
      event.reply('sendApiFive', response.data)
    } catch (error) {
      event.reply('sendApiFive', error.code)
      console.error('Error in getApiFive:', error.message)
    }
  })

  ipcMain.on('getApiSix', async (event, data) => {
    try {
      const response = await axios.get(data)
      event.reply('sendApiSix', response.data)
    } catch (error) {
      event.reply('sendApiSix', error.code)
      console.error('Error in getApiSix:', error.message)
    }
  })

  ipcMain.on('getApiSeven', async (event, data) => {
    try {
      const response = await axios.get(data)
      event.reply('sendApiSeven', response.data)
    } catch (error) {
      console.error('Error in getApiSeven:', error.message)
    }
  })

  ipcMain.on('getApiEight', async (event, data) => {
    try {
      const response = await axios.get(data)
      event.reply('sendApiEight', response.data.data)
    } catch (error) {
      console.error('Error in getApiEight:', error.message)
    }
  })

  // pobranie nowych odcinków z tego sezonu
  ipcMain.on('getApiNewSeson', async (event, data) => {
    try {
      const response = await axios.get(data)
      event.reply('sendApiNewSeson', response.data)
    } catch (error) {
      console.error('Error in getApiNewSeson:', error.message)
    }
  })
  // pobranie nowych odcinków z poprzednich sezonów
  ipcMain.on('getApiNew', async (event, data) => {
    try {
      const response = await axios.get(data)
      event.reply('sendApiNew', response.data)
    } catch (error) {
      console.error('Error in getApiNew:', error.message)
    }
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

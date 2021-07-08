'use strict'

const { app, BrowserWindow } = require('electron')
const { state, details, imgText } = require('./renderer.js')
const path = require('path')
const url = require('url')
const DiscordRPC = require('discord-rpc')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 340,
    height: 380,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const clientId = '862252799545573396'

DiscordRPC.register(clientId)

const rpc = new DiscordRPC.Client({ transport: 'ipc' })
const startTimestamp = new Date()

async function setActivity() {
  if (!rpc || !mainWindow) {
    return
  }

  rpc.setActivity({
    details: `${details || 'BaccRPC Maker'}`,
    state: `${state || 'Having a Custom RPC'}`,
    startTimestamp,
    largeImageKey: 'logo-large',
    largeImageText: `${imgText || 'BaccRPC Maker'}`,
    smallImageKey: 'logo-small',
    smallImageText: 'BaccRPC Maker',
    instance: false,
  })
}

rpc.on('ready', () => {
  setActivity()

  setInterval(() => {
    setActivity()
  }, 15e3)
})

rpc.login({ clientId }).catch(console.error)

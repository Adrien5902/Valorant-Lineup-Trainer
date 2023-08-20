const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const isDev = require("electron-is-dev");
const { exec } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { default: axios } = require('axios');
const https = require('https');

const isValorantRunning = () => new Promise((resolve, reject) => {
    exec('tasklist', (err, stdout) => {
        if (err) {
            reject(err);
        }
      
        resolve(stdout.includes('VALORANT.exe'));
    });
})

let entitlementsToken = null
let accessToken = null
let playerUUID = null
let currentGame = null

const getEntitlementsToken = () => new Promise(async (resolve, reject) => {
    const lockfile = readFileSync(path.join(process.env.LOCALAPPDATA, "\\Riot Games\\Riot Client\\Config\\lockfile")).toString()
    const [clientName, pid, port, password, protocol] = lockfile.split(":")
    
    axios.get(`${protocol}://127.0.0.1:${port}/entitlements/v1/token`, {
        headers: {
            'Authorization': `Basic ${Buffer.from(`riot:${password}`).toString('base64')}`
        },
        httpsAgent: new https.Agent({rejectUnauthorized: false})
    }).then(res => {
        let data = res.data
        entitlementsToken = data.token
        accessToken = data.accessToken
        playerUUID = data.subject
    }).catch(console.error)
})

const getCurrentGame = (region = "eu", shard = "eu") => new Promise((resolve, reject) => {
    const tokenHeaders = {
        "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
        "Authorization": `Bearer ${accessToken}`,
    }

    axios.get(`https://glz-${region}-1.${shard}.a.pvp.net/core-game/v1/players/${playerUUID}`, {
        headers: tokenHeaders
    }).then(res => {
        const {MatchID} = res.data
        if(MatchID != currentGame?.MatchID){
            axios.get(`https://glz-${region}-1.${shard}.a.pvp.net/core-game/v1/matches/${MatchID}`, {
                headers: tokenHeaders
            }).then(res => {
                resolve(res.data)
            }).catch(console.error)
        }else{
            resolve(currentGame)
        }
    }).catch(err => resolve(null))
})

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.setMenuBarVisibility(false)
    win.maximize()

    isDev ? 
        win.loadURL('http://localhost:5173/index.html')
        :   win.loadFile(path.join(__dirname, 'dist/index.html'));
    
    const fetchValorantStatus = async ()=>{
        const running = await isValorantRunning()
        if(running){
            if(!entitlementsToken || !accessToken) {
                await getEntitlementsToken()
            }

            currentGame = await getCurrentGame()
        }else{
            entitlementsToken = null
            accessToken = null
            playerUUID = null
            currentGame = null
        }

        win.webContents.send("valorantStatus", {
            running,
            playerUUID,
            currentGame,
        })
    }
    fetchValorantStatus()
    setInterval(fetchValorantStatus, 15000)
}

const settingsPath = path.join(app.getPath("userData"), "settings.json")
ipcMain.on("saveSettings", (e, settings) => {
    try {
        writeFileSync(settingsPath, JSON.stringify(settings))
        e.returnValue = false
    } catch (error) {
        e.returnValue = error
    }
})

ipcMain.on("readSettings", (e) => {
    try {
        e.returnValue = JSON.parse(readFileSync(settingsPath))
    } catch (error) {
        e.returnValue = null
    }
})

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
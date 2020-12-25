// Importem les llibreries que necessitarem per crear la GUI
const {
  app,
  BrowserWindow
} = require('electron')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
    }
  })

  mainWindow.loadFile('app/index.html')
}

// En el moment que esta preparat creara la finestre que sera visible per l'usuari
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quan detecta que totes les finestres s'han tencat para tot el programa amb el servidor inclos
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


var express = require('express');
var apps = express();
var server = require('http').createServer(apps);
var io = require('socket.io')(server);


var airplane = {
  "pi": 0,
  "local_time": 0,

  "m0": 0,
  "m1": 0,

  "s0": 0,
  "s1": 0,
  "s2": 0,
  "s3": 0,
  "s4": 0,
  "s5": 0,
  "s6": 0,

  "accx_m1": 0,
  "accy_m1": 0,
  "accz_m1": 0,
  "gyrox_m1": 0,
  "gyroy_m1": 0,
  "gyroz_m1": 0,
  "pitch_m1": 0,
  "roll_m1": 0,
  "yaw_m1": 0,

  "accx_m2": 0,
  "accy_m2": 0,
  "accz_m2": 0,
  "gyrox_m2": 0,
  "gyroy_m2": 0,
  "gyroz_m2": 0,
  "pitch_m2": 0,
  "roll_m2": 0,
  "yaw_m2": 0,

  "accx_m3": 0,
  "accy_m3": 0,
  "accz_m3": 0,
  "gyrox_m3": 0,
  "gyroy_m3": 0,
  "gyroz_m3": 0,
  "magx_m3": 0,
  "magy_m3": 0,
  "magz_m3": 0,
  "pitch_m3": 0,
  "roll_m3": 0,
  "yaw_m3": 0,

  "pitch_gi": 0,
  "roll_gi": 0,
  "yaw_gi": 0,

  "lat": 0,
  "long": 0,
  "alt": 0,
  "speed": 0,
  "sats_used": 0,
  "gps_state": 0,
};

var client = {
  "phase": 0,
  "m1": 0,
  "m2": 0,
  "s1": 0,
  "s2": 0,
  "s3": 0,
  "s4": 0,
  "s5": 0,
  "s6": 0,
  "s7": 0,
};

apps.get("/plane", function (req, res) {
  res.json(client);
  res.end();
  airplane["pi"] = req.query.pi;

  airplane["m0"] = req.query.m0;
  airplane["m1"] = req.query.m1;

  airplane["s0"] = req.query.s0;
  airplane["s1"] = req.query.s1;
  airplane["s2"] = req.query.s2;
  airplane["s3"] = req.query.s3;
  airplane["s4"] = req.query.s4;
  airplane["s5"] = req.query.s5;
  airplane["s6"] = req.query.s6;

  airplane["accx_m1"] = req.query.accx_m1;
  airplane["accy_m1"] = req.query.accy_m1;
  airplane["accz_m1"] = req.query.accz_m1;
  airplane["gyrox_m1"] = req.query.gyrox_m1;
  airplane["gyroy_m1"] = req.query.gyroy_m1;
  airplane["gyroz_m1"] = req.query.gyroz_m1;
  airplane["pitch_m1"] = req.query.pitch_m1;
  airplane["roll_m1"] = req.query.roll_m1;
  airplane["yaw_m1"] = req.query.yaw_m1;

  airplane["accx_m2"] = req.query.accx_m2;
  airplane["accy_m2"] = req.query.accy_m2;
  airplane["accz_m2"] = req.query.accz_m2;
  airplane["gyrox_m2"] = req.query.gyrox_m2;
  airplane["gyroy_m2"] = req.query.gyroy_m2;
  airplane["gyroz_m2"] = req.query.gyroz_m2;
  airplane["pitch_m2"] = req.query.pitch_m2;
  airplane["roll_m2"] = req.query.roll_m2;
  airplane["yaw_m2"] = req.query.yaw_m2;

  airplane["accx_m3"] = req.query.accx_m3;
  airplane["accy_m3"] = req.query.accy_m3;
  airplane["accz_m3"] = req.query.accz_m3;
  airplane["gyrox_m3"] = req.query.gyrox_m3;
  airplane["gyroy_m3"] = req.query.gyroy_m3;
  airplane["gyroz_m3"] = req.query.gyroz_m3;
  airplane["magx_m3"] = req.query.magx_m3;
  airplane["magy_m3"] = req.query.magy_m3;
  airplane["magz_m3"] = req.query.magz_m3;
  airplane["pitch_m3"] = req.query.pitch_m3;
  airplane["roll_m3"] = req.query.roll_m3;
  airplane["yaw_m3"] = req.query.yaw_m3;

  airplane["pitch_gi"] = req.query.pitch_gi;
  airplane["roll_gi"] = req.query.roll_gi;
  airplane["yaw_gi"] = req.query.yaw_gi;

  airplane["lat"] = req.query.lat;
  airplane["long"] = req.query.long;
  airplane["alt"] = req.query.alt;
  airplane["speed"] = req.query.speed;
  airplane["sats_used"] = req.query.sats_used;
  airplane["gps_state"] = req.query.gps_state;


  console.log("Received packet: " + airplane["pi"]);
  io.emit("planedata", airplane);
});
apps.use("/", express.static(__dirname + '/apps'));


server.listen(3000);

io.on("connect", function (socket) {
  console.log("New socket connection: " + socket.id);
  socket.on("data", function (data) {

  });

  socket.on("disconnect", function () {
    console.log("Disconnected: " + socket.id);
  });
});
/*
// Importem la llibreria per la comunicació IPC que ens permet comunicar el backend amb el frontend
const {
  ipcMain
} = require('electron');

// Funció periodica que envia l'ultima informació de l'avio
ipcMain.on('pingdata', (event, arg) => {
  if (ndata) {
    event.reply('pingdata', last_data);
    ndata = false;
  }
  if (nfoto) {
    nfoto = false
    event.reply('videostream', stream_foto);
  }
})

// Quan desde la GUI es clica un boto arriba fins aquí el qual s'encarrega d'enviar-ho a l'avió
ipcMain.on('commbuts', (event, arg) => {
  console.log(arg);
  if (plane.length > 0) {
    io.to(plane).emit('phase', arg);
  }
})

// Quan desde la GUI s'escriu una ordre
ipcMain.on('command', (event, arg) => {
  console.log(arg);
  if (plane.length > 0) {
    io.to(plane).emit('command', arg);
  }
})*/
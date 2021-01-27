const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// listen for app to be reaady
app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 1500, height: 900 });
  // load html file
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true,
      webPreferences: {
        webSecurity: false,
      },
    })
  );
});

// create menut template

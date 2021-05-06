// import { ipcRender } from 'electron';
const { ipcRender } = require('electron');

document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault();
    ipcRender.send('ondragstart', '/absolute/path/to/the/item');

}
const EventEmitter = require('events');
const emitter = new EventEmitter();
const path = require("path");
const os = require("os");
const fs = require('fs');

emitter.on('backup', () => {
    // console.log("A saved event occured.");
    
    
    const dataPath = path.join(__dirname,"data","manga.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    // console.log(dataPath);

    const backupDataPath = path.join(__dirname,"backup","mangaBackup.json");
    const backupData = JSON.parse(fs.readFileSync(backupDataPath, "utf-8"));

    if(JSON.stringify(data) !== JSON.stringify(backupData)){
        const updatedData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        fs.writeFileSync(backupDataPath, JSON.stringify(updatedData));

        console.log(
            `Last updated on- ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} at- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        );
    }
    // console.log(data.length, backupData.length);
});

setInterval(() => {
    emitter.emit('backup');
}, 3000);

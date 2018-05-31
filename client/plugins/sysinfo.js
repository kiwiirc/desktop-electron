kiwi.plugin('sysinfo', function(kiwi) {
    ipcRenderer = require('electron').ipcRenderer;
    os = require("os");

    kiwi.state.$on("input.command.sysinfo", function(event,command,params){
        console.log(os);
        kiwi.state.getActiveBuffer().say("\002Sysinfo:\002 [Platform: " + os.platform() + " " + os.release + " ] [Memory: " + ((os.totalmem - os.freemem)/1000000)/1024 + "GB free out of " + (os.totalmem/1000000)/1024 + "GB]");
    });
});
kiwi.plugin('sysinfo', function(kiwi) {
    ipcRenderer = require('electron').ipcRenderer;
    os = require("os");

    kiwi.state.$on("input.command.sysinfo", function(event,command,params){
        console.log(os);
        kiwi.state.getActiveBuffer().say("\002Sysinfo:\002 [OS: " + os.platform() + " " +os.arch+ " " + os.release + " ] [CPU: "+os.cpus().length+"x - "+os.cpus()[0].model+"] [Memory: " + ((os.totalmem - os.freemem)/1000000)/1024 + "GB free out of " + (os.totalmem/1000000)/1024 + "GB]");
    });
});
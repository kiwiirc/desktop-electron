kiwi.plugin('sysinfo', function(kiwi) {
    pkg = require("./package.json");
    os = require("os");

    kiwi.state.$on("input.command.sysinfo", function(event,command,params){
        console.log(os);
        kiwi.state.getActiveBuffer().say("[\002Client:\002 "+pkg.name+" v"+pkg.version+"] [\002OS:\002 " + os.platform() + " " +os.arch+ " " + os.release + " ] [\002CPU:\002 "+os.cpus().length+"x - "+os.cpus()[0].model+"] [\002Memory:\002 " + ((os.totalmem - os.freemem)/1000000)/1024 + "GB free out of " + (os.totalmem/1000000)/1024 + "GB]");
    });
});
kiwi.plugin('nativesocks', function(kiwi) {
    
    kiwi.on("network.connecting", function(event){
        try
        {
            event.transport = require('irc-framework/src/transports/net');
            console.log("Set DefaultTransport to native sockets.");
        } catch(e)
        {
            console.log(e);
        }
    });
});
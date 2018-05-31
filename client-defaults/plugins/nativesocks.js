kiwi.plugin('nativesocks', function(kiwi) {
    
    window.kiwi.state.$on("network.connecting", function(event)
    {
        try
        {
            event.network.ircClient.options.transport = require('irc-framework/src/transports/net');
            console.log("Set DefaultTransport to native sockets.");
        } catch(e)
        {
            console.log(e);
        }
    });
});
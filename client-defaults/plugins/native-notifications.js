kiwi.plugin('native-notifications', function(kiwi) {
    const notify = require("node-notifier");
    const striptags = require("striptags");
    kiwi.state.$on('irc.privmsg', function(event, network, ircEvent){
        if(event.target == network.nick)
        {
            msg = event.message.toString();
            notify.notify({
                title:"KiwiIRC - Private message from " + event.nick,
                message: striptags(msg,[],"")
            });
            var audio = new Audio('static/highlight.mp3');
            audio.play();
            return;
        }
        if(event.message.toString().includes(network.nick))
        {
            msg = event.message.toString();
            notify.notify({
                title:"KiwiIRC - New highlight from " + event.nick,
                message:striptags(msg,[],"")
            });
            var audio = new Audio('static/highlight.mp3');
            audio.play();
            return;
        }
    });
});
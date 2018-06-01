kiwi.plugin('debug', function(kiwi) {
    kiwi.state.$watch('ui.active_buffer', function()
    {
        console.log("New active buffer:" + kiwi.state.getActiveBuffer().getNetwork().name + ":" + kiwi.state.getActiveBuffer().name);
    });

    kiwi.state.$on("message.render", function(e){
        console.log(e);
    });
});


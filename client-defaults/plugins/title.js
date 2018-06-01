kiwi.plugin('title', function(kiwi) {
    kiwi.state.$watch('ui.active_buffer', function()
    {
        
        document.title = "KiwiIRC - " + kiwi.state.getActiveBuffer().getNetwork().name + " - " + window.kiwi.state.getActiveBuffer().name;
    });
});
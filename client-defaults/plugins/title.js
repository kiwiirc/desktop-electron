kiwi.plugin('title', function(kiwi) {
    window.kiwi.state.$on("server.tab.show", function(tabName){
        document.title = "KiwiIRC - " + tabName;
    });
});
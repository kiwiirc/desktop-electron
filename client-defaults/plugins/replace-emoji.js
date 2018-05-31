kiwi.plugin('replace-emoji', function(kiwi) {
    kiwi.state.$on("server.tab.show",function(event)
    {
            console.log("Loaded event listener for emoji support");
            document.getElementsByClassName("kiwi-ircinput-editor")[0].addEventListener("keyup", function(event){
                if (event.keyCode === 13) {
                    event.preventDefault();
                    document.getElementsByClassName("kiwi-ircinput-editor")[0].innerHTML = emoji.replace_colons(document.getElementsByClassName("kiwi-ircinput-editor")[0].innerHTML)
                    document.getElementsByClassName("kiwi-ircinput-editor")[0].click();
                }
            });
    });
    kiwi.state.$on("input.raw", function(raw){
        raw = emoji.replace_colons(raw);
        console.log(raw);
        //kiwi.state.getActiveBuffer().say(raw);
    });
});
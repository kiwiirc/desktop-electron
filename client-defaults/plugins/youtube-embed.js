kiwi.plugin('youtube-embed', function(kiwi) {
    window.kiwi.state.$on("message.render", function(event){
        //console.log(event);
        event.message.mentioned_urls.forEach(function(item,index){
            console.log(item);
            if(/^(http|https):\/\/(www\.youtube\.com|youtube\.com)\/watch/ig.test(item))
            {
                console.log(item + " appears to be a youtube link.");
            }
            var matches = item.match(/(\?|\&)v\=([a-zA-Z0-9\-\_]+)/i);
            var watchID = matches[2];
            event.message.html = '<div style="overflow:hidden;padding-bottom:56.25%;position:relative;height:0;"><iframe style="left:0;top:0;height:100%;width:100%;position:absolute;" src="https://www.youtube.com/embed/'+watchID+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';
        });
    });
});
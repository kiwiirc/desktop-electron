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
            event.message.html = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+watchID+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        });
    });
});
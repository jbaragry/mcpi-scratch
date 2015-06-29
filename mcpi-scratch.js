(function (ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return { status:2, msg:'Ready' };
    };

    ext.postToChat = function(str) {
        var chatUrl = "http://localhost:4715/postToChat/" + encodeURIComponent(str);
        $.ajax({
            type: "GET",
            url: chatUrl,
            dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("postToChat success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error postToChat: ", error);
            }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['', 'post to chat %s', 'postToChat', 'message']
        ]
    };

    // Register the extension
    ScratchExtensions.register('MCPI-Scratch', descriptor, ext);

})({});
(function (ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return { status:2, msg:'Ready' };
    };

    ext.postToChat = function() {
        $.ajax({
            type: "GET",
            url: "http://localhost:4715/postToChat/Bob"
            success: function(data) {
                console.log("postToChat success");
            },
            error: function(jqxhr, textStatus, error) {
                console.log("Error postToChat");
            }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['', 'post to chat', 'postToChat']
        ]
    };

    // Register the extension
    ScratchExtensions.register('MCPI-Scratch', descriptor, ext);

})({});
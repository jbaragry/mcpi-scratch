(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    var mcpiHlprURL = "localhost:4715"

    ext.chat_msg = function() {
        $.ajax({
              url: mcpiHlprURL+'/postToChar/Bob'
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'post to chat', 'postToChat', 'chat_msg'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('MCPI-ScratchX extension', descriptor, ext);
})({});

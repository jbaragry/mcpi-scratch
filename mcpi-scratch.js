(function (ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return { status:2, msg:'Ready' };
    };

    ext.postToChat = function(str) {
        var cmdUrl = "http://localhost:4715/postToChat/" + encodeURIComponent(str);
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("postToChat success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error postToChat: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    ext.playerPosToChat = function() {
        var cmdUrl = "http://localhost:4715/playerPosToChat";
        $.ajax({
            type: "GET",
            url: cmdUrl,
            // dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("playerPosToChat success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error playerPosToChat: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    ext.setPlayerPos = function(x, y, z) {
        var cmdUrl = "http://localhost:4715/setPlayerPos/" + x + "/" + y + "/" + z;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("setPlayerPos success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error setPlayerPos: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    ext.setBlock = function(x, y, z, blockType, blockData, posType) {
        var cmdUrl = "http://localhost:4715/setBlock/" + x + "/" + y + "/" + z + "/" + blockType + "/" + blockData + "/" + posType;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("setBlock success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error setBlock: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    ext.setBlocks = function(x1, y1, z1, x2, y2, z2, blockType, blockData) {
        var cmdUrl = "http://localhost:4715/setBlocks/" + x1 + "/" + y1 + "/" + z1 + "/" 
            + x2 + "/" + y2 + "/" + z2 + "/" + blockType + "/" + blockData;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("setBlocks success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error setBlocks: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    ext.setLine = function(x1, z1, x2, z2, y, blockType, blockData) {
        var cmdUrl = "http://localhost:4715/setLine/" + x1 + "/" + z1 + "/" 
            + x2 + "/" + z2 + "/" + y + "/" + blockType + "/" + blockData;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("setLine success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error setLine: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    ext.setCircle = function(x, z, r, y, blockType, blockData) {
        var cmdUrl = "http://localhost:4715/setCircle/" + x + "/" + z + "/" 
            + r + "/" + y + "/" + blockType + "/" + blockData;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("setCircle success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error setCircle: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    ext.getPlayerPos = function(coord) {
        var cmdUrl = "http://localhost:4715/getPlayerPos/" + coord;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("getPlayerPos success ", data);
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error setPlayerPos: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['', 'post to chat %s', 'postToChat', 'message'],
            [" ", "post Player.pos chat", "playerPosToChat"],
            [" ", "set Player pos to x:%n y:%n z:%n", "setPlayerPos", 0, 0, 0],
            [" ", "set block pos x:%n y:%n z:%n to type %n data %n %m.blockPos", "setBlock", 0, 0, 0, 1, -1],
            [" ", "set blocks pos x1:%n y1:%n z1:%n to x2:%n y2:%n z2:%n to type %n data %n", "setBlocks", 0, 0, 0, 0, 0, 0, 1, -1],
            [" ", "set line pos x1:%n z1:%n to x2:%n z2:%n height y:%n to type %n data %n", "setLine", 0, 0, 0, 0, 0, 1, -1],
            [" ", "set circle center x1:%n z1:%n radius r:%n at height y:%n to type %n data %n", "setCircle", 0, 0, 0, 0, 0, 1, -1],
            ["r", "get player pos %m.pos", "getPlayerPos", 'x'],
        ],
        menus: {
            pos: ['x', 'y', 'z'],
            blockPos: ['abs', 'rel']
        }
    };

    // Register the extension
    ScratchExtensions.register('MCPI-Scratch', descriptor, ext);

})({});
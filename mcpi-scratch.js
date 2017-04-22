(function (ext) {

    var blockHits = false;

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

    // get one coord (x, y, or z) for playerPos
    ext.getPlayerPos = function(posCoord, callback) {
        var cmdUrl = "http://localhost:4715/getPlayerPos/" + posCoord;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("getPlayerPos success ", data.trim());
                callback(data.trim());
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error getPlayerPos: ", error);
                callback(null);
            }
        }); 
    };

    // get one coord (x, y, or z) for playerPos
    ext.getBlock = function(x, y, z, posType, callback) {
        var cmdUrl = "http://localhost:4715/getBlock/" + x + "/" + y + "/" + z + "/" + posType;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("getPlayerPos success ", data.trim());
                callback(data.trim());
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error getPlayerPos: ", error);
                callback(null);
            }
        }); 
    };

    function checkMC_Events() {
        var cmdUrl = "http://localhost:4715/pollBlockHit/";
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("checkMC_Events success ", data.trim());
                if (parseInt(data) == 1)
                    blockHits = true;
                else
                    blockHits = false;
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error checkMC_Events: ", error);
                callback(null);
            }
        }); 
    };

    ext.whenBlockHit = function(str) {
        if (!blockHits)
            return;
        else
            return true;
    };


    ext._getStatus = function() {
        return { status:2, msg:'Ready' };
    };

    ext._shutdown = function() {
        if (poller) {
          clearInterval(poller);
          poller = null;
        }
    };

    TRANSLATE = {
        en: {
            postToChat: 'post to chat %s',
            playerPosToChat: "post Player.pos chat",
            setPlayerPos: "set Player pos to x:%n y:%n z:%n",
            setBlock: "set block pos x:%n y:%n z:%n to type %n data %n %m.blockPos",
            setBlocks: "set blocks pos x1:%n y1:%n z1:%n to x2:%n y2:%n z2:%n to type %n data %n",
            setLine: "set line pos x1:%n z1:%n to x2:%n z2:%n height y:%n to type %n data %n",
            setCircle: "set circle center x1:%n z1:%n radius r:%n at height y:%n to type %n data %n",
            getPlayerPos:"get player pos %m.pos",
            getBlock:"get block pos x:%n y:%n z:%n %m.blockPos", 
            whenBlockHit: "when blockHit"
        },
        pt: {
            postToChat: "escreve no chat %s",
            playerPosToChat: "escreve posição do jogador no chat",
            setPlayerPos: "muda a pos do Jogador para x:%n y:%n z:%n",
            setBlock: "muda o bloco na pos x:%n y:%n z:%n para o tipo %n subtipo %n %m.blockPos",
            setBlocks: "coloca blocos pos x1:%n y1:%n z1:%n até x2:%n y2:%n z2:%n do tipo %n subtipo %n",
            setLine: "desenha linha da pos x1:%n z1:%n até x2:%n z2:%n à altura de y:%n com blocos tipo %n subtipo %n",
            setCircle: "desenha circulo com centro x1:%n z1:%n, raio r:%n à altura y:%n com blocos tipo %n subtipo %n",
            getPlayerPos:"posição do Jogador %m.pos",
            getBlock:"bloco na pos x:%n y:%n z:%n %m.blockPos", 
            whenBlockHit: "quando bloco atingido"
        },
    }
    var urlParams = new URLSearchParams(window.location.search);
    var lang = urlParams.get('action') || 'en';

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['',  TRANSLATE[lang].postToChat, "postToChat", "message"],
            [" ", TRANSLATE[lang].playerPosToChat,"playerPosToChat"],
            [" ", TRANSLATE[lang].setPlayerPos,"setPlayerPos", 0, 0, 0],
            [" ", TRANSLATE[lang].setBlock,"setBlock", 0, 0, 0, 1, -1],
            [" ", TRANSLATE[lang].setBlocks,"setBlocks", 0, 0, 0, 0, 0, 0, 1, -1],
            [" ", TRANSLATE[lang].setLine,"setLine", 0, 0, 0, 0, 0, 1, -1],
            [" ", TRANSLATE[lang].setCircle,"setCircle", 0, 0, 0, 0, 0, 1, -1],
            ["R", TRANSLATE[lang].getPlayerPos,"getPlayerPos", 'x'],
            ["R", TRANSLATE[lang].getBlock,"getBlock", 0, 0, 0],
            ["h", TRANSLATE[lang].whenBlockHit,'whenBlockHit'],
        ],
        menus: {
            pos: ['x', 'y', 'z'],
            blockPos: ['abs', 'rel']
        }
    };

    // Register the extension
    ScratchExtensions.register('MCPI-Scratch', descriptor, ext);

    checkMC_Events();
    var poller = setInterval(checkMC_Events, 2000);

})({});
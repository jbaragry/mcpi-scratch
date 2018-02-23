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

    // get block.id or block.data
    ext.getBlock = function(blockData, x, y, z, posType, callback) {
        var cmdUrl = "http://localhost:4715/getBlock/" + blockData + "/" + x + "/" + y + "/" + z + "/" + posType;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("getBlock success ", data.trim());
                callback(data.trim());
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error getBlock: ", error);
                callback(null);
            }
        }); 
    };
    
    // report block id for block name
    ext.blockID = function(blockName) {
        return BLOCKS[blockName];
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


    var TRANSLATIONS = {
        en: {
            postToChat: 'post to chat %s',
            playerPosToChat: "post Player.pos chat",
            setPlayerPos: "set Player pos to x:%n y:%n z:%n",
            setBlock: "set block pos x:%n y:%n z:%n to type %n data %n %m.blockPos",
            setBlocks: "set blocks pos x1:%n y1:%n z1:%n to x2:%n y2:%n z2:%n to type %n data %n",
            setLine: "set line pos x1:%n z1:%n to x2:%n z2:%n height y:%n to type %n data %n",
            setCircle: "set circle center x1:%n z1:%n radius r:%n at height y:%n to type %n data %n",
            getPlayerPos:"get player pos %m.pos",
            getBlock:"get block %m.blockData pos x:%n y:%n z:%n %m.blockPos", 
            whenBlockHit: "when blockHit",
            message:"message",
            blocks:{AIR:0, STONE:1, GRASS:2, DIRT:3, COBBLESTONE:4, WOOD_PLANKS:5, SAPLING:6, BEDROCK:7,
                    WATER_FLOWING:8, WATER_STATIONARY:9, LAVA_FLOWING:10, LAVA_STATIONARY:11, SAND:12,
                    GRAVEL:13, GOLD_ORE:14, IRON_ORE:15, COAL_ORE:16, WOOD:17, LEAVES:18, GLASS:20, 
                    LAPIS_LAZULI_ORE:21, LAPIS_LAZULI_BLOCK:22, SANDSTONE:24, BED:26, COBWEB:30, GRASS_TALL:31,
                    WOOL:35, FLOWER_YELLOW:37, FLOWER_CYAN:38, MUSHROOM_BROWN:39, MUSHROOM_RED:40, GOLD_BLOCK:41,
                    IRON_BLOCK:42, STONE_SLAB_DOUBLE:43, STONE_SLAB:44, BRICK_BLOCK:45,TNT:46, BOOKSHELF:47,
                    MOSS_STONE:48, OBSIDIAN:49, TORCH:50, FIRE:51, STAIRS_WOOD:53, CHEST:54, DIAMOND_ORE:56,
                    DIAMOND_BLOCK:57, CRAFTING_TABLE:58, WHEAT:59, FARMLAND:60, FURNACE_INACTIVE:61,
                    FURNACE_ACTIVE:62, STANDING_SIGN:63, DOOR_WOOD:64, LADDER: 65, STAIRS_COBBLESTONE:67,
                    WALL_SIGN:68, DOOR_IRON:71, REDSTONE_ORE:73, LIT_REDSTONE_ORE:74, SNOW:78, ICE:79,
                    SNOW_BLOCK: 80, CACTUS:81, CLAY:82, SUGAR_CANE:83, FENCE:85, NETHERRACK:87, GLOWSTONE_BLOCK:89,
                    BEDROCK_INVISIBLE:95, TRAPDOOR:97, STONE_BRICK:98, GLASS_PANE:102, MELON:103,
                    MELON_STEM:105, FENCE_GATE:107, BRICK_STAIRS:108, STONE_BRICK_STAIRS:109, NETHER_BRICK:112,
                    NETHER_BRICK_STAIRS:114, SANDSTONE_STAIRS:128, QUARTZ_BLOCK:155, QUARTZ_STAIRS:156,
                    STONE_CUTTER:245, GLOWING_OBSIDIAN:246, NETHER_REACTOR_CORE:247, INFO_UPDATE:248,
                    INFO_UPDATE2:249}
        },
        pt: {
            postToChat: "escreve no chat %s",
            playerPosToChat: "escreve posição do jogador no chat",
            setPlayerPos: "muda a pos do Jogador para x:%n y:%n z:%n",
            setBlock: "muda o bloco na pos x:%n y:%n z:%n para o tipo %n subtipo %n %m.blockPos",
            setBlocks: "coloca blocos da pos x1:%n y1:%n z1:%n até x2:%n y2:%n z2:%n do tipo %n subtipo %n",
            setLine: "desenha linha da pos x1:%n z1:%n até x2:%n z2:%n à altura de y:%n com blocos tipo %n subtipo %n",
            setCircle: "desenha circulo com centro x1:%n z1:%n, raio r:%n à altura y:%n com blocos tipo %n subtipo %n",
            getPlayerPos:"posição do Jogador no eixo do %m.pos",
            getBlock:"bloco %m.blockData na pos x:%n y:%n z:%n %m.blockPos", 
            whenBlockHit: "quando bloco atingido",
            message:"mensagem",
            blocks:{AIR:0, STONE:1, GRASS:2, DIRT:3, COBBLESTONE:4, WOOD_PLANKS:5, SAPLING:6, BEDROCK:7,
                    WATER_FLOWING:8, WATER_STATIONARY:9, LAVA_FLOWING:10, LAVA_STATIONARY:11, SAND:12,
                    GRAVEL:13, GOLD_ORE:14, IRON_ORE:15, COAL_ORE:16, WOOD:17, LEAVES:18, GLASS:20, 
                    LAPIS_LAZULI_ORE:21, LAPIS_LAZULI_BLOCK:22, SANDSTONE:24, BED:26, COBWEB:30, GRASS_TALL:31,
                    WOOL:35, FLOWER_YELLOW:37, FLOWER_CYAN:38, MUSHROOM_BROWN:39, MUSHROOM_RED:40, GOLD_BLOCK:41,
                    IRON_BLOCK:42, STONE_SLAB_DOUBLE:43, STONE_SLAB:44, BRICK_BLOCK:45,TNT:46, BOOKSHELF:47,
                    MOSS_STONE:48, OBSIDIAN:49, TORCH:50, FIRE:51, STAIRS_WOOD:53, CHEST:54, DIAMOND_ORE:56,
                    DIAMOND_BLOCK:57, CRAFTING_TABLE:58, WHEAT:59, FARMLAND:60, FURNACE_INACTIVE:61,
                    FURNACE_ACTIVE:62, STANDING_SIGN:63, DOOR_WOOD:64, LADDER: 65, STAIRS_COBBLESTONE:67,
                    WALL_SIGN:68, DOOR_IRON:71, REDSTONE_ORE:73, LIT_REDSTONE_ORE:74, SNOW:78, ICE:79,
                    SNOW_BLOCK: 80, CACTUS:81, CLAY:82, SUGAR_CANE:83, FENCE:85, NETHERRACK:87, GLOWSTONE_BLOCK:89,
                    BEDROCK_INVISIBLE:95, TRAPDOOR:97, STONE_BRICK:98, GLASS_PANE:102, MELON:103,
                    MELON_STEM:105, FENCE_GATE:107, BRICK_STAIRS:108, STONE_BRICK_STAIRS:109, NETHER_BRICK:112,
                    NETHER_BRICK_STAIRS:114, SANDSTONE_STAIRS:128, QUARTZ_BLOCK:155, QUARTZ_STAIRS:156,
                    STONE_CUTTER:245, GLOWING_OBSIDIAN:246, NETHER_REACTOR_CORE:247, INFO_UPDATE:248,
                    INFO_UPDATE2:249}     
        },
        de: {
            postToChat: 'Zeige Nachricht %s',
            playerPosToChat: "Zeige Spieler-Position als Nachricht",
            setPlayerPos: "Stelle Spieler auf x:%n y:%n z:%n",
            setBlock: "Stelle Block auf x:%n y:%n z:%n Block %n Status %n %m.blockPos",
            setBlocks: "Setze Bloecke von x1:%n y1:%n z1:%n bis x2:%n y2:%n z2:%n Block %n data %n",
            setLine: "Linie von x1:%n z1:%n bis x2:%n z2:%n Hoehe y:%n mit Block %n Status %n",
            setCircle: "Kreis mit Mittelpunkt x1:%n z1:%n Radius r:%n Hoehe y:%n Block %n Status %n",
            getPlayerPos:"Spieler-Position %m.pos",
            getBlock:"Block %m.blockData fuer x:%n y:%n z:%n %m.blockPos",
            whenBlockHit: "Wenn Block berührt",
            message:"Nachricht",
            blocks:{LUFT:0, STEIN:1, GRASBLOCK:2, ERDE:3, PFLASTERSTEIN:4, BRETTER:5, SETZLING:6, FELSEN:7,
                    FLIESSENDES_WASSER:8, WASSER:9, FLIESSENDE_LAVA:10, LAVA:11, SAND:12, KIES:13, GOLDERZ:14,
                    EISENERZ:15, STEINKOHLE:16, HOLZ:17, BLÄTTER:18, GLAS:20, LAPISLAZULIERZ:21, LAPISLAZULI:22,
                    SANDSTEIN:24, BETT:26, SPINNENNETZ:30, GRAS:31, WOLLE:35, GELBE_BLUME: 37, BLAUE_BLUME: 38,
                    BRAUNER_PILZ:39, ROTER_PILZ:40, GOLD:41, EISEN:42, DOPPELSTUFE:43, STUFE:44, ZIEGEL:45,TNT:46,
                    BÜCHERREGAL:47, BEMOOSTER_PFLASTERSTEIN:48, OBSIDIAN:49, FACKEL:50, FEUER:51, HOLZTREPPE: 53,
                    TRUHE:54, DIAMANTERZ:56, DIAMANT:57, WERKBANK:58, WEIZEN:59, ACKERBODEN:60, OFEN:61,
                    BRENNENDER_OFEN:62, SCHILD:63, HOLZTÜR:64, LEITER:65, PFLASTERSTEINTREPPE:67, WANDSCHILD:68,
                    EISENTÜR:71, REDSTONEERZ:73, LEUCHTENDES_REDSTONEERZ:74, SCHNEE:78, EIS:79, SCHNEEBLOCK: 80,
                    KAKTUS:81, TON:82, ZUCKERROHR:83, ZAUN:85, NETHERRACK:87, GLOWSTONE_BLOCK:89,
                    UNSICHTBARER_FELSEN:95, FALLTÜR:97, STEINZIEGEL:98, GLASSCHEIBE:102, MELONE:103,
                    MELONENPFLANZE:105, ZAUNTOR:107, ZIEGELTREPPE:108, STEINZIEGELTREPPE:109, NETHERZIEGEL:112,
                    NETHERZIEGELTREPPE:114, SANDSTEINTREPPE:128, QUARTZ:155, QUARTZTREPPE:156,
                    STEINMETZ:245, LEUCHTENDER_OBSIDIAN:246, NETHERREACTORKERN:247, INFO_UPDATE:248,
                    INFO_UPDATE2:249}
        },
    }

    function getTranslationForLang( lang ){
        switch (lang){
          case "pt":
          case "pt-PT":
          case "pt-BR":
            return TRANSLATIONS.pt;
          case "de":
          case "de-DE":
          case "de-AT":
          case "de-CH":
          case "de-LI":
          case "de-LU":
            return TRANSLATIONS.de;
          default:
            return TRANSLATIONS.en;
            
        }
    }

    // how which language translation is chosen (increasing priority):
    //   1 - explicit 'lang' parameter in the url (e.g: http://scratchx.org/?url=https://paulolc.neocities.org/mcpi-scratch/mcpi-scratch.js&lang=pt#scratch)
    //   2 - browser first preferred language (navigator.languages[0])
    //   3 - default (english)

    var urlParams = new URLSearchParams(window.location.search);
    var lang = urlParams.get('lang') || navigator.languages[0];
    var translate = getTranslationForLang(lang);
    
    var blockNames = [];
    var BLOCKS = translate.blocks
    for (key in BLOCKS)
        {blockNames.push(key)}

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['',  translate.postToChat, "postToChat",  translate.message],
            [" ", translate.playerPosToChat,"playerPosToChat"],
            [" ", translate.setPlayerPos,"setPlayerPos", 0, 0, 0],
            [" ", translate.setBlock,"setBlock", 0, 0, 0, 1, -1],
            [" ", translate.setBlocks,"setBlocks", 0, 0, 0, 0, 0, 0, 1, -1],
            [" ", translate.setLine,"setLine", 0, 0, 0, 0, 0, 1, -1],
            [" ", translate.setCircle,"setCircle", 0, 0, 0, 0, 0, 1, -1],
            ["R", translate.getPlayerPos,"getPlayerPos", 'x'],
            ["R", translate.getBlock,"getBlock", '', 0, 0, 0],
            ["h", translate.whenBlockHit,'whenBlockHit'],
            ["r", "%m.block", "blockID", blockNames[1]],
        ],
        menus: {
            pos: ['x', 'y', 'z'],
            blockPos: ['abs', 'rel'],
            blockData: ['id', 'data'],
            block: blockNames
        }
    };

    // Register the extension
    ScratchExtensions.register('MCPI-Scratch', descriptor, ext);

    checkMC_Events();
    var poller = setInterval(checkMC_Events, 2000);

})({});
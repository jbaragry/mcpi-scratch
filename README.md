MCPI-Scratch
================

A Scratch 2.0 extension application for the Minecraft Pi Protocol

# Status
Currently working on a fix to MCPI-Scratch working with [ScratchX](http://http://scratchx.org/)

# Introduction
MCPI-Scratch lets you write Scratch scripts to manipulate Minecraft. 

More specifically, its an extension application for the Scratch 2 standalone editor that allows you to use blocks that represent the [Minecraft Pi Protocol](http://wiki.vg/Minecraft_Pi_Protocol) API. It actually uses a slightly cut-down version of the API specified by the [RaspberryJuice](http://dev.bukkit.org/bukkit-plugins/raspberryjuice/) mod which allows it to connect to both:
* Minecraft Pi Edition
* CraftBukkit server with the RaspberryJuice mod

A more detailed description of how it works is provided in [this blog entry](http://niphophila.blogspot.com/2014/09/mcpi-scratch-scratch-extension.html)

You might also want to have a look at the documentation at ScriptCraft which has a nice [The Young Person's Guide to Programming in Minecraft](https://github.com/walterhiggins/ScriptCraft/blob/master/docs/YoungPersonsGuideToProgrammingMinecraft.md). It has lots of general tips, for example on how to set up a flat world in CraftBukkit, before getting into its own javascript specific API. 

See also the excellent set of tutorials for [programming with the Pi Edition API](http://www.stuffaboutcode.com/2013/04/minecraft-pi-edition-api-tutorial.html). Its written for Python but the information can be easily applied to Scratch.

You will also want to keep this [reference for block IDs and metadata](http://www.stuffaboutcode.com/p/minecraft-api-reference.html) handy.

Everything is (c) Jason Baragry licensed under CC-BY-SA (Creative commons by attribution)

To make it easier for Scrachers to get up and going, I've chosen to include the Minecraft Pi Edition API in this distribution. I don't think it violates the [Minecraft EULA](https://account.mojang.com/documents/minecraft_eula) but it may be that I need to remove it later and you add it yourself.

The API is the one from [Minecraft Pi Edition](http://minecraft.gamepedia.com/Pi_Edition) and not the modded API from RaspberryJuice. But it might be worth changing to that one later if it gives extra functionality.

The last interesting feature is how the app deals with polling from Scratch. Scratch polls for changed player position (and other reporter variables) about 30 times per second. This polling frequency can't be changed and if the app sent a corresponding `getPlayerPos` request everytime it would choke the `minecraft` server. Instead the app keeps a counter and sends the `getPlayerPos` command every 15 times - approx every 0.5 seconds.

# Installation
Download and install the [Scratch 2 offline editor](http://scratch.mit.edu/scratch2download/).

You need to run this extension application on the same machine as Scratch. Scratch will then communicate with it via HTTP on port `4715`

Minecraft can either be runnnig on the same machine or on another machine which you can specify as a startup parameter. MCPI-Scratch expects Minecraft to be listening on the default port for the Minecraft Pi Protocol - `4711`

MCPI-Scratch takes an optional command-line argument for the host of the minecraft server or minecraft pi edition

	$ python ./mcpi-scratch.py -h
	usage: mcpi-scratch.py [-h] [-m HOST]

	scratch2MinecraftPi is a Scratch2 extension helper app to allow Scratch
	programs to manipulate Minecraft through the Pi protocol

	optional arguments:
	  -h, --help  show this help message and exit
	  -m HOST     hostname/IP for the machine running Minecraft. Default is
	              localhost


# Getting Started
Start the applications in the following order:

1. Make sure you have Python installed

2. Start Minecraft. 
This must be running before you start MCPI-Scratch because the application attempts to create a connection on startup and will fail if Minecraft is not running. You can use either:
	* Minecraft Pi Edition or 
	* CraftBukkit server with the RaspberryJuice mod + plus the Minecraft launcher to start a client to connect to the server
		* There's a nice blog about setting up this env at [StuffAboutCode](http://www.stuffaboutcode.com/2013/06/programming-minecraft-with-bukkit.html)

3. Start MCPI-Scratch
The application attempts to connect to localhost by default. Use the `-m host` cmd-line arg to specify minecraft running on another machine
	$ python ./mcpi-scratch.py
	or
	$ python ./mcpi-scratch.py -m 192.168.1.117 (the IP for your RPi or CraftBukkit server)

4. Start Scratch. 
When the editor loads, shift-click the File menu and select `load experimental...` and select the file `filename` in the MCPI-Scratch install directory. You should now be able to select the `More Blocks` 

# Scratch Blocks
MCPI-Scratch supports the following Blocks
* getPlayerPos:
	* get the Player's x,y,z coordinates (in minecraft, the y coordinate is the vertical plane [height])
* setPlayerPos:
	* set the Player's x,y,z coordinates (in minecraft, the y coordinate is the vertical plane [height])
* postToChat:
	* post a string to the chat window
* postPlayerPosToChat:
	* post a Player's x,y,z coords to the chat window. Useful to have on the scratch canvas so that you can easily find where you are
* setBlock:
	* set a block at the x,y,z coordinates. The blockType (e.g., WOOL) and metadata (e.g., colour) can also be set. The coords can be absolute or relative the player position 
* setBlocks:
	* set a collection of blocks between 2 x,y,z coordinates. BlockType and metadata can also be set.
* setLine:
	* set a line of blocks between to x,z coordinates at a particular height (y). BlockType and metadata can also be set
* setCircle:
	* set a circle with center at x,z coordinates and at a particular height (y). BlockType and metadata can also be set

# Changelog

20141011
* added blocks for setLine and setCircle drawing based on Bresenham's Algorithms
* added block for postPlayerPosToChat to allow viewing of the current player position
* [blog entry](http://niphophila.blogspot.no/2014/10/mcpi-scratch-lines-and-circles.html)

20140915:
* first release to test the idea
* includes API operations
	* getPlayerPos
	* setPlayerPos
	* setBlock
		* setBlock has a switch to interpret the coordinates as being either absolute or relative to the player position
	* setBlocks
	* postToChat
* [blog entry](http://niphophila.blogspot.com/2014/09/mcpi-scratch-scratch-extension.html)

# Issues
* the poll message doesn't work when there is no player in the world. Need to add a check to stop the exception




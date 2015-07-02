MCPI-Scratch
================

A ScratchX extension application for the Minecraft Pi Protocol

# Introduction
MCPI-Scratch lets you write Scratch scripts to manipulate Minecraft. 

More specifically, its an extension application for the [ScratchX editor](http://scratchx.org/) that allows you to use blocks that represent the [Minecraft Pi Protocol](http://wiki.vg/Minecraft_Pi_Protocol) API. It actually uses a slightly cut-down version of the API specified by the [RaspberryJuice](http://dev.bukkit.org/bukkit-plugins/raspberryjuice/) mod which allows it to connect to both:
* Minecraft Pi Edition
* CraftBukkit server with the RaspberryJuice mod

A more detailed description is provided in [github page for the project](http://jbaragry.github.io/mcpi-scratch/)

Everything is (c) Jason Baragry licensed under CC-BY-SA (Creative commons by attribution)

# Changelog

20150629
* changed from the Scratch 2 standalone editor to the ScratchX online editor
	* mcpi-scratch.s2e replaced with mcpi-scratch.js 

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
* currently limited to mcpi-scratch.py running on the same host as the browser used for ScratchX (ie., localhost)
	* looking for a way to set the hostname from the scratch script



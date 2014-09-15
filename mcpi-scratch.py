# simple httpserver to act as a Scratch2 helper app
# adapted from : http://pymotw.com/2/BaseHTTPServer/
# add python minecraft examples from http://www.stuffaboutcode.com/
import sys, traceback
import argparse, urllib
from BaseHTTPServer import BaseHTTPRequestHandler
import urlparse
import mcpi.minecraft as minecraft
import mcpi.block as block
import logging

#logging.basicConfig(level=logging.DEBUG)
logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

class GetHandler(BaseHTTPRequestHandler):

    def setBlock(self, params): # doesn't support metadata
        print ('setblock: {0}'.format(params))
        x = int(params[0])
        y = int(params[1])
        z = int(params[2])
        if (params[5] == 'rel'): # set the block relative to the player
            playerPos = mc.player.getPos()
            playerPos = minecraft.Vec3(int(playerPos.x), int(playerPos.y), int(playerPos.z))
            x += playerPos.x
            y += playerPos.y
            z += playerPos.z
        if (int(params[4]) == -1): # sure these is a more pythonesque way of doing this
            mc.setBlock(x, y, z, int(params[3]))
        else:
            mc.setBlock(x, y, z, int(params[3]), int(params[4]))
        return ''

    def setBlocks(self, params): # doesn't support metadata
        log.info('invoke setBlocks with params: {} {} {} {} {} {} {} {}'.format(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7]))
        if (int(params[7]) == -1): # sure these is a more pythonesque way of doing this
            log.debug('invoking without data')
            mc.setBlocks(int(params[0]), int(params[1]), int(params[2]), int(params[3]), int(params[4]), int(params[5]), int(params[6]))
        else:
            log.debug('invoking with data')
            mc.setBlocks(int(params[0]), int(params[1]), int(params[2]), int(params[3]), int(params[4]), int(params[5]), int(params[6]), int(params[7]))
        return ''        

    def setPlayerPos(self, params): # doesn't support metadata
        log.info('invoke setPlayerPos with params: {} {} {}'.format(params[0], params[1], params[2]))
        mc.player.setPos(int(params[0]), int(params[1]), int(params[2]))
        return ''

    def postToChat(self, params):
        log.info('post to chat: %s', urllib.unquote(params[0]))
        mc.postToChat(urllib.unquote(params[0]))
        return ''

    def cross_domain(self, params):
        # not needed for offline editor, only online webeditor
        log.info('need to return cross_domain.xml') # needed for scratch Flash issues
        return ''

    def reset_all(self, params):
        log.info('trying to reset')
        return ''

    def pollEvents(self, params):
        global pollInc, pollLimit, prevPosStr
        pollInc += 1
        log.debug('poll: {} {}'.format(pollInc, prevPosStr))
        if (prevPosStr != "") and (pollInc % pollLimit != 0):
            log.debug("don't call mc")
            return prevPosStr
        log.debug("call mc")
        playerPos = mc.player.getPos()
        #Using your players position
        # - the players position is an x,y,z coordinate of floats (e.g. 23.59,12.00,-45.32)
        # - in order to use the players position in other commands we need integers (e.g. 23,12,-45)
        # - so round the players position
        # - the Vec3 object is part of the minecraft class library
        playerPos = minecraft.Vec3(int(playerPos.x), int(playerPos.y), int(playerPos.z))
        posStr = ("playerPos/x {0}\r\nplayerPos/y {1}\r\nplayerPos/z {2}".format(str(playerPos.x), str(playerPos.y), str(playerPos.z)))
        prevPosStr = posStr
        return posStr
    
    def do_GET(self):
        global mc
        cmds = {
            "poll" : self.pollEvents,
            "postToChat" : self.postToChat,
            "setBlock" : self.setBlock,
            "setBlocks" : self.setBlocks,
            "setPlayerPos" : self.setPlayerPos,
            "cross_domain.xml" : self.cross_domain,
            "reset_all" : self.reset_all,
        }
        parsed_path = urlparse.urlparse(self.path)
        message_parts = []
        message_parts.append('')
        cmdpath = parsed_path[2].split('/')
        handler = cmds[cmdpath[1]]
        pollResp = handler(cmdpath[2:])
        log.debug ("pollResp: {0}".format(pollResp))
        message_parts.append(pollResp)
        message = '\r\n'.join(message_parts)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(message)
        return

if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='mcpi-scratch is a Scratch2 extension helper app to allow Scratch programs to manipulate Minecraft through the Pi protocol')
    parser.add_argument('-m', action="store", dest="host", help="hostname/IP for the machine running Minecraft. Default is localhost")
    #parser.add_argument('-p', action="store", dest="port", type=int, help="port for the machine running Minecraft with the Pi protocol enabled. Default is 4711")
    args = parser.parse_args()
    log.info(args)

    # nasty stuff to slow down the polling that comes from scratch.
    # from the docs, sratch is polling at 30 times per second
    # updating the player pos that often is causing the app to choke.
    # use these vars to only make the call to MC every pollMax times - 15
    # maybe change this to a cmd-line switch
    pollInc = 0
    pollLimit = 15
    prevPosStr = ""

    try:
        if args.host:
            mc = minecraft.Minecraft.create(args.host)
        else:
            mc = minecraft.Minecraft.create()
    except:
        e = sys.exc_info()[0]
        log.exception('cannot connect to minecraft')
        traceback.print_exc(file=sys.stdout)
        sys.exit(0)

    from BaseHTTPServer import HTTPServer
    server = HTTPServer(('localhost', 4715), GetHandler)
    log.info('Starting server, use <Ctrl-C> to stop')
    server.serve_forever()

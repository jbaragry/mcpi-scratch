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

logging.basicConfig(level=logging.DEBUG)
#logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

class GetHandler(BaseHTTPRequestHandler):

    def setBlock(self, params):
        print ('setblock: {0}'.format(params))
        x = int(params[0])
        y = int(params[1])
        z = int(params[2])
        blockType = int(params[3])
        blockData = int(params[4])
        if (params[5] == 'rel'): # set the block relative to the player
            playerPos = mc.player.getTilePos()
            #playerPos = minecraft.Vec3(int(playerPos.x), int(playerPos.y), int(playerPos.z))
            x += playerPos.x
            y += playerPos.y
            z += playerPos.z
        if (blockData == -1): # sure these is a more pythonesque way of doing this
            mc.setBlock(x, y, z, blockType)
        else:
            mc.setBlock(x, y, z, blockType, blockData)
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

    # implementation of Bresenham's Line Algorithm to rasterise the points in a line between two endpoints
    # algorithm taken from: http://www.roguebasin.com/index.php?title=Bresenham%27s_Line_Algorithm#Python
    # note: y refers to usual cartesian x,y coords. Not the minecraft coords where y is the veritical axis
    def getLinePoints(self, x1, y1, x2, y2):
        points = []
        issteep = abs(y2-y1) > abs(x2-x1)
        if issteep:
            x1, y1 = y1, x1
            x2, y2 = y2, x2
        rev = False
        if x1 > x2:
            x1, x2 = x2, x1
            y1, y2 = y2, y1
            rev = True
        deltax = x2 - x1
        deltay = abs(y2-y1)
        error = int(deltax / 2)
        y = y1
        ystep = None
        if y1 < y2:
            ystep = 1
        else:
            ystep = -1
        for x in range(x1, x2 + 1):
            if issteep:
                points.append((y, x))
            else:
                points.append((x, y))
            error -= deltay
            if error < 0:
                y += ystep
                error += deltax
        # Reverse the list if the coordinates were reversed
        if rev:
            points.reverse()
        return points

    # calls getLine to rasterise a line between two points, the last param is the vertical axis.
    # eg: x1,z1,x2,z2,y in minecraft coordinates
    # then plots the line using setBlock
    def setLine(self, params): 
        log.info('invoke setLine with params: {} {} {} {} {}'.format(params[0], params[1], params[2], params[3], params[4], params[5]))
        log.debug(params)
        x1 = int(params[0])
        z1 = int(params[1])
        x2 = int(params[2])
        z2 = int(params[3])
        y = int(params[4])
        blockType = int(params[5])
        blockData = int(params[6])
        points = self.getLinePoints(x1, z1, x2, z2)
        log.debug(points)
        for p in points:
            self.setBlock([p[0], y, p[1], blockType, blockData, ''])
        return ''

    # plots a circles point coords using Bresenham's circle algorithm (also known as a midpoint circle algorithm)
    # based on code from http://rosettacode.org/wiki/Bitmap/Midpoint_circle_algorithm#Python
    # note: y refers to usual cartesian x,y coords. Not the minecraft coords where y is the veritical axis
    def getCirclePoints(self, x0, y0, radius):
        log.debug('getCirclePoints with: {} {} {}'.format(x0, y0, radius))
        points = []
        x = 0
        y = radius
        f = 1 - radius
        ddf_x = 1
        ddf_y = -2 * radius
        x = 0
        y = radius
        points.append((x0, y0 + radius))
        points.append((x0, y0 - radius))
        points.append((x0 + radius, y0))
        points.append((x0 - radius, y0))

        while x < y:
            if f >= 0: 
                y -= 1
                ddf_y += 2
                f += ddf_y
            x += 1
            ddf_x += 2
            f += ddf_x    
            points.append((x0 + x, y0 + y))
            points.append((x0 - x, y0 + y))
            points.append((x0 + x, y0 - y))
            points.append((x0 - x, y0 - y))
            points.append((x0 + y, y0 + x))
            points.append((x0 - y, y0 + x))
            points.append((x0 + y, y0 - x))
            points.append((x0 - y, y0 - x))

        return points

    # builds a circle using Bresenham's circle algorithm (also known as a midpoint circle algorithm)
    # plots using setBlock
    def setCircle(self, params): 
        log.info('invoke setCircle with params: {} {} {} {} {}'.format(params[0], params[1], params[2], params[3], params[4]))
        log.debug(params)
        x1 = int(params[0])
        z1 = int(params[1])
        r = int(params[2])
        y = int(params[3])
        blockType = int(params[4])
        blockData = int(params[5])
        points = self.getCirclePoints(x1, z1, r)
        log.debug(points)
        for p in points:
            self.setBlock([p[0], y, p[1], blockType, blockData, ''])
        return ''

    def postToChat(self, params):
        log.info('post to chat: %s', urllib.unquote(params[0]))
        mc.postToChat(urllib.unquote(params[0]))
        return ''

    def playerPosToChat(self, params):
        log.info('playerPos to chat')
        playerPos = mc.player.getTilePos()
        log.debug(playerPos)
        #playerPos = minecraft.Vec3(int(playerPos.x), int(playerPos.y), int(playerPos.z))
        log.debug(playerPos)
        posStr = ("x {0} y {1} z {2}".format(str(playerPos.x), str(playerPos.y), str(playerPos.z)))
        log.debug(posStr)
        mc.postToChat(urllib.unquote(posStr))
        return ''

    def cross_domain(self, params):
        # not needed for offline editor, only online webeditor
        log.info('need to return cross_domain.xml') # needed for scratch Flash issues
        return ''

    def reset_all(self, params):
        log.info('trying to reset')
        return ''

    def getPlayerPos(self, params): # doesn't support metadata
        log.info('invoke getPlayerPos: {}'.format(params[0]))
        playerPos = mc.player.getPos()
        #Using your players position
        # - the players position is an x,y,z coordinate of floats (e.g. 23.59,12.00,-45.32)
        # - in order to use the players position in other commands we need integers (e.g. 23,12,-45)
        # - so round the players position
        # - the Vec3 object is part of the minecraft class library
        playerPos = minecraft.Vec3(int(playerPos.x), int(playerPos.y), int(playerPos.z))
        log.debug(playerPos)
        # I'm sure theres a more pythony way to get at the vector elements but...
        coord = params[0];
        coordVal = 0;
        if (coord == 'x'):
            coordVal = playerPos.x
        if (coord == 'y'):
            coordVal = playerPos.y
        if (coord == 'z'):
            coordVal = playerPos.z
        return str(coordVal)

    # getBlock calls getBlockWithData function
    # currently only returns the id and not the data 
    # TODO: refactor to return data also
    def getBlock(self, params):
        log.info ('getBlock: {0}'.format(params))
        x = int(params[0])
        y = int(params[1])
        z = int(params[2])
        if (params[3] == 'rel'): # set the block relative to the player
            playerPos = mc.player.getTilePos()
            x += playerPos.x
            y += playerPos.y
            z += playerPos.z
        blockData = mc.getBlockWithData(x, y, z)
        log.info ('blockData: %s', blockData)
        return str(blockData.id)

    # from original version for scratch2
    # currently unused
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
        # posStr = ("playerPos/x {0}\r\nplayerPos/y {1}\r\nplayerPos/z {2}".format(str(playerPos.x), str(playerPos.y), str(playerPos.z)))
        # posStr = ("{0}".format(str(playerPos.x)))
        log.debug(playerPos)
        return playerPos.x

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Credentials', 'true')
        # deal with the CORS issue
        self.send_header('Access-Control-Allow-Origin', 'http://scratchx.org')
        #self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-type")
    
    def do_GET(self):
        global mc
        cmds = {
            "poll" : self.pollEvents,
            "postToChat" : self.postToChat,
            "setBlock" : self.setBlock,
            "setBlocks" : self.setBlocks,
            "setPlayerPos" : self.setPlayerPos,
            "playerPosToChat" : self.playerPosToChat,
            "setLine" : self.setLine,
            "setCircle" : self.setCircle,
            "cross_domain.xml" : self.cross_domain,
            "reset_all" : self.reset_all,
            "getPlayerPos" : self.getPlayerPos,
            "getBlock" : self.getBlock,
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
        # deal with the CORS issue
        self.send_header('Access-Control-Allow-Origin', 'http://scratchx.org')
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

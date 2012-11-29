
import base64
import zlib
import json
from WebAppDIRAC.Lib.WebHandler import WebHandler, WErr, WOK, asyncGen
from DIRAC.Core.Utilities import DEncode
from DIRAC.Core.DISET.ThreadConfig import ThreadConfig
from DIRAC.FrameworkSystem.Client.UserProfileClient import UserProfileClient

class UPHandler( WebHandler ):

  __tc = ThreadConfig()


  def prepare( self ):
    if not self.isRegisteredUser():
      raise WErr( 401, "Not a registered user" )
    self.set_header( "Pragma", "no-cache" )
    self.set_header( "Cache-Control", "max-age=0, no-store, no-cache, must-revalidate" )
    #Do not use the defined user setup. Use the web one to show the same profile independenly of
    # user setup
    self.__tc.setSetup( False )

  def __getUP( self ):
    try:
      obj = self.request.arguments[ 'obj' ][-1]
      app = self.request.arguments[ 'app' ][-1]
    except KeyError as excp:
      raise WErr( 400, "Missing %s" % excp )
    return UserProfileClient( "Web/%s/%s" % ( obj, app ) )


  @asyncGen
  def web_saveAppState( self ):
    up = self.__getUP()
    try:
      name = self.request.arguments[ 'name' ][-1]
      state = self.request.arguments[ 'state' ][-1]
    except KeyError as excp:
      raise WErr( 400, "Missing %s" % excp )
    data = base64.b64encode( zlib.compress( DEncode.encode( state ), 9 ) )
    result = yield self.threadTask( up.storeVar, name, data )
    if not result[ 'OK' ]:
      raise WErr.fromSERROR( result )
    self.set_status( 200 )
    self.finish()

  @asyncGen
  def web_loadAppState( self ):
    up = self.__getUP()
    try:
      name = self.request.arguments[ 'name' ][-1]
    except KeyError as excp:
      raise WErr( 400, "Missing %s" % excp )
    result = yield self.threadTask( up.retrieveVar, name )
    if not result[ 'OK' ]:
      raise WErr.fromSERROR( result)
    data = result[ 'Value' ]
    data, count = DEncode.decode( zlib.decompress( base64.b64decode( data ) ) )
    self.finish( data )

  @asyncGen
  def web_listAppState( self ):
    up = self.__getUP()
    result = yield self.threadTask( up.retrieveAllVars )
    if not result[ 'OK' ]:
      raise WErr.fromSERROR( result)
    data = result[ 'Value' ]
    for k in data:
      #Unpack data
      data[ k ] = json.loads( DEncode.decode( zlib.decompress( base64.b64decode( data[ k ] ) ) )[0] )
    self.finish( data )

  @asyncGen
  def web_delAppState( self ):
    up = self.__getUP()
    try:
      name = self.request.arguments[ 'name' ][-1]
    except KeyError as excp:
      raise WErr( 400, "Missing %s" % excp )
    result = yield self.threadTask( up.deleteVar, name )
    if not result[ 'OK' ]:
      raise WErr.fromSERROR( result)
    self.finish()

  def _readConfigData(self):
    result = {"user_config":None,
              "desktop_config":{
                                "start_menu_config":[],
                                "shortcut_config":[]
                                }
              }
    
    '''
      Reading the user info
    '''
    result["user_config"] = self._getUserInfo();
    
    if result["user_config"]:
      '''
        Reading the configuration for the START menu
      '''
      result["desktop_config"]["start_menu_config"].append({"name":'DIRAC.GridWindow', "launcher": {"text": 'Grid Window', "iconCls":'icon-grid'}, "jsLoaded":0})
      result["desktop_config"]["start_menu_config"].append({"name":'DIRAC.TabWindow', "launcher": {"text": 'Tab Windows', "iconCls":'tabs'}, "jsLoaded":0})
      result["desktop_config"]["start_menu_config"].append({"name":'DIRAC.AccordionWindow', "launcher": {"text": 'Accordion Window', "iconCls":"accordion"}, "jsLoaded":0})
      result["desktop_config"]["start_menu_config"].append({"name":'DIRAC.Notepad', "launcher": {"text": 'Notepad', "iconCls":'notepad'}, "jsLoaded":0}) 
      
      '''
        Reading the configuration for the SHORTCUTS placed at the desktop
      '''
  #    result["shortcut_config"].append({"name" : 'Grid Window',"iconCls" : 'grid-shortcut',"module" : 'DIRAC.GridWindow'});
  #    result["shortcut_config"].append({"name" : 'Accordion Window',"iconCls" : 'accordion-shortcut',"module" : 'Desktop.AccordionWindow'});
  #    result["shortcut_config"].append({"name" : 'Notepad',"iconCls" : 'notepad-shortcut',"module" : 'DIRAC.Notepad'});
    
    
    
    return json.dumps(result)
  
  def _getUserInfo(self):
    if not self.isRegisteredUser():
      return False
    data = {'username' : self.getUserName(), 'group' : self.getUserGroup(), 'DN' : self.getUserDN(), 'setup' : self.getUserSetup() }
    data[ 'groups' ] = Registry.getGroupsForUser(self.getUserName())["Value"]
    data[ 'setups' ] = gConfig.getSections('/DIRAC/Setups')["Value"]
    
    return data
  
  def web_getConfig(self):
    self.write(self._readConfigData());

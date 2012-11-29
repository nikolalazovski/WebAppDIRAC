Ext.Loader.setConfig({
  disableCaching: false
});

Ext.Class.registerPreprocessor('mvchelper',
    function (cls, data) {
        if (Ext.isArray(data.controllers) && !Ext.isArray(cls.controllers)) {
            cls.controllers = data.controllers
        }
    }, true);
    
Ext.Class.setDefaultPreprocessorPosition('mvchelper', 'first');

Ext.application({
    name:'DIRACWebFramework',
    appFolder:'static/core',
    autoCreateViewport:true,
    controllers:['MVCLoader', 'Main']
});



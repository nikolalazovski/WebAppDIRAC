Ext
    .define(
        'DIRACWebFramework.controller.Main',
        {
          extend : 'Ext.app.Controller',

          init : function() {
            
            this.control({
            });
          },
          
          onMenuItem : function(menu, item, e, eOpts) {

            if (menu.text == 'Old Job Monitor') {
              var view = Ext.getCmp('diracviewport');
              var mainview = view.items.getAt(0);
              var desktop = mainview.app.getDesktop();
              var win = desktop
                  .createWindow({
                    title : menu.text,
                    width : 600,
                    height : 400,
                    iconCls : 'notepad',
                    // animCollapse : false,
                    // border : false,
                    // hideMode : 'offsets',
                    // layout : 'fit',
                    html : "<iframe id='myFrame' frameborder='0' vspace='0' hspace='0' marginwidth='0' marginheight='0' width='100%' height='100%' src='http://lhcb-web-dirac.cern.ch/DIRAC/LHCb-Production/lhcb_user/Jobs/JobMonitor/display' scrolling='auto' style='overflow:visible'> </iframe>"
                  });

              win.show();
            } else {

              Ext.Ajax.request({
                url : '/DIRAC/diracwebframework/runApplication',
                method : 'GET',
                params : {
                  Application : menu.text
                },
                success : function(response, opts) {
                  var app = Ext.decode(response.responseText);
                  var page = app['Page']
                  var location = app['Location']
                  var module = app['Module']
                  Ext.Loader.setPath(page, location);

                  var view = Ext.getCmp('diracviewport');
                  var mainview = view.items.getAt(0);
                  var desktop = mainview.app.getDesktop();
                  var win = desktop.createWindow({
                    title : menu.text,
                    width : 600,
                    height : 400,
                    iconCls : 'notepad',
                    animCollapse : false,
                    border : false,
                    hideMode : 'offsets',
                    layout : 'fit',
                    items : Ext.create(module)
                  });

                  win.show();
                },
                failure : function(response, opts) {
                  console.log('server-side failure with status code '
                      + response.status);
                }
              });
            }
          }
        });
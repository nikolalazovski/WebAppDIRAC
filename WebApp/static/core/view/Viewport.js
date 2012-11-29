Ext.define('DIRACWebFramework.view.Viewport', {
	extend : 'Ext.container.Viewport',
	uses : [ 'DIRACWebFramework.view.DiracDesktop' ],
	layout : 'fit',
	id : 'diracviewport',
	initComponent : function() {
		var desktop = new DIRACWebFramework.view.DiracDesktop();
		this.callParent(arguments);
	}
});

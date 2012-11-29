Ext.define('DIRACWebFramework.view.Viewport', {
	extend : 'Ext.container.Viewport',
	uses : [ 'DIRACWebFramework.view.App' ],
	layout : 'fit',
	id : 'diracviewport',
	initComponent : function() {
		var desktop = new DIRACWebFramework.view.App();
		this.callParent(arguments);
	}
});

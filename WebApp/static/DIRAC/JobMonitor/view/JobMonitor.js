Ext.define('DIRAC.JobMonitor.view.JobMonitor', {
	extend : 'Ext.ux.desktop.Module',
	alias : 'widget.dJobMonitor',
	controllers : [ 'DIRAC.JobMonitor.controller.Main' ],

	launcher: {
		
		text : 'Job Monitor',
		iconCls : 'notepad'
		
	},
	
	initComponent : function() {
		
		var me = this;
		
		Ext.apply(me, {
			layout : 'fit',
			items : [Ext.create('DIRAC.JobMonitor.view.JobMonitoringGrid')]
		});
		
		me.callParent(arguments);
	}
});

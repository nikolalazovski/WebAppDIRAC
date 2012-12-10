Ext.define('DIRAC.JobMonitor.controller.Main', {
    extend:'Ext.app.Controller',
    stores:['DIRAC.JobMonitor.store.Jobs'],
    views:['DIRAC.JobMonitor.view.JobMonitor'],
    refs:[
        {
            ref:'myMainView',
            selector:'dJobMonitor'
        }
    ],
    init:function () {
    	
        this.control({});
        
    }
});
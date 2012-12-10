Ext.define('DIRAC.JobMonitor.view.JobMonitoringGrid', {
  extend : 'Ext.grid.Panel',
  alias : 'widget.diracjobmonitorGrid',

  height : 100,

  jobid : function(val) {
    return '<span style="color:red;">' + val + '</span>';
  },
  stateful: true,
  viewConfig : {
    listeners : {
      itemclick : function(view, rowIndex, colIndex, item, e) {
        var rec = view.getRecords(view.getNodes())[rowIndex];
        console.log(view);
        alert(item);
      }
    }
  },
  initComponent : function() {
	  
    var store = Ext.create('DIRAC.JobMonitor.store.Jobs');
    Ext.apply(this, {
      height : this.height,
      stateful: true,
      store : store,
      stripeRows : true,
      columnLines : true,
      columns : [ {
        text : 'JobId',
        flex : 1,
        sortable : true,
        renderer : this.jobid,
        dataIndex : 'jobid',

      }, {
        text : 'Job Name',
        width : 75,
        sortable : true,
        dataIndex : 'jobname'
      }, {
        text : 'Status',
        width : 75,
        sortable : true,
        dataIndex : 'status'
      }, {
        text : 'Site',
        width : 75,
        sortable : true,
        dataIndex : 'site'
      } ]
    });

    this.callParent(arguments);
  }
});
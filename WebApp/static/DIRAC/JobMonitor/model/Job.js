Ext.define('DIRAC.JobMonitor.model.Job', {
  extend: 'Ext.data.Model',
  fields: [
      {name: 'jobid', type:'integer'},
        {name: 'jobname'},
        {name: 'status'},
        {name: 'site'},
    ]
});
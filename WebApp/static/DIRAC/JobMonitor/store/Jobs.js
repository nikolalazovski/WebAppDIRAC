Ext.define('DIRAC.JobMonitor.store.Jobs', {
    extend: 'Ext.data.ArrayStore',
    model: 'DIRAC.JobMonitor.model.Job',
    data: [
        [1,'ex1', 'Done', 'Cern.ch'],
        [2,'ex2', 'waiting', 'Cern.ch'],
        [3,'ex3', 'waiting', 'pic.ch'],
    ]
});
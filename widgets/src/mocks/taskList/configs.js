export const CONNECTIONS = [
  {
    name: 'kieStaging',
    host: 'rhpam7-install-kieserver-rhpam7-install-entando.apps.serv.run',
    port: '80',
    schema: 'http',
    app: '/services/rest/',
    username: 'pamAdmin',
    connectionTimeout: 60000,
    engine: 'pam',
  },
  {
    name: 'kie2Server',
    host: 'rhpam7-install-kieserver-rhpam7-install-entando.apps.serv.run',
    port: '80',
    schema: 'http',
    app: '/services/rest/',
    username: 'pamAdmin',
    connectionTimeout: 60000,
    engine: 'pam',
  },
  {
    name: 'test',
    host: 'rhpam7-install-kieserver-rhpam7-install-entando.apps.serv.run',
    port: '80',
    schema: 'http',
    app: '/services/rest/',
    username: 'pamAdmin',
    connectionTimeout: 60000,
    engine: 'pam',
  },
];

export const PROCESS = [
  {
    name: 'process 1',
  },
  {
    name: 'process 2',
  },
  {
    name: 'process 3',
  },
];

export const GROUPS = [
  'Administrators',
  'broker',
  'admin',
  'rest-all',
  'kiemgmt',
  'kie-server',
  'appraiser',
  'manager',
  'supplier',
  'IT',
  'PM',
];

export const COLUMNS = [
  'task-is-skipable',
  'task-priority',
  'task-parent-id',
  'task-created-by',
  'task-input-data.application.property.saleprice',
  'task-input-data.TaskName',
  'initiator',
  'task-created-on',
  'task-proc-def-id',
  'task-form',
  'task-skippable',
  'task-input-data.application.applicant.name',
  'task-actual-owner',
  'task-activation-time',
  'task-input-data.application.applicant.address',
  'task-input-data.application.errors',
  'task-name',
  'task-input-data.application.property.address',
  'task-subject',
  'containerId',
  'task-container-id',
  'processDefinitionId',
  'task-input-data.application.applicant.ssn',
  'task-description',
  'task-input-data.Skippable',
  'task-workitem-id',
  'task-expiration-time',
  'task-input-data.application.property.age',
  'task-status',
  'task-input-data.application.mortgageamount',
  'task-process-instance-id',
  'task-input-data.ActorId',
  'task-process-id',
  'task-input-data.application.property.locale',
  'task-input-data.application.amortization',
  'task-input-data.application.applicant.creditrating',
  'application',
  'task-input-data.NodeName',
  'task-proc-inst-id',
  'task-input-data.application.downpayment',
  'task-input-data.application.applicant.annualincome',
  'task-id',
];

export const WIDGET_CONFIGS = {
  payload: {
    code: 'pda_task_list',
    config: {
      groups:
        '[{"label":"Administrators","key":"Administrators","checked":true},{"label":"broker","key":"broker","checked":true},{"label":"admin","key":"admin","checked":false},{"label":"rest-all","key":"rest-all","checked":false},{"label":"kiemgmt","key":"kiemgmt","checked":true},{"label":"kie-server","key":"kie-server","checked":true},{"label":"appraiser","key":"appraiser","checked":false},{"label":"manager","key":"manager","checked":true},{"label":"supplier","key":"supplier","checked":true},{"label":"IT","key":"IT","checked":true},{"label":"PM","key":"PM","checked":true}]',
      options:
        '[{"key":"newPageOnClick","label":"Open new page on table row click","checked":false},{"key":"showClaim","label":"Show Claim Button","checked":true},{"key":"showComplete","label":"Show Complete Button","checked":true}]',
      columns:
        '[{"name":"task-is-skipable","position":0,"isVisible":false},{"name":"task-parent-id","position":1,"isVisible":false},{"name":"task-created-by","position":2,"isVisible":true},{"name":"task-input-data.application.property.saleprice","position":3,"isVisible":true},{"name":"task-input-data.TaskName","position":4,"isVisible":true},{"name":"initiator","position":5,"isVisible":true},{"name":"task-created-on","position":6,"isVisible":true},{"name":"task-priority","position":7,"isVisible":false},{"name":"task-proc-def-id","position":8,"isVisible":true},{"name":"task-form","position":9,"isVisible":true},{"name":"task-skippable","position":10,"isVisible":true},{"name":"task-input-data.application.applicant.name","position":11,"isVisible":true},{"name":"task-actual-owner","position":12,"isVisible":true},{"name":"task-activation-time","position":13,"isVisible":true},{"name":"task-input-data.application.applicant.address","position":14,"isVisible":true},{"name":"task-input-data.application.errors","position":15,"isVisible":true},{"name":"task-name","position":16,"isVisible":true},{"name":"task-input-data.application.property.address","position":17,"isVisible":true},{"name":"task-subject","position":18,"isVisible":true},{"name":"containerId","position":19,"isVisible":true},{"name":"task-container-id","position":20,"isVisible":true},{"name":"processDefinitionId","position":21,"isVisible":true},{"name":"task-input-data.application.applicant.ssn","position":22,"isVisible":true},{"name":"task-description","position":23,"isVisible":true},{"name":"task-input-data.Skippable","position":24,"isVisible":true},{"name":"task-workitem-id","position":25,"isVisible":true},{"name":"task-expiration-time","position":26,"isVisible":true},{"name":"task-input-data.application.property.age","position":27,"isVisible":true},{"name":"task-status","position":28,"isVisible":true},{"name":"task-input-data.application.mortgageamount","position":29,"isVisible":true},{"name":"task-process-instance-id","position":30,"isVisible":true},{"name":"task-input-data.ActorId","position":31,"isVisible":true},{"name":"task-process-id","position":32,"isVisible":true},{"name":"task-input-data.application.property.locale","position":33,"isVisible":true},{"name":"task-input-data.application.amortization","position":34,"isVisible":true},{"name":"task-input-data.application.applicant.creditrating","position":35,"isVisible":true},{"name":"application","position":36,"isVisible":true},{"name":"task-input-data.NodeName","position":37,"isVisible":true},{"name":"task-proc-inst-id","position":38,"isVisible":true},{"name":"task-input-data.application.downpayment","position":39,"isVisible":true},{"name":"task-input-data.application.applicant.annualincome","position":40,"isVisible":true},{"name":"task-id","position":41,"isVisible":true}]',
      knowledgeSource: 'kieStaging',
      process: 'itorders.orderhardware@itorders_1.0.0-SNAPSHOT',
    },
  },
  errors: {},
};

import MOCKED_WIDGET_CONFIGS from 'mocks/app-builder/pages';

const PAGE_CODE = 'phase_1_widgets';
const TASK_ID = '30@mortgage-process_1.0.0-SNAPSHOT';

export default {
  TASK_LIST: {
    pageCode: PAGE_CODE,
    frameId: '1',
    widgetCode: 'phase_1_widgets_task_details',
    configs: MOCKED_WIDGET_CONFIGS.TASK_LIST,
  },
  TASK_DETAILS: {
    pageCode: PAGE_CODE,
    taskId: TASK_ID,
    frameId: '4',
    widgetCode: 'phase_1_widgets_task_details',
    configs: MOCKED_WIDGET_CONFIGS.TASK_DETAILS,
  },
  COMPLETION_FORM: {
    pageCode: PAGE_CODE,
    taskId: TASK_ID,
    frameId: '2',
    widgetCode: 'phase_1_widgets_completion_form',
    configs: MOCKED_WIDGET_CONFIGS.COMPLETION_FORM,
  },
  TASK_COMMENTS: {
    pageCode: PAGE_CODE,
    taskId: TASK_ID,
    frameId: '5',
    widgetCode: 'phase_1_widgets_comments',
    configs: MOCKED_WIDGET_CONFIGS.TASK_COMMENTS,
  },
  SUMMARY_CARD: {
    pageCode: PAGE_CODE,
    frameId: '1',
    widgetCode: 'summary_card',
    configs: MOCKED_WIDGET_CONFIGS.SUMMARY_CARD,
  },
  PROCESS_FORM: {
    pageCode: PAGE_CODE,
    frameId: '3',
    widgetCode: 'process_form',
    configs: MOCKED_WIDGET_CONFIGS.PROCESS_FORM,
  },
  OVERTIME_GRAPH: {
    pageCode: 'phase_1_mgt_dashboard',
    frameId: '5',
    widgetCode: 'overtime_graph',
    configs: MOCKED_WIDGET_CONFIGS.OVERTIME_GRAPH,
  },
  ATTACHMENTS: {
    pageCode: PAGE_CODE,
    taskId: TASK_ID,
    frameId: '2',
    widgetCode: 'phase_1_widgets_attachments',
    configs: MOCKED_WIDGET_CONFIGS.ATTACHMENTS,
  },
  PROCESS_DEFINITION: {
    pageCode: PAGE_CODE,
    taskId: TASK_ID,
    frameId: '2',
    widgetCode: 'phase_1_widgets_process_definition',
    configs: MOCKED_WIDGET_CONFIGS.PROCESS_DEFINITION,
  },
};

export const createWidgetEvent = eventType => {
  return payload => {
    const widgetEvent = new CustomEvent(eventType, { detail: payload });
    window.dispatchEvent(widgetEvent);
  };
};

export const addCustomEventListener = (eventType, eventHandler) => {
  window.addEventListener(eventType, eventHandler);
  return () => {
    window.removeEventListener(eventType, eventHandler);
  };
};

export const subscribeToWidgetEvents = (widgetEvents, eventHandler) => {
  return widgetEvents.map(eventType => {
    return addCustomEventListener(eventType, eventHandler);
  });
};

const TASK_DETAILS_PREFIX = 'task.details';
export const TD_ON_PRESS_PREVIOUS = `${TASK_DETAILS_PREFIX}.onPressPrevious`;
export const TD_ON_PRESS_NEXT = `${TASK_DETAILS_PREFIX}.onPressNext`;
export const TD_ON_ERROR = `${TASK_DETAILS_PREFIX}.onError`;

const TASK_LIST_PREFIX = 'task.list';
export const TL_ON_SELECT_TASK = `${TASK_LIST_PREFIX}.onSelectTask`;

const PDA_CONFIG_PREFIX = 'pda.config';
export const PDA_CONFIG_ON_UPDATE = `${PDA_CONFIG_PREFIX}.onUpdate`;

export const BADGE_CHIP_INPUT_EVENTS = [PDA_CONFIG_ON_UPDATE];

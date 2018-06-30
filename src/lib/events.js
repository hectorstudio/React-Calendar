import isFunction from 'lodash/isFunction';

let dateChangeEvent;
if (typeof Event !== 'undefined' && isFunction(Event)) {
  dateChangeEvent = new Event('dateChange', { bubbles: false });
} else {
  if (typeof document !== 'undefined') {
    dateChangeEvent = document.createEvent('Event');
    dateChangeEvent.initEvent('dateChange', false, false);
  }
}

export const dispatchDateChange = () => {
  if (dateChangeEvent && typeof window !== 'undefined')
    window.dispatchEvent(dateChangeEvent);
};

export const EVENTS = {
  DATE_CHANGE: 'dateChange',
};

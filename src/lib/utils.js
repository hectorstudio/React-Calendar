import moment from 'moment';
import reduce from 'lodash/reduce';
import assign from 'lodash/assign';
import noop from 'lodash/noop';
import range from 'lodash/range';

const _getCalendarStart = referenceDate => {
  return referenceDate
    .clone()
    .startOf('month')
    .startOf('week');
};

const getArrayOfWeeks = (referenceDateParam, weeks = 6) => {
  const referenceDate = referenceDateParam ? referenceDateParam : moment();
  const daysInWeekList = range(7);

  const day = _getCalendarStart(referenceDate).clone();
  const weeksList = reduce(
    range(weeks),
    arr => {
      const allDaysInWeek = reduce(
        daysInWeekList,
        arr1 => {
          arr1.push(day.clone());
          day.add(1, 'd');
          return arr1;
        },
        [],
      );
      arr.push(allDaysInWeek);
      return arr;
    },
    [],
  );
  return weeksList;
};

/** Compare two `moment`'s by date. */
const compareDates = (oneDate, otherDate) => {
  if (!oneDate.year || !otherDate.year) return false;
  return (
    oneDate.year() === otherDate.year() &&
    oneDate.month() === otherDate.month() &&
    oneDate.date() === otherDate.date()
  );
};

/** Check if date should be showed as active in calendar.
 * Check if date is the same as `active` or is date included in given date's interval.
 * @param {moment} checkedDate Date which compared with `active`
 * @param {moment||{start: moment, end: moment}} active Eather date or date's interval as [start, end]
 */
const isActiveDate = (checkedDate, active) => {
  if (!checkedDate || !active) return false;
  if (active.hasOwnProperty('start') && active.hasOwnProperty('end')) {
    if (!active.start) {
      return;
    }
    if (!active.end) {
      return compareDates(checkedDate, active.start);
    }
    const normStart = moment({
      year: active.start.year(),
      month: active.start.month(),
      date: active.start.date(),
    });
    const normEnd = moment({
      year: active.end.year(),
      month: active.end.month(),
      date: active.end.date(),
    });
    const normCheckedDate = moment({
      year: checkedDate.year(),
      month: checkedDate.month(),
      date: checkedDate.date(),
    });
    return (
      (normStart.isBefore(normCheckedDate) &&
        normEnd.isAfter(normCheckedDate)) ||
      normStart.isSame(normCheckedDate) ||
      normEnd.isSame(normCheckedDate)
    );
  }
  return compareDates(checkedDate, active);
};

/** Check if given day is in the `date`'s month. */
const isDayInMonth = (day, date) => {
  const currentMonth = date.month();
  return day.month() === currentMonth;
};

/** Return array of week day names.
 *
 * getWeekDays() --> ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Su']
 */
const getWeekDays = (long = false) =>
  long ? moment.weekdays() : moment.weekdaysMin();

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
const getUnhandledProps = (Component, props) => {
  // Note that `handledProps` are generated automatically during build with `babel-plugin-transform-react-handled-props`
  const { handledProps = [] } = Component;

  return Object.keys(props).reduce((acc, propKey) => {
    if (propKey === 'childKey') return acc;
    if (handledProps.indexOf(propKey) === -1) acc[propKey] = props[propKey];
    return acc;
  }, {});
};

const cloneReplaceValue = (data, newValue) => {
  return assign({}, data, { value: newValue });
};

const getMonths = () => {
  return moment.monthsShort();
};

const monthIndex = month => {
  return getMonths().indexOf(month);
};

/** Set zero timeout.
 *
 * Sometimes we need to delay rerendering components
 * on one tick (if they are inside  `Popup` and rerendering could
 * change `Popup`'s content sizes).
 * Becouse it races with Popup's onclick handler.
 * `Popup` relies on it's content sizes when computing
 * should popup stay open or be closed. So we need
 * to wait until `Popup`'s onclick handler done its job.
 */
const tick = leadToRerendering => {
  setTimeout(leadToRerendering, 0);
};
const emptyFunction = noop();
export {
  getArrayOfWeeks,
  isActiveDate,
  isDayInMonth,
  getWeekDays,
  getUnhandledProps,
  cloneReplaceValue,
  emptyFunction,
  getMonths,
  monthIndex,
  tick,
};

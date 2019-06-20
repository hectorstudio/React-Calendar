import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';

import { monthIndex, cloneReplaceValue, emptyFunction, tick } from '../lib';
import { DATE_INPUT, DATE_TIME_INPUT } from '../lib/COMPONENT_TYPES.js';
import { EVENTS, dispatchDateChange } from '../lib/events.js';

const getPrevMode = (mode, lastMode) => {
  if (mode === 'minute') return 'hour';
  if (mode === 'hour') return 'day';
  if (mode === 'day') return 'month';
  if (mode === 'month') return 'year';
  return lastMode;
};

const getNextMode = (mode, lastMode) => {
  if (mode === lastMode) return lastMode;
  if (mode === 'year') return 'month';
  if (mode === 'month') return 'day';
  if (mode === 'day') return 'hour';
  if (mode === 'hour') return 'minute';
  return lastMode;
};

const getTime = ({ hour = '00', minute = '00' }) => {
  return `${hour}:${minute}`;
};

const parseDate = (value, format) => {
  const date = moment(value, format);
  return date.isValid() ? date : moment();
};

function withStateInput(WrappedComponent) {
  return class WithStateInput extends React.Component {
    static get name() {
      const wrappedComponentName =
        WrappedComponent.META && WrappedComponent.META.name;
      return wrappedComponentName ? wrappedComponentName : 'WithStateInput';
    }

    static propTypes = {
      /** (event, data) => {} */
      onDateChange: PropTypes.func,
      /** (event, data) => {} */
      onTimeChange: PropTypes.func,
      onDatesRangeChange: PropTypes.func,
      startMode: PropTypes.oneOf(['year', 'month', 'day']),
      value: PropTypes.any,
      dateFormat: PropTypes.string,
      pickDate: PropTypes.bool,
      pickDateTime: PropTypes.bool,
      pickDatesRange: PropTypes.bool,
      divider: PropTypes.string,
      onRangeChange: PropTypes.func,
      onChange: PropTypes.func,
      datesRange: PropTypes.object,
      onDateTimeChange: PropTypes.func,
      dateTimeValue: PropTypes.object,
    };

    static defaultProps = {
      onDateChange: emptyFunction,
      onTimeChange: emptyFunction,
      startMode: 'day',
      dateFormat: 'DD-MM-YYYY',
      divider: ' ',
    };

    constructor(props) {
      super(props);

      const { value, dateFormat, startMode, datesRange } = props;
      const initialDate = value
        ? moment(value, dateFormat)
        : moment().startOf('month');
      this.state = {
        dateToShow: initialDate,
        activeHour: '',
        activeMinute: '',
        mode: startMode,
        datesRange: datesRange ? datesRange : { start: null, end: null },
      };
      if (datesRange) {
        this.state.datesRange = datesRange
          ? datesRange
          : { start: null, end: null };
        this.onDatesRangeChange(
          null,
          cloneReplaceValue(
            null,
            this.getDatesRange({
              start: datesRange.start,
              end: datesRange.end,
            }),
          ),
        );
      }
    }

    componentDidMount() {
      window.addEventListener(EVENTS.DATE_CHANGE, this.updateDateToShow);
    }

    shouldComponentUpdate(nextProps, nextState) {
      const {
        dateToShow,
        year,
        month,
        activeHour,
        activeMinute,
        mode,
        datesRange,
      } = this.state;
      // for some reason when input value changes `Picker` updates twice (becouse of his parents updating)
      // but the second update is unnecessery because in second update `Picker` receives
      // `value` the same as previous `value`
      // seems like it it happens because `onDateClick` uses 0 timeout when setting state
      return (
        nextProps.value !== this.props.value ||
        dateToShow !== nextState.dateToShow ||
        year !== nextState.year ||
        month !== nextState.month ||
        activeHour !== nextState.activeHour ||
        activeMinute !== nextState.activeMinute ||
        mode !== nextState.mode ||
        datesRange.start !== nextState.datesRange.start ||
        datesRange.end !== nextState.datesRange.end
      );
    }

    componentWillUnmount() {
      window.removeEventListener(EVENTS.DATE_CHANGE, this.updateDateToShow);
    }

    onDateClick = (event, data) => {
      tick(() => {
        this.onDateChange(event, data);
        this.switchToNextMode(
          WrappedComponent.META.type === DATE_TIME_INPUT ? 'minute' : 'day',
        );
        if (WrappedComponent.META.type === DATE_TIME_INPUT)
          dispatchDateChange();
      });
    };

    onDateChange = (event, data) => {
      if (WrappedComponent.META.type === DATE_INPUT) {
        const { onChange } = this.props;
        onChange(data.value);
      } else if (WrappedComponent.META.type === DATE_TIME_INPUT) {
        ///////////////////////////////////
        const { onDateTimeChange, dateTimeValue } = this.props;
        const selectedMoment = data.value;
        const nextDateTime = moment(dateTimeValue);
        nextDateTime.year(selectedMoment.year());
        nextDateTime.month(selectedMoment.month());
        nextDateTime.date(selectedMoment.date());
        if (onDateTimeChange) onDateTimeChange(nextDateTime);
        ///////////////////////////////////
      }
    };

    onTimeChange = (event, data) => {
      if (WrappedComponent.META.type === DATE_TIME_INPUT) {
        const { value, dateFormat, divider } = this.props;
        const newValue = `${moment(value, dateFormat).format(
          dateFormat,
        )}${divider}${data.value}`;
        invoke(this.props, 'onChange', event, {
          ...this.props,
          value: newValue,
        });
      }
    };

    onHourClick = (event, data) => {
      ///////////////////////////////////
      const { onDateTimeChange, dateTimeValue } = this.props;
      const { hour } = data;
      const nextDateTime = moment(dateTimeValue);
      nextDateTime.hour(hour);
      if (onDateTimeChange) onDateTimeChange(nextDateTime);
      ///////////////////////////////////

      tick(() => {
        this.setState(() => ({
          activeHour: data.value,
        }));
        this.switchToNextMode('minute');
      });
    };
    onMinuteClick = (event, data) => {
      ///////////////////////////////////
      const { onDateTimeChange, dateTimeValue } = this.props;

      const { minute } = data;
      const nextDateTime = moment(dateTimeValue);
      nextDateTime.minute(minute);
      if (onDateTimeChange) onDateTimeChange(nextDateTime);
      ///////////////////////////////////

      this.setState(prevState => {
        const newData = cloneReplaceValue(
          data,
          getTime({
            hour: prevState.activeHour,
            minute: data.value,
          }),
        );
        this.onTimeChange(event, newData);
        return {
          activeMinute: data.value,
        };
      });
    };
    onDatesRangeChange = (event, data) => {
      invoke(this.props, 'onChange', event, {
        ...this.props,
        value: data.value,
      });
    };

    onYearChange = (event, data) => {
      ///////////////////////////////////
      const { onDateTimeChange, dateTimeValue } = this.props;
      const nextDateTime = moment(dateTimeValue);
      nextDateTime.year(data.value);
      if (onDateTimeChange) onDateTimeChange(nextDateTime);
      ///////////////////////////////////

      const date = {
        year: data.value,
      };
      this.setState({
        dateToShow: moment(date),
        year: data.value,
      });
      this.switchToNextMode();
    };

    onMonthChange = (event, data) => {
      ///////////////////////////////////
      const { onDateTimeChange, dateTimeValue } = this.props;
      const nextDateTime = moment(dateTimeValue);
      nextDateTime.month(monthIndex(data.value));
      if (onDateTimeChange) onDateTimeChange(nextDateTime);
      ///////////////////////////////////

      const date = {
        year: this.state.year,
        month: monthIndex(data.value),
      };
      this.setState({
        dateToShow: moment(date),
        month: data.value,
      });
      this.switchToNextMode();
    };
    setStartEndDatesRange = (event, data) => {
      const { onDatesRangeChange } = this;
      const { start, end } = data;
      const { onRangeChange } = this.props;
      const newState = {
        datesRange: { start, end },
      };
      this.setState(newState, () => {
        onRangeChange({ start, end });
        onDatesRangeChange(
          event,
          cloneReplaceValue(
            data,
            this.getDatesRange({
              start,
              end,
            }),
          ),
        );
      });
    };
    setDatesRange = (event, data) => {
      const { onDatesRangeChange } = this;
      const { onRangeChange } = this.props;
      this.setState(({ datesRange }) => {
        let newState;
        if (datesRange.start && datesRange.end) {
          newState = {
            datesRange: { start: null, end: null },
          };
          onRangeChange({ start: null, end: null });
          onDatesRangeChange(
            event,
            cloneReplaceValue(data, this.getDatesRange()),
          );
        } else if (datesRange.start && datesRange.start.isAfter(data.value)) {
          newState = {
            datesRange: { start: null, end: null },
          };
          onDatesRangeChange(
            event,
            cloneReplaceValue(data, this.getDatesRange()),
          );
          onRangeChange({ start: null, end: null });
        } else if (datesRange.start) {
          newState = {
            datesRange: { start: datesRange.start, end: data.value },
          };
          onDatesRangeChange(
            event,
            cloneReplaceValue(
              data,
              this.getDatesRange({
                start: datesRange.start,
                end: data.value,
              }),
            ),
          );
          onRangeChange({ start: datesRange.start, end: data.value });
        } else {
          newState = {
            datesRange: { start: data.value, end: datesRange.end },
          };
          onRangeChange({ start: data.value, end: datesRange.end });
          onDatesRangeChange(
            event,
            cloneReplaceValue(
              data,
              this.getDatesRange({
                start: data.value,
                end: datesRange.end,
              }),
            ),
          );
        }
        return newState;
      });
    };

    getDatesRange = range => {
      const { dateFormat } = this.props;
      const { start, end } = range ? range : { start: null, end: null };
      const startStr = start && start.format ? start.format(dateFormat) : '';
      const endStr = end && end.format ? end.format(dateFormat) : '';
      if (startStr) return `${startStr} - ${endStr}`;
      return '';
    };

    updateDateToShow = () => {
      if (this.props.value) {
        this.setState({
          dateToShow: parseDate(this.props.value, this.props.dateFormat),
        });
      }
    };

    switchToPrevMode = (lastMode = 'day') => {
      const nextMode = getPrevMode(this.state.mode, lastMode);
      this.setState({ mode: nextMode });
    };

    switchMode = mode => {
      this.setState({ mode });
    };

    switchToNextMode = (lastMode = 'day') => {
      this.setState({ mode: getNextMode(this.state.mode, lastMode) });
    };

    showNextYear = () => {
      this.setState(({ dateToShow }) => {
        const nextYear = dateToShow.clone();
        nextYear.add(1, 'Y');
        return {
          dateToShow: nextYear,
          year: nextYear.format('YYYY'),
        };
      });
    };

    showPrevYear = () => {
      this.setState(({ dateToShow }) => {
        const prevYear = dateToShow.clone();
        prevYear.add(-1, 'Y');
        return {
          dateToShow: prevYear,
          year: prevYear.format('YYYY'),
        };
      });
    };

    showNextMonth = () => {
      this.setState(({ dateToShow }) => {
        const nextMonth = dateToShow.clone();
        nextMonth.add(1, 'M');
        return { dateToShow: nextMonth };
      });
    };

    showPrevMonth = () => {
      this.setState(({ dateToShow }) => {
        const prevMonth = dateToShow.clone();
        prevMonth.add(-1, 'M');
        return { dateToShow: prevMonth };
      });
    };

    showNextDay = () => {
      if (this.props.pickDateTime) this.resetMinutes();
      this.setState(({ dateToShow }) => {
        const nextDay = dateToShow.clone();
        nextDay.add(1, 'd');
        this.onDateChange(null, { value: nextDay });
        return { dateToShow: nextDay };
      });
    };

    showPrevDay = () => {
      if (this.props.pickDateTime) this.resetMinutes();
      this.setState(({ dateToShow }) => {
        const prevDay = dateToShow.clone();
        prevDay.add(-1, 'd');
        this.onDateChange(null, { value: prevDay });
        return { dateToShow: prevDay };
      });
    };

    handleHeaderDateClick = e => {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        this.switchToPrevMode();
      }, 0);
    };

    handleHeaderTimeClick = () => {
      this.switchToPrevMode('minute');
      this.resetMinutes();
      this.resetHours();
    };

    resetMinutes = () => {
      this.setState({ activeMinute: '' });
    };

    resetHours = () => {
      this.setState({ activeHour: '' });
    };

    render() {
      const activeDate = parseDate(this.props.value, this.props.dateFormat);
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          activeDate={activeDate}
          setDatesRange={this.setDatesRange}
          getDatesRange={this.setDatesRange}
          setStartEndDatesRange={this.setStartEndDatesRange}
          switchToPrevMode={this.switchToPrevMode}
          switchToNextMode={this.switchToNextMode}
          switchMode={this.switchMode}
          showNextYear={this.showNextYear}
          showPrevYear={this.showPrevYear}
          showNextMonth={this.showNextMonth}
          showPrevMonth={this.showPrevMonth}
          showNextDay={this.showNextDay}
          showPrevDay={this.showPrevDay}
          onDateClick={this.onDateClick}
          onHourClick={this.onHourClick}
          onMinuteClick={this.onMinuteClick}
          onYearChange={this.onYearChange}
          onMonthChange={this.onMonthChange}
          handleHeaderDateClick={this.handleHeaderDateClick}
          handleHeaderTimeClick={this.handleHeaderTimeClick}
          resetMinutes={this.resetMinutes}
          resetHours={this.resetHours}
          onDateChange={this.onDateChange}
          onTimeChange={this.onTimeChange}
          onDatesRangeChange={this.onDatesRangeChange}
        />
      );
    }
  };
}

export default withStateInput;
export { withStateInput };

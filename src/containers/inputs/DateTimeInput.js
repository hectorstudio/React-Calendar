import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import trim from 'lodash/trim';
import moment from 'moment';

import {
  CustomPopup as Popup,
  CustomInput as Input,
  withStateInput,
  YearPickerMixin,
} from '../';
import { DATE_TIME_INPUT } from '../../lib/COMPONENT_TYPES.js';
import { DateTimePickerContent } from '../../components/pickerContent/DateTimePickerContent.js';

const validateDate = (date, dateFormat) => {
  const mmDate = moment(trim(date), dateFormat, true);
  return mmDate.isValid() ? mmDate : null;
};

class DateTimeInput extends YearPickerMixin {
  static META = {
    type: DATE_TIME_INPUT,
    name: 'DateTimeInput',
  };

  constructor(props) {
    super(props);

    this.state = {
      yearsStart: props.dateToShow.year() - 6,
    };

    const { dateTimeValue, dateTimeFormat } = props;
    this.state = {
      yearsStart: props.dateToShow.year() - 6,
      dateTimeValue: dateTimeValue.format(dateTimeFormat),
    };
  }

  getPicker() {
    const {
      // dateToShow,
      dateTimeValue,
      activeHour,
      activeMinute,
      mode,
      handleHeaderDateClick,
      handleHeaderTimeClick,
      onYearChange,
      showNextMonth,
      showPrevMonth,
      showNextYear,
      showPrevYear,
      showNextDay,
      showPrevDay,
      onMonthChange,
      onDateClick,
      onHourClick,
      onMinuteClick,
    } = this.props;

    return (
      <Table unstackable celled textAlign="center">
        <DateTimePickerContent
          activeDate={dateTimeValue}
          dateToShow={dateTimeValue}
          activeHour={activeHour}
          activeMinute={activeMinute}
          mode={mode}
          handleHeaderDateClick={handleHeaderDateClick}
          handleHeaderTimeClick={handleHeaderTimeClick}
          onYearChange={onYearChange}
          showNextMonth={showNextMonth}
          showPrevMonth={showPrevMonth}
          showNextYear={showNextYear}
          showPrevYear={showPrevYear}
          showNextDay={showNextDay}
          showPrevDay={showPrevDay}
          onMonthChange={onMonthChange}
          onDateClick={onDateClick}
          onHourClick={onHourClick}
          onMinuteClick={onMinuteClick}
          yearsRange={this.getYearsRange()}
          onPrevBtnClick={this.onPrevBtnClick}
          onNextBtnClick={this.onNextBtnClick}
        />
      </Table>
    );
  }

  componentWillReceiveProps = nextProps => {
    const { dateTimeValue } = nextProps;
    const { dateTimeFormat } = this.props;
    if (dateTimeValue) {
      const strDate = dateTimeValue.format(dateTimeFormat);
      if (strDate !== this.lastValue) {
        this.lastValue = strDate;
        this.setState({ dateTimeValue: strDate });
      }
    }
  };

  _onChange = e => {
    const value = e.target.value;
    const { dateTimeFormat, onDateTimeChange } = this.props;

    const date = validateDate(value, dateTimeFormat);
    if (date) {
      onDateTimeChange(date);
    }
    this.setState({ dateTimeValue: value });
  };

  render() {
    const {
      className,
      iconPosition,
      mode,
      name,
      placeholder,
      icon,
      inline,
      popupPosition,
    } = this.props;

    const { dateTimeValue } = this.state;

    const inputElement = (
      <Input
        className={className}
        iconPosition={iconPosition}
        mode={mode}
        name={name}
        placeholder={placeholder}
        icon={icon}
        value={dateTimeValue}
        onChange={this._onChange}
        fluid
      />
    );

    if (inline) {
      return this.getPicker();
    }
    return (
      <Popup position={popupPosition} trigger={inputElement}>
        {this.getPicker()}
      </Popup>
    );
  }
}

DateTimeInput.propTypes = {
  /** Called on change.
   * @param {SyntheticEvent} event React's original SyntheticEvent.
   * @param {object} data All props and proposed value.
   */
  onChange: PropTypes.func,
  /** Same as semantic-ui-react Input's ``icon`` prop. */
  icon: PropTypes.any,
  /** Date formatting string.
   * Anything that that can be passed to ``moment().format``.
   */
  dateTimeFormat: PropTypes.string,
  dateTimeValue: PropTypes.object,
  startMode: PropTypes.oneOf(['year', 'month', 'day']),
  popupPosition: PropTypes.oneOf([
    'top left',
    'top right',
    'bottom left',
    'bottom right',
    'right center',
    'left center',
    'top center',
    'bottom center',
  ]),
  inline: PropTypes.bool,
};

DateTimeInput.defaultProps = {
  icon: 'calendar',
  dateFormat: 'DD-MM-YYYY',
  startMode: 'day',
  inline: false,
};

const WrappedDateTimeInput = withStateInput(DateTimeInput);

export default WrappedDateTimeInput;
export { WrappedDateTimeInput as DateTimeInput };

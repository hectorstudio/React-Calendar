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
import { DATE_INPUT } from '../../lib/COMPONENT_TYPES.js';
import { DatePickerContent } from '../../components/pickerContent/DatePickerContent.js';

const validateDate = (date, dateFormat) => {
  const mmDate = moment(trim(date), dateFormat, true);
  return mmDate.isValid() ? mmDate : null;
};

class DateInput extends YearPickerMixin {
  static META = {
    type: DATE_INPUT,
    name: 'DateInput',
  };

  constructor(props) {
    super(props);

    const { value, dateFormat } = props;
    this.state = {
      yearsStart: props.dateToShow.year() - 6,
      dateValue: value.format(dateFormat),
    };
  }

  componentWillReceiveProps = nextProps => {
    const { value } = nextProps;
    const { dateFormat } = this.props;
    if (value) {
      const strDate = value.format(dateFormat);
      if (strDate !== this.lastValue) {
        this.lastValue = strDate;
        this.setState({ dateValue: strDate });
      }
    }
  };

  getPicker() {
    const {
      setDatesRange,
      onYearChange,
      showNextYear,
      showPrevYear,
      dateToShow,
      onMonthChange,
      showNextMonth,
      showPrevMonth,
      onDateClick,
      activeDate,
      handleHeaderDateClick,
      mode,
    } = this.props;
    return (
      <Table unstackable celled textAlign="center">
        <DatePickerContent
          mode={mode}
          handleHeaderDateClick={handleHeaderDateClick}
          onYearChange={onYearChange}
          showNextYear={showNextYear}
          showPrevYear={showPrevYear}
          dateToShow={dateToShow}
          onMonthChange={onMonthChange}
          showNextMonth={showNextMonth}
          showPrevMonth={showPrevMonth}
          onDateClick={onDateClick}
          activeDate={activeDate}
          yearsRange={this.getYearsRange()}
          onPrevBtnClick={this.onPrevBtnClick}
          onNextBtnClick={this.onNextBtnClick}
          setDatesRange={setDatesRange}
        />
      </Table>
    );
  }

  _onChange = e => {
    const value = e.target.value;

    const { dateFormat, onChange } = this.props;
    const date = validateDate(value, dateFormat);
    if (date) {
      onChange(date);
    }
    this.setState({ dateValue: value });
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

    const { dateValue } = this.state;

    const inputElement = (
      <Input
        className={className}
        iconPosition={iconPosition}
        mode={mode}
        name={name}
        placeholder={placeholder}
        icon={icon}
        value={dateValue}
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

DateInput.propTypes = {
  /** Called on change.
   * @param {SyntheticEvent} event React's original SyntheticEvent.
   * @param {object} data All props and proposed value.
   */
  onChange: PropTypes.func,
  /** Same as semantic-ui-react Input's ``icon`` prop. */
  icon: PropTypes.any,
  /** Date formatting string.
   * Anything that that can be passed to ``moment().format``
   */
  dateFormat: PropTypes.string,
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

DateInput.defaultProps = {
  icon: 'calendar',
  dateFormat: 'DD-MM-YYYY',
  startMode: 'day',
  inline: false,
};

const WrappedDateInput = withStateInput(DateInput);

export default WrappedDateInput;
export { WrappedDateInput as DateInput };

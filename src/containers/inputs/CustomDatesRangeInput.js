import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggled';

import { getUnhandledProps } from '../../lib';
import { DATES_RANGE_INPUT } from '../../lib/COMPONENT_TYPES';
import { DatesRangePickerContent } from '../../components/pickerContent/DatesRangePickerContent.js';
import {
  ControlledCustomPopup as Popup,
  CustomInput as Input,
  withStateInput,
} from '../';

class CustomDatesRangeInput extends Component {
  static META = {
    type: DATES_RANGE_INPUT,
    name: 'CustomDatesRangeInput',
  };

  getPicker() {
    const rest = getUnhandledProps(CustomDatesRangeInput, this.props);
    const {
      handleHeaderDateClick,
      showNextMonth,
      showPrevMonth,
      dateToShow,
      datesRange,
      setDatesRange,
    } = this.props;
    return (
      <Table {...rest} unstackable celled textAlign="center">
        <DatesRangePickerContent
          handleHeaderDateClick={handleHeaderDateClick}
          showNextMonth={showNextMonth}
          showPrevMonth={showPrevMonth}
          dateToShow={dateToShow}
          datesRange={datesRange}
          setDatesRange={setDatesRange}
        />
      </Table>
    );
  }

  render() {
    const {
      onChange,
      icon,
      popupPosition,
      inline,
      setDatesRange,
      setStartEndDatesRange,
      datesRange: { start, end },
      dateFormat,
    } = this.props;
    const rest = getUnhandledProps(CustomDatesRangeInput, this.props);
    const datesRangeInputValue = `${start ? start.format(dateFormat) : ''} - ${
      end ? end.format(dateFormat) : ''
    }`;
    const inputElement = (
      <Input
        {...rest}
        onChange={onChange}
        icon={icon}
        value={datesRangeInputValue}
        fluid
      />
    );
    if (inline) {
      return this.getPicker();
    }
    return (
      <Toggle initial={false}>
        {({ on, setOff, setOn }) => (
          <Popup
            position={popupPosition}
            trigger={inputElement}
            popupState={on}
            handleClose={setOff}
            handleOpen={setOn}
            setDatesRange={setDatesRange}
            setStartEndDatesRange={setStartEndDatesRange}
          >
            {this.getPicker()}
          </Popup>
        )}
      </Toggle>
    );
  }
}

CustomDatesRangeInput.propTypes = {
  /** Called on change.
   * @param {SyntheticEvent} event React's original SyntheticEvent.
   * @param {object} data All props and proposed value.
   */
  onRangeChange: PropTypes.func,
  onChange: PropTypes.func,
  /** Same as semantic-ui-react Input's ``icon`` prop. */
  icon: PropTypes.any,
  /** Date formatting string.
   * Anything that that can be passed to ``moment().format``.
   */
  dateFormat: PropTypes.string,
  /** Character that used to divide dates in string. */
  divider: PropTypes.string,
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
  handleHeaderDateClick: PropTypes.func,
  showNextMonth: PropTypes.func,
  showPrevMonth: PropTypes.func,
  dateToShow: PropTypes.object,
  datesRange: PropTypes.object,
  setDatesRange: PropTypes.func,
  setStartEndDatesRange: PropTypes.func,
};

CustomDatesRangeInput.defaultProps = {
  icon: 'calendar',
  inline: false,
};

const WrappedDatesRangeInput = withStateInput(CustomDatesRangeInput);

export default WrappedDatesRangeInput;
export { WrappedDatesRangeInput as CustomDatesRangeInput };

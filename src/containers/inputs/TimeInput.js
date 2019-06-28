import React from 'react';
import { Table, Input } from 'semantic-ui-react';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import moment from 'moment';

import { CustomPopup } from '../';
import { getUnhandledProps, tick } from '../../lib';
import { TIME_INPUT } from '../../lib/COMPONENT_TYPES';
import { TimePickerPopup } from '../../components';

const parseTime = (value, outFormat = 'HH:mm') => {
  if (value) return moment(value, 'HH:mm').format(outFormat);
  return '00';
};

class TimeInput extends React.Component {
  static META = {
    type: TIME_INPUT,
    name: 'TimeInput',
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: 'hour',
    };
  }

  onPopupClose = () => {
    this.setState({ mode: 'hour' });
  };

  onTimeUpdate = (event, data) => {
    invoke(this.props, 'onChange', event, {
      ...this.props,
      value: data.value,
    });
  };

  onHourClick = (event, data) => {
    tick(() => {
      const newValue = parseTime(data.value);

      this.setState(() => {
        this.onTimeUpdate(event, { value: newValue });
        return {
          mode: 'minute',
        };
      });
    });
  };

  onMinuteClick = (event, data) => {
    const { value } = this.props;
    const newValue = `${parseTime(value, 'HH')}:${data.value}`;
    this.setState(() => {
      this.onTimeUpdate(event, { value: newValue });
      return {
        mode: 'minute',
      };
    });
  };

  getPicker = () => {
    const { value, closePopup } = this.props;
    const [activeHour, activeMinute] = [
      parseTime(value, 'HH'),
      parseTime(value, 'mm'),
    ];
    const rest = getUnhandledProps(TimeInput, this.props);
    return (
      <Table {...rest} unstackable celled textAlign="center">
        <TimePickerPopup
          mode={this.state.mode}
          activeHour={activeHour}
          activeMinute={activeMinute}
          onHourClick={this.onHourClick}
          onMinuteClick={this.onMinuteClick}
          inputType="time"
          closePopup={closePopup}
        />
      </Table>
    );
  };

  render() {
    const { onChange, icon, popupPosition, inline, value } = this.props;
    const rest = getUnhandledProps(TimeInput, this.props);

    const inputElement = (
      <Input {...rest} value={value} icon={icon} onChange={onChange} />
    );
    if (inline) {
      return this.getPicker();
    }
    return (
      <CustomPopup
        onClose={this.onPopupClose}
        inputType="time"
        position={popupPosition}
        trigger={inputElement}
      >
        {this.getPicker()}
      </CustomPopup>
    );
  }
}

TimeInput.propTypes = {
  /** Called on change.
   * @param {SyntheticEvent} event React's original SyntheticEvent.
   * @param {object} data All props and proposed value.
   */
  onChange: PropTypes.func,
  /** Same as semantic-ui-react Input's ``icon`` prop. */
  icon: PropTypes.any,
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
  value: PropTypes.string,
  closePopup: PropTypes.func,
};

TimeInput.defaultProps = {
  icon: 'time',
  inline: false,
};

export default TimeInput;

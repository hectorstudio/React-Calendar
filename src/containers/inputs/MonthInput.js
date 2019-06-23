import React from 'react';
import { Input, Table } from 'semantic-ui-react';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';

import { CustomPopup as Popup } from '../';
import { getUnhandledProps } from '../../lib';
import { MONTH_INPUT } from '../../lib/COMPONENT_TYPES';
import { MonthPickerComponent } from '../../components';

class MonthInput extends React.Component {
  static META = {
    type: MONTH_INPUT,
    name: 'MonthInput',
  };

  onMonthClick = (event, data) => {
    this.onMonthUpdate(event, data);
  };

  onMonthUpdate = (event, data) => {
    invoke(this.props, 'onChange', event, {
      ...this.props,
      value: data.value,
    });
  };

  getPicker() {
    const rest = getUnhandledProps(MonthInput, this.props);
    const { value } = this.props;
    return (
      <Table {...rest} unstackable celled textAlign="center">
        <MonthPickerComponent
          onMonthClick={this.onMonthClick}
          activeMonth={value}
        />
      </Table>
    );
  }

  render() {
    const { onChange, icon, popupPosition, inline, value } = this.props;

    const rest = getUnhandledProps(MonthInput, this.props);

    const inputElement = (
      <Input {...rest} value={value} icon={icon} onChange={onChange} />
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

MonthInput.propTypes = {
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
};

MonthInput.defaultProps = {
  icon: 'calendar',
  inline: false,
};

export default MonthInput;

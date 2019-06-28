import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getUnhandledProps } from '../../lib';

class DatePickerCell extends Component {
  onCellClick = event => {
    event.stopPropagation();
    const { onClick, data } = this.props;
    onClick(event, { ...this.props, value: data });
  };
  render() {
    const { className, data } = this.props;
    const classes = ClassNames(className, 'suir-calendar', 'date');
    const rest = getUnhandledProps(DatePickerCell, this.props);
    return (
      <Table.Cell {...rest} onClick={this.onCellClick} className={classes}>
        {data.format('D')}
      </Table.Cell>
    );
  }
}

DatePickerCell.propTypes = {
  data: PropTypes.instanceOf(moment).isRequired,
  className: PropTypes.string,
  /** (event, data) => {} */
  onClick: PropTypes.func,
};

export default DatePickerCell;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import { getUnhandledProps } from '../lib';

class YearPickerCell extends Component {
  _onYearClick = event => {
    const { onClick, year } = this.props;
    event.stopPropagation();
    onClick(event, { ...this.props, value: year });
  };
  render() {
    const { year } = this.props;
    const rest = getUnhandledProps(YearPickerCell, this.props);

    return (
      <Table.Cell
        {...rest}
        onClick={this._onYearClick}
        className="suir-calendar date"
        textAlign="center"
      >
        {year}
      </Table.Cell>
    );
  }
}

YearPickerCell.propTypes = {
  onClick: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired,
};
export default YearPickerCell;

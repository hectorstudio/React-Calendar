import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import fill from 'lodash/fill';
import map from 'lodash/map';
import chunk from 'lodash/chunk';

import { getUnhandledProps } from '../lib';

import YearPickerCell from './YearPickerCell';

/** Return array of 12 years as strings 'YYYY'.
 * @param {number} yearsStart */
const getYears = yearsStart => {
  const years = new Array(12);
  return map(fill(years, yearsStart), (year, i) => (year + i).toString());
};

class YearPickerComponent extends Component {
  _getRest = () => getUnhandledProps(YearPickerComponent, this.props);
  render() {
    const { onYearClick, activeYear, yearsStart } = this.props;
    const rest = this._getRest();
    const cellStyle = {
      width: '33.333333%',
      minWidth: '7em',
    };
    const years = map(getYears(yearsStart), year => (
      <YearPickerCell
        style={cellStyle}
        onClick={onYearClick}
        active={year === activeYear.toString()}
        year={year}
        key={year}
      />
    ));
    const rows = map(chunk(years, 3), (row, i) => (
      <Table.Row key={i}>{row}</Table.Row>
    ));
    return <Table.Body {...rest}>{rows}</Table.Body>;
  }
}

YearPickerComponent.propTypes = {
  /** (event, data) => {} */
  onYearClick: PropTypes.func.isRequired,
  activeYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  yearsStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default YearPickerComponent;
export { YearPickerComponent, getYears };

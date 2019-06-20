import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import map from 'lodash/map';

import { getWeekDays } from '../lib';

class PickerHeader extends Component {
  _getWeekDayHeaders = () => {
    return map(getWeekDays(), weekDay => (
      <Table.HeaderCell
        key={weekDay}
        className="suir-calendar week-day"
        colSpan="1"
      >
        {weekDay}
      </Table.HeaderCell>
    ));
  };

  _getRowContent = () => {
    const { activeDatesRange } = this.props;
    const { start, end } = activeDatesRange;
    if (start && end) {
      return start.format('MMM DD, YYYY') + ' - ' + end.format('MMM DD, YYYY');
    }
    if (start) {
      return start.format('MMMM DD, YYYY') + ' - ' + '. . .';
    }
    return '. . . - . . .';
  };
  _getRangeRow = () => {
    return (
      <Table.Row>
        <Table.HeaderCell className="suir-calendar cell" colSpan="7">
          {this._getRowContent()}
        </Table.HeaderCell>
      </Table.Row>
    );
  };

  _getContent = () => {
    const { activeDate, activeYears, activeYear, includeDay } = this.props;
    if (activeYears) {
      return `${activeYears.start} - ${activeYears.end}`;
    }

    if (activeYear) {
      return activeYear;
    }

    if (activeDate) {
      return includeDay
        ? activeDate.format('MMMM DD, YYYY')
        : activeDate.format('MMMM YYYY');
    }
  };
  render() {
    const {
      onNextBtnClick,
      onPrevBtnClick,
      activeDatesRange,
      showWeeks,
      width,
      onDateClick,
    } = this.props;
    const cellClasses = ClassNames(
      'suir-calendar',
      'cell',
      showWeeks ? '' : 'time-picker-header',
    );

    const buttonClasses = ClassNames('suir-calendar', 'button');
    const headerCellStyle = { cursor: 'pointer' };
    return (
      <Table.Header>
        {activeDatesRange && this._getRangeRow()}
        <Table.Row>
          <Table.HeaderCell className={cellClasses} colSpan="1">
            <Icon
              fitted
              className={buttonClasses}
              onClick={onPrevBtnClick}
              name="chevron left"
            />
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={onDateClick}
            className={cellClasses}
            colSpan={(parseInt(width) - 2).toString()}
          >
            <span style={headerCellStyle}>{this._getContent()}</span>
          </Table.HeaderCell>
          <Table.HeaderCell className={cellClasses} colSpan="1">
            <Icon
              fitted
              className={buttonClasses}
              onClick={onNextBtnClick}
              name="chevron right"
            />
          </Table.HeaderCell>
        </Table.Row>
        {showWeeks && <Table.Row>{this._getWeekDayHeaders()}</Table.Row>}
      </Table.Header>
    );
  }
}

PickerHeader.propTypes = {
  onNextBtnClick: PropTypes.func.isRequired,
  onPrevBtnClick: PropTypes.func.isRequired,
  /** Header's width in table columns */
  width: PropTypes.string.isRequired,
  /** calendar shows date of this `moment` */
  activeDate: PropTypes.instanceOf(moment),
  activeYear: PropTypes.string,
  activeYears: PropTypes.object,
  activeDatesRange: PropTypes.object,
  includeDay: PropTypes.bool,
  showWeeks: PropTypes.bool,
  onDateClick: PropTypes.func,
};

PickerHeader.defaultProps = {
  includeDay: false,
  showWeeks: false,
};

export default PickerHeader;
export { PickerHeader };

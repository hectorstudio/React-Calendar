import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import './PopupFooter.component.css';

const PopupFooter = ({
  shouldShowTimeButton,
  shouldShowClosePopupButton,
  onChangeModeButtonClicked,
  // onClosePopupClicked,
}) =>
  (shouldShowClosePopupButton || shouldShowTimeButton) && (
    <Table.Footer>
      <Table.Row>
        {shouldShowTimeButton && (
          <Table.Cell colSpan="16" className="p-edit-content__footer">
            <div className="p-edit-content__footer--wrapper">
              <div
                role="presentation"
                className="p-edit-content__footer--button"
                onClick={onChangeModeButtonClicked('day')}
              >
                <Icon name="calendar" />
                Day
              </div>
              <div
                role="presentation"
                className="p-edit-content__footer--button"
                onClick={onChangeModeButtonClicked('hour')}
              >
                <Icon name="calendar times outline" />
                Hour
              </div>
              <div
                role="presentation"
                className="p-edit-content__footer--button"
                onClick={onChangeModeButtonClicked('minute')}
              >
                <Icon name="time" />
                Minute
              </div>
            </div>
          </Table.Cell>
        )}
      </Table.Row>
    </Table.Footer>
  );

PopupFooter.propTypes = {
  shouldShowClosePopupButton: PropTypes.bool,
  shouldShowTimeButton: PropTypes.bool,
  onChangeModeButtonClicked: PropTypes.func,
  onClosePopupClicked: PropTypes.func,
};

export default compose(
  withHandlers({
    onChangeModeButtonClicked: ({ switchMode }) => mode => event => {
      event.preventDefault();
      event.stopPropagation();
      setTimeout(() => {
        switchMode(mode);
      }, 0);
    },
    onClosePopupClicked: ({ closePopup }) => event => {
      event.preventDefault();
      event.stopPropagation();
      closePopup();
    },
  }),
)(PopupFooter);

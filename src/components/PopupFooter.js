import React from 'react';
import { Table, Icon, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';

const PopupFooter = ({
  shouldShowTimeButton,
  shouldShowClosePopupButton,
  onChangeModeButtonClicked,
  onClosePopupClicked,
}) =>
  (shouldShowClosePopupButton || shouldShowTimeButton) && (
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan="16">
          <Grid>
            <Grid.Row>
              {shouldShowTimeButton && (
                <Grid.Column
                  width="8"
                  onClick={onChangeModeButtonClicked}
                  className="suir-calendar date"
                >
                  <Icon name="clock" />
                  Time
                </Grid.Column>
              )}
              <Grid.Column
                width={shouldShowTimeButton ? '8' : '16'}
                className="suir-calendar date"
                onClick={onClosePopupClicked}
              >
                <Icon name="check" />
                Ok
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Table.Cell>
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
    onChangeModeButtonClicked: ({ switchMode }) => event => {
      event.preventDefault();
      event.stopPropagation();
      setTimeout(() => {
        switchMode('hour');
      }, 0);
    },
    onClosePopupClicked: ({ closePopup }) => event => {
      event.preventDefault();
      event.stopPropagation();
      closePopup();
    },
  }),
)(PopupFooter);

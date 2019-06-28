import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Icon } from 'semantic-ui-react';

const PopupFooterChangeModeButton = ({
  changeMode,
  mode,
  name,
  icon,
  pickerName,
  title,
}) => (
  <div
    role="presentation"
    className={ClassNames(
      'p-edit-content__footer--button',
      name == pickerName ? 'p-edit-content__footer--button--active' : '',
    )}
    onClick={changeMode(mode)}
  >
    <div className="p-edit-content__footer--button__icon">
      <Icon name={icon} />
    </div>
    <div className="p-edit-content__footer--button__name">{title}</div>
  </div>
);
PopupFooterChangeModeButton.propTypes = {
  changeMode: PropTypes.func,
  mode: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  pickerName: PropTypes.string,
  title: PropTypes.string,
};

export default PopupFooterChangeModeButton;

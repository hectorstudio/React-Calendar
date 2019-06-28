import React from 'react';
import { Popup } from 'semantic-ui-react';
import omit from 'lodash/omit';

const CustomPopup = props => (
  <Popup
    {...omit(props, ['inputType'])}
    flowing
    id="suirCalendarPopup"
    on="click"
    className="suir-calendar popup"
  />
);

export default CustomPopup;

import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';

import { switchMode } from '../actions';
import { colors } from '../constants';

const ModeSwitch = ({ mode, switchMode }) => (
  <Toggle
    onToggle={switchMode}
    toggled={!!mode}
    thumbStyle={{ backgroundColor: colors.planet }}
    trackStyle={{ backgroundColor: colors.planetAccent }}
    thumbSwitchedStyle={{ backgroundColor: colors.moon }}
    trackSwitchedStyle={{ backgroundColor: colors.moonAccent }}
  />
);

const mapStateToProps = ({ gravity: { mode } }) => ({ mode });

const mapDispatchToProps = { switchMode };

export default connect(mapStateToProps, mapDispatchToProps)(ModeSwitch);

import React from 'react';
import {Text, View, Dimensions, Alert} from 'react-native';
import {
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import reloadStyles from '../styles/screen.js';
import ButtonGroup from '../components/ButtonGroup.js';
import ButtonGroupTitle from '../components/ButtonGroupTitle.js';

export default class SettingsScreen extends React.Component {
  componentDidMount() {
    loc(this);
  }

  componentWillUnMount() {
    rol();
  }

  constructor(props) {
    super(props);

    this.state = {
      toasted: 0,
      fails: 0,
    };
    this.screen = {
      angelEyes: 'N/A',
      sentryMode: 'N/A',
      exhaustNoise: 'N/A',
      variableSpeedVolume: 'N/A',
      wireless: 'N/A',
      autolock: 'N/A',
    };
  }

  // Handler for update
  _requestUpdate = async (setting, value) => {
    this.props.postRequest('/settings/' + setting + '/' + value, '');
  };

  updateScreen() {
    this.screen = {
      autolock:
        'mdroid.autolock' in this.props.settings
          ? this.props.settings['mdroid.autolock']
          : 'N/A',
      autosleep:
        'mdroid.autosleep' in this.props.settings
          ? this.props.settings['mdroid.autosleep']
          : 'N/A',
      wireless:
        'components.lte' in this.props.settings
          ? this.props.settings['components.lte']
          : 'N/A',
      cameras:
        'components.cameras' in this.props.settings
          ? this.props.settings['components.cameras']
          : 'N/A',
      angelEyes:
        'components.angel_eyes' in this.props.settings
          ? this.props.settings['components.angel_eyes']
          : 'N/A',
      fullPower:
        'components.usb_hub' in this.props.settings
          ? this.props.settings['components.usb_hub']
          : 'N/A',
      exhaustNoise:
        'enginesound.toggledon' in this.props.settings
          ? this.props.settings['enginesound.toggledon'] == "TRUE" ? "ON" : "OFF" 
          : 'N/A',
      variableSpeedVolume:
        'sound.vsv' in this.props.settings
          ? this.props.settings['sound.vsv']
          : 'N/A',
    };
  }

  render() {
    this.updateScreen();

    // Responsive styling
    var {height, width} = Dimensions.get('window');
    var styles = reloadStyles(height < width, global.isConnected);

    return (
      <View style={styles.screenView}>
        <View style={[styles.largeContainer, styles.colContainer]}>
          <ButtonGroupTitle title="Angel Eyes" />
          <ButtonGroup
            buttons={['Off', 'Auto', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('components.angel_eyes', 'OFF'),
              () => this._requestUpdate('components.angel_eyes', 'AUTO'),
              () => this._requestUpdate('components.angel_eyes', 'ON'),
            ]}
            status={this.screen.angelEyes}
          />

          <ButtonGroupTitle title="Full Power" />
          <ButtonGroup
            buttons={['Off', 'Auto', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('components.usb_hub', 'OFF'),
              () => this._requestUpdate('components.usb_hub', 'AUTO'),
              () => this._requestUpdate('components.usb_hub', 'ON'),
            ]}
            status={this.screen.fullPower}
          />

          <ButtonGroupTitle title="LTE" />
          <ButtonGroup
            buttons={['Off', 'Auto', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('components.lte', 'OFF'),
              () => this._requestUpdate('components.lte', 'AUTO'),
              () => this._requestUpdate('components.lte', 'ON'),
            ]}
            status={this.screen.wireless}
          />

          <ButtonGroupTitle title="Cameras" />
          <ButtonGroup
            buttons={['Off', 'Auto']}
            buttonFunctions={[
              () => this._requestUpdate('components.cameras', 'OFF'),
              () => this._requestUpdate('components.cameras', 'AUTO'),
            ]}
            status={this.screen.cameras}
          />

          <ButtonGroupTitle title="Auto Lock" />
          <ButtonGroup
            buttons={['Off', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('mdroid.autolock', 'OFF'),
              () => this._requestUpdate('mdroid.autolock', 'ON'),
            ]}
            status={this.screen.autolock}
          />

          <ButtonGroupTitle title="Auto Sleep" />
          <ButtonGroup
            buttons={['Off', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('mdroid.autosleep', 'OFF'),
              () => this._requestUpdate('mdroid.autosleep', 'ON'),
            ]}
            status={this.screen.autosleep}
          />

          <ButtonGroupTitle title="Enhanced Exhaust" />
          <ButtonGroup
            buttons={['Off', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('enginesound.toggledon', 'OFF'),
              //() => this._requestUpdate('enginesound.toggledon', 'AUTO'),
              () => this._requestUpdate('enginesound.toggledon', 'ON'),
            ]}
            status={this.screen.exhaustNoise}
          />

          <ButtonGroupTitle title="Variable Speed Volume" />
          <ButtonGroup
            buttons={['Off', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('sound.vsv', 'OFF'),
              () => this._requestUpdate('sound.vsv', 'ON'),
            ]}
            status={this.screen.variableSpeedVolume}
          />
        </View>
      </View>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Composer from './Composer';
import Send from './Send';

export default class InputToolbar extends Component {
  renderActions() {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    }
    return null;
  }

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props}/>;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return (
      <Composer
        {...this.props}
      />
    );
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderActions()}
          {this.renderComposer()}
          {this.renderSend()}
        </View>
        {this.renderAccessory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#b2b2b2',
    backgroundColor: '#d0d3d4',
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
});

InputToolbar.defaultProps = {
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
};

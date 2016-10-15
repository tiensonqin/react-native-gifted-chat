import React, { Component, PropTypes } from 'react';
import {
  Clipboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import ErrorButton from './ErrorButton';
import MessageText from './MessageText';
import MessageImage from './MessageImage';
import Time from './Time';

export default class Bubble extends Component {
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  handleBubbleToNext() {
    if (this.props.isSameUser(this.props.currentMessage, this.props.nextMessage) && this.props.isSameDay(this.props.currentMessage, this.props.nextMessage)) {
      return StyleSheet.flatten([styles[this.props.position].containerToNext, this.props.containerToNextStyle[this.props.position]]);
    }
    return null;
  }

  handleBubbleToPrevious() {
    if (this.props.isSameUser(this.props.currentMessage, this.props.previousMessage) && this.props.isSameDay(this.props.currentMessage, this.props.previousMessage)) {
      return StyleSheet.flatten([styles[this.props.position].containerToPrevious, this.props.containerToPreviousStyle[this.props.position]]);
    }
    return null;
  }

  renderMessageText() {
    if (this.props.currentMessage.text) {
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(this.props);
      }
      return <MessageText {...this.props}/>;
    }
    return null;
  }

  renderMessageImage() {
    if (this.props.currentMessage.image) {
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(this.props);
      }
      return <MessageImage {...this.props}/>;
    }
    return null;
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      if (this.props.renderTime) {
        return this.props.renderTime(this.props);
      }
      return <Time {...this.props}/>;
    }
    return null;
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props);
    }
    return null;
  }

  onLongPress() {
    if (this.props.currentMessage.text) {
      const options = [
        'Copy Text',
        'Cancel',
      ];
      const cancelButtonIndex = options.length - 1;
      this.context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(this.props.currentMessage.text);
            break;
        }
      });
    }
  }

  onMessageLongPress() {
    if (this.props.onMessageLongPress) {
      return () => this.props.onMessageLongPress(this.props);
    }
    return this.onLongPress;
  }

  renderErrorButton() {
        if ((this.props.position === 'right') && (this.props.currentMessage.is_delivered === false)) {
      return (
          <ErrorButton
        onErrorButtonPress={this.props.onErrorButtonPress}
        rowData={this.props.currentMessage}
        styles={{}}
          />
      );
    }
    return null;
  }

  render() {
    return (
        <View style={styles.BubbleContainer}>
        {this.renderErrorButton()}
        <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
        <View style={[styles[this.props.position].wrapper,
                      this.props.wrapperStyle[this.props.position],
                      (((this.props.position === 'right') && (this.props.currentMessage.status === 'ErrorButton')) ? styles[this.props.position].error : null)
                     ]}>
        <TouchableWithoutFeedback
      onLongPress={this.onMessageLongPress()}
        >
        <View>
        {this.renderCustomView()}
      {this.renderMessageImage()}
      {this.renderMessageText()}
      {this.renderTime()}
      </View>
        </TouchableWithoutFeedback>
        </View>
        </View>
        </View>

    );
  }
}

const styles = {
  BubbleContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 7,
      borderBottomLeftRadius: 0,
      backgroundColor: '#FFF',
      marginRight: 60,
      minHeight: 20,
      marginLeft: 10,
      marginBottom: 5,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    error: {
      backgroundColor: '#e01717',
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      marginRight: 10,
      borderRadius: 7,
      borderBottomRightRadius: 0,
      marginBottom: 5,
      backgroundColor: "#DCF8C6",
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
    error: {
      backgroundColor: '#e01717',
    },
  }),
};

Bubble.contextTypes = {
  actionSheet: PropTypes.func,
};

Bubble.defaultProps = {
  containerStyle: {},
  wrapperStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},

  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  renderTime: null,
  isSameUser: () => {},
  isSameDay: () => {},
  position: 'left',
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
};

import React, { Component } from 'react';

import { View, Text, CheckBox } from 'react-native';

export default class Guild extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.guildInfo.name
  });

  state = {
    checked: false
  };

  render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <CheckBox />
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            value={this.state.checked}
            onValueChange={() => this.setState({ checked: !this.state.checked })
            }
          />
          <Text style={{ marginTop: 5 }}> this is checkbox</Text>
        </View>
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
 View, Text, StyleSheet, TouchableOpacity 
} from 'react-native';
import Controller from '../api/controller';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#20232A',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#3498DB',
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 50,
    alignSelf: 'center'
  },
  loginButton: {
    height: 50,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 200
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498DB'
  }
});

export default class Welcome extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    controller: null,
    isLoading: true
  };

  componentDidMount() {
    this.setState({ controller: new Controller() }, () => this.LoadController());
  }

  LoadController = () => {
    this.setState({ isLoading: true });
    this.state.controller.Populate();
    this.setState({ isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return <Text>Carregando</Text>;
    }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Guilds</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.props.navigation.navigate('Login', {
              Controller: this.state.controller
            });
          }}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.props.navigation.navigate('Register', {
              Controller: this.state.controller
            });
          }}
        >
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#20232A',
    alignItems: 'center'
  },
  loginFormText: {
    fontSize: 20,
    color: '#3498DB',
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center'
  },
  inputStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3498DB',
    height: 45,
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    fontSize: 15,
    color: '#C3D2EB',
    backgroundColor: 'transparent',
    padding: 10
  },
  loginContainer: {
    marginTop: 150
  },
  loginButton: {
    borderRadius: 7,
    borderColor: '#3498DB',
    borderWidth: 3,
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonText: {
    fontSize: 25,
    color: '#3498DB',
    fontWeight: 'bold'
  }
});

export default class Login extends Component {
  static navigationOptions = {
    title: 'Cadastro'
  };

  state = {
    isLoading: true,
    controller: null,
    username: '',
    password: ''
  };

  componentDidMount() {
    const { navigation } = this.props;
    const Controller = navigation.getParam('Controller');

    this.setState({ controller: Controller }, () => {
      this.setState({ isLoading: false });
    });
  }

  CreateUser = () => {
    if (this.state.controller.AddUser(this.state.username, 0)) {
      this.props.navigation.navigate('Welcome');
    } else {
      alert(
        'Esse nome de usuário já foi registrado. Por favor escolha outro nome.'
      );
    }
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.main}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginFormText}>Nome de Usuário:</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
            />
            <Text style={styles.loginFormText}>Senha:</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              secureTextEntry
            />
            <TouchableOpacity
              onPress={this.CreateUser}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return <Text>Carregando</Text>;
  }
}

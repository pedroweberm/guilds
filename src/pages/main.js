import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import GuildItem from '../components/guildItem';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#C3D2EB',
    flex: 1
  },
  unloggedContainer: {
    padding: 20,
    marginVertical: 10
  },
  unloggedMessage: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#20232A',
    alignSelf: 'center'
  },
  loginButton: {
    height: 50,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#5ED8FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#20232A'
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5ED8FB'
  }
});

export default class Main extends Component {
  static navigationOptions = {
    title: 'Suas Guilds',
    headerLeft: null
  };

  state = {
    controller: null,
    isLoading: true
  };

  componentDidMount() {
    const { navigation } = this.props;
    const Controller = navigation.getParam('Controller');

    this.setState({ controller: Controller }, () => {
      this.setState({ isLoading: false });
    });
  }

  RenderItem = ({ item }) => {
    const userGuilds = this.state.controller
      .GetUserById(this.state.controller.GetActiveUser())
      .GetPartGuilds();

    if (userGuilds.indexOf(item) !== -1) {
      return (
        <GuildItem guild={item} navigate={this.props.navigation.navigate} />
      );
    }

    return <View />;
  };

  render() {
    if (this.state.isLoading) {
      console.log('Carregando');
      return <Text>Carregando...</Text>;
    }
    if (this.state.controller.GetActiveUser() === -1) {
      return (
        <View style={styles.main}>
          <View style={styles.unloggedContainer}>
            <Text style={styles.unloggedMessage}>
              Efetue o login para continuar
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login', {
                  navi: this.props.navigation
                });
              }}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <ScrollView style={styles.main}>
        <FlatList
          data={this.state.controller.guilds}
          keyExtractor={guild => guild.id.toString()}
          renderItem={this.RenderItem}
        />
      </ScrollView>
    );
  }
}

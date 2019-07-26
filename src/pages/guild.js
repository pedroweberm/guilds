import React, { Component } from 'react';

import {
 View, Text, CheckBox, FlatList, StyleSheet 
} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#C3DBEB'
  },
  checklistColumn: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  checkListRow: {
    flexDirection: 'row'
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 15,
    marginRight: 10,
    color: '#3498db'
  },
  infoFieldText: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    color: '#20232A'
  },
  infoContainer: {
    marginTop: 20,
    padding: 10
  },
  checklistContainer: {
    marginTop: 20,
    padding: 10
  }
});

export default class Guild extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.guildInfo.name
  });

  state = {
    isLoading: true,
    guild: null
  };

  componentDidMount() {
    const { navigation } = this.props;
    const guildInfo = navigation.getParam('guildInfo');

    this.setState({ guild: guildInfo }, () => {
      this.setState({ isLoading: false });
    });
  }

  RenderItem = ({ item }) => (
    <View style={styles.checklistColumn}>
      <View style={styles.checkListRow}>
        <CheckBox
          value={item.checked}
          onChange={() => {
            item.checked = !item.checked;
          }}
        />
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </View>
  );

  render() {
    if (this.state.isLoading) {
      return <Text>Carregando</Text>;
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoFieldText}>
            Moderador: 
{' '}
{this.state.guild.manager.name}
          </Text>
          <Text style={styles.infoFieldText}>
            Próximo encontro: 
{' '}
{this.state.guild.dates[0]}
{" "}
          </Text>
        </View>

        <View style={styles.checklistContainer}>
          <Text style={styles.infoFieldText}>Tópicos:</Text>
          <FlatList
            data={this.state.guild.checklist}
            keyExtractor={listItem => listItem.description}
            renderItem={this.RenderItem}
          />
        </View>
      </View>
    );
  }
}

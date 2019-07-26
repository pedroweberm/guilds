import React, { Component } from 'react';
import {
 View, Text, StyleSheet, TouchableOpacity 
} from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 7,
    backgroundColor: '#20232A'
  },
  guildTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#5ED8FB'
  },
  guildContent: {
    fontSize: 10,
    marginBottom: 5,
    color: '#C3D2EB'
  }
});

const GuildItem = ({ guild, navigate }) => (
  <TouchableOpacity
    onPress={() => {
      navigate('Guild', { guildInfo: guild });
    }}
    style={styles.itemContainer}
  >
    <Text style={styles.guildTitle}>{guild.name}</Text>
    <Text style={styles.guildContent}>
      Moderador: 
{' '}
{guild.manager.GetName()}
    </Text>
    <Text style={styles.guildContent}>
Próximo encontro:
{' '}
{guild.dates[0]}
</Text>
  </TouchableOpacity>
);

export default GuildItem;

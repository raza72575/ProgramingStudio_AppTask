import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Nunito_Bold } from '../../utils/Constraints';
const Header = ({ title, subtitleLine1, subtitleLine2, titleStyle, subtitleStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.subtitle, subtitleStyle]}>
        {subtitleLine1}
        {'\n'}
        {subtitleLine2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    
    fontSize: 40,
    marginBottom: 8,
    color: '#12143D',
  },
  subtitle: {
    fontSize: 16,
    color: '#737373',
    textAlign: 'center',
  },
});

export default Header;

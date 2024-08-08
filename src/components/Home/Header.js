import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
const Header = ({ title, logoSource, logoStyle, titleStyle, containerStyle,secondTitle }) => {
  const navigation = useNavigation(); 

  
  const handleLogoPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={[styles.headerContainer, containerStyle]}>
        <TouchableOpacity onPress={handleLogoPress}>
          {logoSource && <Image source={logoSource} style={[styles.logo, logoStyle]} />}
        </TouchableOpacity>
        {title && <Text style={[styles.headerText, titleStyle]}>{title}</Text>}
      </View>
    {secondTitle && <Text style={styles.apiResultsText}>{secondTitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: "#12143D",
    // fontFamily: 'Nunito-ExtraBold',
    
  
  },
  apiResultsText: {
    marginTop: 10,
    color: '#737373',
    // fontWeight: 'bold',
    fontFamily: 'Nunito-ExtraBold',
  },
});

export default Header;

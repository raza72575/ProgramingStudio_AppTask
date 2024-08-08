import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../global/CustomButton/CustomButton';
import { starIcon, favIcon } from '../../utils/Images';

const HomeCard = ({ albumId, id, title, url }) => (
  <View style={styles.card}>
    <Image resizeMode='contain' source={{ uri: url }} style={styles.image} />

    <View style={styles.textContainer}>
      <Text style={styles.headerText}>AlbumId: {albumId}</Text>
      <Text style={styles.cardText}>Title: {title}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton textColor='black'  leftImage={starIcon}  title={`id${id}`} style={styles.customButton} />
        <TouchableOpacity style={styles.favButton}>
          <Image style={styles.favIcon} resizeMode='contain' source={favIcon} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  headerText:{
     fontSize: 16,
    color: '#12143D',
    marginBottom: 5,
    fontWeight:'bold'
  },
  cardText: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  customButton: {
    marginRight: 10, // Space between button and favorite icon
    borderRadius:12,
    backgroundColor:'#F2F2F2',
    
  },
  favButton: {
    padding: 10, // Add padding for touchable area
  },
  favIcon: {
    width: 20,
    height: 20,
  },
});

export default HomeCard;

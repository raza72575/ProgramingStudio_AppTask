import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const CustomButton = ({
  title,
  onPress,
  backgroundColor = '#007bff',
  textColor = '#ffffff',
  style,
  textStyle,
  enabled = true,
  leftImage,
  rightImage,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: enabled ? backgroundColor : '#d3d3d3' },
        style,
      ]}
      onPress={enabled ? onPress : null}
      disabled={!enabled}
    >
      <View style={styles.buttonContent}>
        {leftImage && <Image source={leftImage} style={styles.image} />}
        <Text style={[styles.buttonText, { color: enabled ? textColor : '#a9a9a9' }, textStyle]}>
          {title}
        </Text>
        {rightImage && <Image source={rightImage} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  image: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
});

export default CustomButton;

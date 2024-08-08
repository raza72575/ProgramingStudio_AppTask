import React from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  containerStyle,
  inputStyle,
  labelStyle,
  leftImage,
  rightImage,
  imageStyle,
  onRightImagePress,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftImage && <Image source={leftImage} style={[styles.image, styles.leftImage, imageStyle]} />}
        <TextInput
          style={[
            styles.input,
            leftImage ? { paddingLeft: 40 } : {},
            rightImage ? { paddingRight: 40 } : {},
            inputStyle
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...rest}
        />
        {rightImage && (
          <TouchableOpacity onPress={onRightImagePress} style={styles.rightImageTouchable}>
            <Image resizeMode='contain' source={rightImage} style={[styles.image, styles.rightImage, imageStyle]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#A6A6A6',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    overflow: 'hidden', 
    borderRadius: 23,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#737373',
  },
  image: {
    width: 20,
    height: 20,
    
  },
  leftImage: {
    left: 10,
    zIndex: 1, 
  },
  rightImage: {
    right: 10,
    zIndex: 1, 
  },
  rightImageTouchable: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
});

export default CustomInput;

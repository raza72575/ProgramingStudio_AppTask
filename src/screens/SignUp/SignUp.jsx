import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/SignUp/Header';
import CustomInput from '../../components/global/CustomInput/CustomInput';
import CustomButton from '../../components/global/CustomButton/CustomButton';
import { unHideIcon, googleIcon, appleIcon, hideIcon } from '../../utils/Images';

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    email: false,
  });

  const navigation = useNavigation();

  const validateForm = () => {
    const { username, password, email } = formState;
    const newErrors = {};

    if (username && !/^[\w\s]+$/.test(username)) newErrors.username = 'Invalid username';
    if(!username){
      newErrors.username="Name*";
    }
    if (!email) {
      newErrors.email = 'Email*';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password*';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    setIsButtonEnabled(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formState, touched]);

  const handleChange = (key, value) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFocus = (key) => {
    setTouched(prevState => ({
      ...prevState,
      [key]: true,
    }));
  };

  const handleSignUp = () => {
    if (isButtonEnabled) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Please fix the errors in the form.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors({});
    }, 3000);

    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title="Sign Up"
        subtitleLine1="Create an account and start"
        subtitleLine2="browsing"
        
       
      />
      {inputConfigs.map(config => (
        <View key={config.key} style={styles.inputContainer}>
          <CustomInput
            label={config.label}
            placeholder={config.placeholder}
            value={formState[config.key]}
            onChangeText={value => handleChange(config.key, value)}
            onFocus={() => handleFocus(config.key)}
            secureTextEntry={config.secureTextEntry && !isPasswordVisible}
            rightImage={config.rightImage && (isPasswordVisible ? hideIcon : unHideIcon)}
            onRightImagePress={config.key === 'password' ? togglePasswordVisibility : undefined}
          />
          {errors[config.key] && <Text style={styles.errorText}>{errors[config.key]}</Text>}
        </View>
      ))}
      <CustomButton
        title="Sign up"
        onPress={handleSignUp}
        backgroundColor="rgba(211, 243, 107, 1)"
        textColor="black"
        style={styles.customButton}
        textStyle={styles.customButtonText}
        enabled={isButtonEnabled}
      />
      <View style={styles.orContainer}>
        <Text style={styles.separatorLeft}>________</Text>
        <Text style={styles.orText}>Or continue with</Text>
        <Text style={styles.separatorRight}>________</Text>
      </View>
      <View style={styles.socialButtonsContainer}>
        <CustomButton
          leftImage={appleIcon}
          title="Apple"
          style={styles.socialButton}
          textColor='#12143D'
        />
        <CustomButton
          leftImage={googleIcon}
          title="Google"
          style={styles.socialButton}
          textColor='#12143D'
        />
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Have An Account?</Text>
        <TouchableOpacity onPress={() => console.log('signin button clicked')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const inputConfigs = [
  {
    label: 'FULL NAME',
    placeholder: 'Abduulrazaq Al Naseer',
    key: 'username',
  },
  {
    label: 'EMAIL',
    placeholder: 'email@gmail.com',
    key: 'email',
  },
  {
    label: 'PASSWORD',
    placeholder: '************',
    key: 'password',
    secureTextEntry: true,
    rightImage: unHideIcon,
  },
];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 15,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  customButton: {
    paddingVertical: 20,
  },
  customButtonText: {
    fontSize: 18,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
  },
  orText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  separatorLeft: {
    color: '#A6A6A6',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: '13%',
    bottom: 5,
  },
  separatorRight: {
    color: '#A6A6A6',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: '13%',
    bottom: 5,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#A6A6A61',
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth:.1,
    borderColor:'#A6A6A6',
    
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  signInText: {
    fontSize: 16,
    color: '#A6A6A6',
  },
  signInLink: {
    fontSize: 16,
    color: '#12143D',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default SignUp;

import {Formik} from 'formik';
import TouchID from 'react-native-touch-id';

import React, {useState, useEffect} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {iconsApp2} from '../../../assets';
import {
  CustomButton,
  Gap,
  HelperText,
  Input,
  LinkComponent,
} from '../../../components';
import {
  getData,
  login,
  loginSchema,
  optionalConfigObject,
  showError,
  showSuccess,
  storeData,
} from '../../../plugins';
import {COLORS, TYPE, windowHeight, windowWidth} from '../../../theme';

type loginUserProps = {
  email: string;
  password: string;
};

function LoginScreen({navigation}: any) {
  const [everLogin, setEverLogin] = useState(false);

  useEffect(() => {
    getData('user').then(res => {
      if (res) {
        console.log('res', res);

        setEverLogin(true);
      } else {
        setEverLogin(false);
      }
    });
  }, []);

  const loginUser = ({email, password}: loginUserProps) => {
    // dispatch(setLoading(true));
    login(email, password)
      .then(() => {
        // dispatch(setLoading(false));
        storeData('user', {email, password});
        navigation.replace('Dashboard');
        showSuccess('Login Success');
      })
      .catch(err => {
        // dispatch(setLoading(false));
        if (err.code === 'auth/invalid-email') {
          showError('That email address is invalid!');
        }
        showError(err.message);
      });
  };

  const onFingerprint = () => {
    TouchID.isSupported(optionalConfigObject).then(biometryType => {
      if (biometryType === 'FaceID') {
        Alert.alert('This device supports FaceID');
      } else {
        TouchID.authenticate('To access your account', optionalConfigObject)
          .then(() => {
            getData('user').then(user => {
              if (user) {
                const users = {
                  email: user.email,
                  password: user.password,
                };
                loginUser(users);
              } else {
                showError('Please Login first');
              }
            });
          })
          .catch((error: any) => {
            showError(error.message);
          });
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Animatable.View
          style={styles.animation}
          animation="fadeInUp"
          delay={1200}>
          <Image style={styles.imageAnimation} source={iconsApp2} />
          <Text style={styles.animationText}>My Pokemon</Text>
        </Animatable.View>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Login</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values => {
              loginUser(values);
            }}
            validationSchema={loginSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <View>
                <Input
                  leftIcon="email"
                  label="Email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}

                <Input
                  label="Password"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  secureTextEntry
                  leftIcon="key"
                />
                {errors.password && touched.password ? (
                  <HelperText text={errors.password} />
                ) : null}

                <View style={styles.linkWrapper}>
                  <LinkComponent
                    title="Forgot Password?"
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                  />
                </View>
                <View style={styles.iconWrapper} />
                <Gap height={30} />
                <View style={styles.buttonLogin}>
                  <CustomButton
                    style={{width: everLogin ? '83%' : '100%'}}
                    type={'primary'}
                    title="Login"
                    onPress={handleSubmit}
                    disable={
                      !(dirty && isValid)
                      // || stateGlobal.isLoading
                    }
                  />
                  {everLogin && (
                    <CustomButton type="icon-button" onPress={onFingerprint} />
                  )}
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },

  linkWrapper: {
    alignItems: 'flex-end',
    marginLeft: windowWidth / 2,
    marginTop: 6,
  },

  buttonLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomView: {
    backgroundColor: COLORS.background.primary,
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  loginText: {
    fontFamily: TYPE.montserratRegular,
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
    color: COLORS.text.primary,
  },

  loginButton: {
    backgroundColor: COLORS.text.secondary,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: COLORS.text.primary,
    fontFamily: TYPE.montserratRegular,
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    fontFamily: TYPE.montserratRegular,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  fpText: {
    marginTop: -10,
    alignSelf: 'flex-end',
    fontFamily: TYPE.montserratRegular,
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  goRegisterWrapper: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerTitle: {
    fontFamily: TYPE.montserratRegular,
    fontSize: 16,
    color: COLORS.text.primary,
  },

  animation: {
    position: 'absolute',
    top: windowHeight * 0.1,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  animationText: {
    color: COLORS.text.tertiary,
    fontFamily: TYPE.montserratRegular,
    textShadowColor: COLORS.border.primary,
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 5},
    fontSize: 30,
    shadowColor: COLORS.background.secondary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  iconWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },

  imageAnimation: {
    width: windowWidth * 0.27,
    height: windowHeight * 0.15,
  },

  errorText: {
    fontFamily: TYPE.montserratMedium,
    color: COLORS.warning,
    fontSize: 12,
  },
});

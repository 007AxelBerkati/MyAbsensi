import {Formik} from 'formik';
import React from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TouchID from 'react-native-touch-id';
import {
  CustomButton,
  Gap,
  HelperText,
  Input,
  LinkComponent,
} from '../../../components';
import {
  getDataSecure,
  loginSchema,
  optionalConfigObject,
  showError,
} from '../../../plugins';
import {
  loginUser,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../reduxx';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../../theme';
import LottieView from 'lottie-react-native';

type loginUserProps = {
  email: string;
  password: string;
};

function LoginScreen({navigation}: any) {
  const dispatch = useAppDispatch();

  const {loading, isLogin} = useAppSelector(
    (state: RootState) => state.dataAuth
  );

  const login = ({email, password}: loginUserProps) => {
    dispatch(loginUser(email, password, navigation));
  };

  const onFingerprint = () => {
    TouchID.isSupported(optionalConfigObject).then(biometryType => {
      if (biometryType === 'FaceID') {
        Alert.alert('This device supports FaceID');
      } else {
        TouchID.authenticate('To access your account', optionalConfigObject)
          .then(() => {
            getDataSecure('userLogin').then(user => {
              if (user) {
                const users = {
                  email: user.email,
                  password: user.password,
                };
                login(users);
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
          <LottieView
            source={{
              uri: 'https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json',
            }}
            autoPlay
            loop
            style={styles.imageAnimation}
          />
          {/* <Text style={styles.animationText}>"Absen Lebih Mudah</Text>
          <Text style={styles.animationText}>Dengan My Absensi"</Text> */}
        </Animatable.View>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Login</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values => {
              login(values);
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
                  color={COLORS.text.tertiary}
                />
                {errors.email && touched.email ? (
                  <HelperText text={errors.email} />
                ) : null}

                <Input
                  label="Password"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  secureTextEntry
                  color={COLORS.text.tertiary}
                  leftIcon="key"
                />
                {errors.password && touched.password ? (
                  <HelperText text={errors.password} />
                ) : null}

                <View style={styles.linkWrapper}>
                  <LinkComponent
                    title="Lupa Password?"
                    onPress={() => navigation.replace('ForgetPass')}
                  />
                </View>
                <View style={styles.iconWrapper} />
                <Gap height={30} />
                <View style={styles.buttonLogin}>
                  <CustomButton
                    style={{width: isLogin ? '83%' : '100%'}}
                    type={'primary'}
                    title={loading ? 'Loading...' : 'Login'}
                    onPress={handleSubmit}
                    disable={!(dirty && isValid) || loading}
                  />
                  {isLogin && (
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
    fontFamily: FONTS.primary[600],
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
    fontFamily: FONTS.primary[600],
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    fontFamily: FONTS.primary[600],
    fontSize: 16,
    color: COLORS.text.primary,
  },
  fpText: {
    marginTop: -10,
    alignSelf: 'flex-end',
    fontFamily: FONTS.primary[600],
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
    fontFamily: FONTS.primary[600],
    fontSize: 16,
    color: COLORS.text.primary,
  },

  animation: {
    position: 'absolute',
    top: windowHeight * 0.05,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  animationText: {
    color: COLORS.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: FONTS.primary[800],
    textShadowColor: COLORS.text.primary,
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 5},
    fontSize: SIZE.font20,
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
    width: windowWidth,
    height: windowHeight * 0.5,
  },

  errorText: {
    fontFamily: FONTS.primary[600],
    color: COLORS.warning,
    fontSize: 12,
  },
});

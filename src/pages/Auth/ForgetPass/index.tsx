import {Formik} from 'formik';

import React from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {IconsApp2} from '../../../assets';
import {
  CustomButton,
  Gap,
  HelperText,
  Input,
  LinkComponent,
} from '../../../components';
import {
  forgetPassword,
  loginSchema,
  showError,
  showSuccess,
} from '../../../plugins';
import {COLORS, FONTS, windowHeight, windowWidth} from '../../../theme';

type ForgetPassProps = {
  email: string;
};

function LoginScreen({navigation}: any) {
  const forgetPass = ({email}: ForgetPassProps) => {
    // dispatch(setLoading(true));
    forgetPassword(email)
      .then(() => {
        // dispatch(setLoading(false));
        showSuccess('Check your email');
      })
      .catch(err => {
        // dispatch(setLoading(false));
        showError(err.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Animatable.View
          style={styles.animation}
          animation="fadeInUp"
          delay={1200}>
          <Image style={styles.imageAnimation} source={IconsApp2} />
        </Animatable.View>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Lupa Password</Text>
          <Formik
            initialValues={{email: ''}}
            onSubmit={values => {
              forgetPass(values);
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

                <View style={styles.linkWrapper}>
                  <LinkComponent
                    title="Kembali Ke Login?"
                    onPress={() => navigation.navigate('Login')}
                  />
                </View>
                <View style={styles.iconWrapper} />
                <Gap height={30} />
                <View style={styles.buttonLogin}>
                  <CustomButton
                    style={{width: '100%'}}
                    type={'primary'}
                    title="Login"
                    onPress={handleSubmit}
                    disable={
                      !(dirty && isValid)
                      // || stateGlobal.isLoading
                    }
                  />
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
    top: windowHeight * 0.1,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  animationText: {
    color: COLORS.text.tertiary,
    fontFamily: FONTS.primary[600],
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
    width: windowWidth * 0.5,
    height: windowHeight * 0.5,
  },

  errorText: {
    fontFamily: FONTS.primary[600],
    color: COLORS.warning,
    fontSize: 12,
  },
});

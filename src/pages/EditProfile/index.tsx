import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import FormData from 'form-data';

import {Headers, Input2, Profile, Gap, Select} from '../../components';
import {kota} from '../../assets';
import {
  COLORS,
  FONTS,
  RADIUS,
  SIZE,
  windowHeight,
  windowWidth,
} from '../../theme';

function ProfileScreen({navigation}: any) {
  const [photo, setPhoto] = useState(dataProfile.image_url);

  const updateProfile = data => {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    formData.append('city', data.city);
    formData.append('address', data.address);
    formData.append('phone_number', data.phone_number);
    formData.append('image', {
      uri: data.image.uri,
      type: 'image/jpeg',
      name: data.image.filename,
    });
    dispatch(putDataProfile(formData, navigation));
  };

  return (
    <View style={styles.pages}>
      <View>
        <Headers
          title="Lengkapi Info Akun"
          type="back-title"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Formik
        initialValues={{
          full_name: dataProfile.full_name,
          city: dataProfile.city,
          address: dataProfile.address,
          phone_number: dataProfile.phone_number,
          image: dataProfile.image_url,
        }}
        onSubmit={values => updateProfile(values)}
        validationSchema={updateProfileSchema}>
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          handleBlur,
          touched,
          setFieldValue,
          isValid,
        }) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View>
                <View style={styles.photo}>
                  <Profile
                    source={{uri: photo}}
                    isRemove
                    onPress={() => getImage(setFieldValue, setPhoto)}
                  />
                </View>
                <Input2
                  leftIcon="account-circle"
                  label="Nama"
                  onChangeText={handleChange('full_name')}
                  value={values.full_name}
                  onBlur={handleBlur('full_name')}
                />
                {errors.full_name && touched.full_name && (
                  <Text style={styles.errorText}>{errors.full_name}</Text>
                )}
                <Gap height={15} />

                <Select
                  data={kota}
                  onSelect={selectedItem => {
                    // eslint-disable-next-line no-param-reassign
                    values.city = selectedItem;
                  }}
                  defaultValue={values.city}
                />
                {errors.city && touched.city && (
                  <Text style={styles.errorText}>{errors.city}</Text>
                )}
                <Gap height={15} />
                <Input2
                  leftIcon="map-marker"
                  label="Alamat"
                  onChangeText={handleChange('address')}
                  value={values.address}
                  onBlur={handleBlur('address')}
                  multiline
                  numberOfLines={4}
                />
                {errors.address && touched.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}
                <Gap height={15} />
                <Input2
                  leftIcon="phone"
                  label="Nomor Telepon +62"
                  onChangeText={handleChange('phone_number')}
                  value={values.phone_number}
                  onBlur={handleBlur('phone_number')}
                />
                {errors.phone_number && touched.phone_number && (
                  <Text style={styles.errorText}>{errors.phone_number}</Text>
                )}
                <Gap height={windowHeight * 0.05} />
                <ButtonComponent
                  title="Simpan"
                  onPress={handleSubmit}
                  // disable={!isValid || stateGlobal.isLoading}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
  },
  input1: {
    borderWidth: 1,
    height: 50,
    width: windowWidth * 0.93,
    borderRadius: RADIUS.large,
  },

  text: {
    fontSize: SIZE.font24,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
  },
  city: {
    borderWidth: 1,
    borderRadius: RADIUS.large,
    marginTop: 15,
  },
  photo: {
    marginTop: windowHeight * 0.04,
  },
  errorText: {
    fontFamily: FONTS.primary[400],
    color: COLORS.warning,
    fontSize: SIZE.font14,
  },
});

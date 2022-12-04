import {Formik} from 'formik';
import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import moment from 'moment';
import {DatePickerModal} from 'react-native-paper-dates';
import {
  CustomButton,
  Gap,
  Headers,
  Input2,
  Select2,
  HelperText,
  Profile,
} from '../../components';
import {getData, updateProfileSchema} from '../../plugins';
import {getImage} from '../../plugins/imagePicker';
import {updateAkun, useAppDispatch, useAppSelector} from '../../reduxx';
import {
  COLORS,
  FONTS,
  RADIUS,
  SIZE,
  windowHeight,
  windowWidth,
} from '../../theme';
import FastImage from 'react-native-fast-image';
import {ILNullPhoto} from '../../assets';

function EditProfile({navigation}: any) {
  const {data, loading} = useAppSelector(state => state.dataAkun);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const updateProfile = (value: any) => {
    getData('user').then((res: any) => {
      dispatch(updateAkun(res.uid, value, navigation));
    });
  };

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params: any, setFieldValue: any) => {
      setOpen(false);
      setDate(params.date);
      setFieldValue('birth_date', moment(params.date).format('DD/MM/YYYY'));
    },
    [setOpen, setDate]
  );

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
          fullname: data?.fullname,
          birth_date: data?.birth_date,
          address: data?.address,
          phone_number: data?.phone_number,
          photo: data?.photo ? data?.photo : ILNullPhoto,
          tempat_lahir: data?.tempat_lahir,
          email: data?.email,
          pekerjaan: data?.pekerjaan,
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
                    source={values.photo}
                    isRemove
                    onPress={() => getImage(setFieldValue)}
                  />
                </View>
                <Input2
                  label="Nama"
                  onChangeText={handleChange('fullname')}
                  value={values.fullname}
                  onBlur={handleBlur('fullname')}
                />
                {errors.fullname && touched.fullname ? (
                  <HelperText text={errors.fullname} />
                ) : null}
                <Gap height={15} />

                <Input2 label="Pekerjaan" value={values.pekerjaan} disabled />

                <Gap height={15} />

                <Input2
                  value={values.birth_date}
                  label="Tanggal Lahir (DD/MM/YYYY)"
                  rightIcon="calendar"
                  onPressIn={() => setOpen(true)}
                />
                <DatePickerModal
                  locale="id"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={() => onConfirmSingle({date}, setFieldValue)}
                  startYear={1960} // optional, default is 1800
                  endYear={2100} // optional, default is 2200

                  // onChange={} // same props as onConfirm but triggered without confirmed by user
                  // saveLabel="Save" // optional
                  // saveLabelDisabled={true} // optional, default is false
                  // uppercase={false} // optional, default is true
                  // label="Select date" // optional
                  // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                  // closeIcon="close" // optional, default is "close"
                  // editIcon="pencil" // optional, default is "pencil"
                  // calendarIcon="calendar" // optional, default is "calendar"
                />
                {errors.birth_date && touched.birth_date && (
                  <HelperText text={errors.birth_date} />
                )}
                <Gap height={15} />
                <Input2
                  leftIcon="account-circle"
                  label="Tempat Lahir"
                  onChangeText={handleChange('tempat_lahir')}
                  value={values.tempat_lahir}
                  onBlur={handleBlur('tempat_lahir')}
                />
                {errors.tempat_lahir && touched.tempat_lahir && (
                  <HelperText text={errors.tempat_lahir} />
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
                  <HelperText text={errors.address} />
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
                  <HelperText text={errors.phone_number} />
                )}
                <Gap height={15} />

                <Input2 label="Email" value={values.email} disabled />

                <Gap height={windowHeight * 0.05} />

                <CustomButton
                  title="Simpan"
                  onPress={handleSubmit}
                  disable={!isValid || loading}
                />
                <Gap height={windowHeight * 0.05} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 16,
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

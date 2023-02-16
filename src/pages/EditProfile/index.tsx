import {Formik} from 'formik';
import React, {useCallback, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import moment from 'moment';
import {DatePickerModal} from 'react-native-paper-dates';
import {Bg, ILNullPhoto} from '../../assets';
import {
  CustomButton,
  Gap,
  Headers,
  HelperText,
  Input2,
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

function EditProfile({navigation}: any) {
  const {dataAkun, loading} = useAppSelector(state => state.dataAkun);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params: any, setFieldValue: any) => {
      setOpen(false);
      console.log(params);

      setDate(params.date);
      setFieldValue('birth_date', moment(params.date).format('DD/MM/YYYY'));
    },
    [setOpen, setDate]
  );

  return (
    <ImageBackground source={Bg} style={{flex: 1}}>
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
            fullname: dataAkun?.fullname,
            birth_date: dataAkun?.birth_date,
            address: dataAkun?.address,
            phone_number: dataAkun?.phone_number,
            photo: dataAkun?.photo ? dataAkun?.photo : '',
            tempat_lahir: dataAkun?.tempat_lahir,
            email: dataAkun?.email,
            pekerjaan: dataAkun?.pekerjaan,
          }}
          onSubmit={(values: any) => {
            dispatch(updateAkun(dataAkun.uid, values, navigation));
          }}
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
                      source={values?.photo ? {uri: values.photo} : ILNullPhoto}
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
                    onChangeText={handleChange('birth_date')}
                    onPressIn={() => setOpen(true)}
                  />
                  <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={open}
                    onDismiss={onDismissSingle}
                    date={date}
                    onConfirm={date => onConfirmSingle(date, setFieldValue)}
                    startYear={1960} // optional, default is 1800
                    endYear={2100} // optional, default is 2200
                    label="Pilih Tanggal" // optional
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
                    onPress={() => {
                      handleSubmit();
                    }}
                    disable={!isValid || loading}
                  />
                  <Gap height={windowHeight * 0.05} />
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          )}
        </Formik>
      </View>
    </ImageBackground>
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

import {Formik} from 'formik';
import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import moment from 'moment';
import {CustomButton, Gap, Headers, Input2} from '../../components';
import {getData, updateProfileSchema} from '../../plugins';
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
  const {data, loading} = useAppSelector(state => state.dataAkun);
  const [photo, setPhoto] = useState(data?.photo);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const updateProfile = (value: any) => {
    console.log(value);

    getData('user').then((res: any) => {
      dispatch(updateAkun(res.uid, value));
    });
  };

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
          image: data?.image_url,
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
                    source={{uri: photo}}
                    isRemove
                    onPress={() => getImage(setFieldValue, setPhoto)}
                  />
                </View>
                <Input2
                  label="Nama"
                  onChangeText={handleChange('fullname')}
                  value={values.fullname}
                  onBlur={handleBlur('fullname')}
                />
                {errors.fullname && touched.fullname && (
                  <Text style={styles.errorText}>{errors.fullname}</Text>
                )}
                <Gap height={15} />

                <Select2
                  data={[
                    {label: 'Laki-laki', value: 'Laki-laki'},
                    {label: 'Perempuan', value: 'Perempuan'},
                  ]}
                  setFieldValue={setFieldValue}
                  value={values.pekerjaan}
                  initialData={values.pekerjaan}
                  schema={{
                    label: 'label',
                    value: 'value',
                  }}
                  mode="BADGE"
                  name="pekerjaan"
                  placeholder="Pilih Pekerjaan"
                />
                {errors.pekerjaan && touched.pekerjaan && (
                  <Text style={styles.errorText}>{errors.pekerjaan}</Text>
                )}
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
                  <Text style={styles.errorText}>{errors.birth_date}</Text>
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
                  <Text style={styles.errorText}>{errors.tempat_lahir}</Text>
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
                <Gap height={15} />

                <Input2 label="Email" value={values.email} disabled />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
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

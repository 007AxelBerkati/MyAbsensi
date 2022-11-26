import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {COLORS, FONTS} from '../../theme';

type Props = {};

const PermintaanIzin = ({}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Formik
        initialValues={{
          fullname: data?.fullname,
          birth_date: data?.birth_date,
          address: data?.address,
          phone_number: data?.phone_number,
          photo: data?.photo,
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
                    source={{uri: values.photo}}
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
                  <HelperText text={errors.pekerjaan} />
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
                {errors.email && touched.email && (
                  <HelperText text={errors.email} />
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
    </TouchableWithoutFeedback>
  );
};

export default PermintaanIzin;

const styles = StyleSheet.create({});

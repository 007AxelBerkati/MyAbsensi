import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {COLORS, FONTS, SIZE, windowHeight} from '../../theme';
import {databaseRef, getData, getImage, requestSchema} from '../../plugins';
import {
  CustomButton,
  Gap,
  HelperText,
  Input2,
  Select2,
  UploadPhoto,
} from '../../components';
import moment from 'moment';
import {setNotif, setRequest, useAppDispatch} from '../../reduxx';
import uuid from 'react-native-uuid';

const PermintaanIzin = (handleClosePress: any) => {
  const dispatch = useAppDispatch();

  const reqIzin = ({alasan, photo, jenis_izin}: any) => {
    getData('user').then((res: any) => {
      const bodyId = uuid.v4();
      const dataNotif = {
        uid: bodyId,
        id_user: res.uid,
        fullname: res.fullname,
        alasan,
        photo,
        jenis_izin,
        status: 'pending',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        isRead: false,
      };

      dispatch(setNotif(res.uid, dataNotif, bodyId));

      const dataReq = {
        id_user: res.uid,
        fullname: res.fullname,
        alasan,
        photo,
        jenis_izin,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        status: 'pending',
      };

      // dispatch(setRequest(res.uid, dataReq));
      handleClosePress;
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Formik
        initialValues={{
          alasan: '',
          photo: '',
          jenis_izin: '',
        }}
        onSubmit={values => reqIzin(values)}
        validationSchema={requestSchema}>
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          handleBlur,
          touched,
          setFieldValue,
          isValid,
          dirty,
        }) => (
          <ScrollView style={{padding: 16}}>
            <Text
              style={{
                color: COLORS.text.primary,
                fontFamily: FONTS.primary[600],
                fontSize: SIZE.font20,
              }}>
              Masukan Harga Tawarmu
            </Text>
            <Select2
              data={[
                {label: 'Izin', value: 'Izin'},
                {label: 'Sakit', value: 'Sakit'},
                {label: 'Cuti', value: 'Cuti'},
              ]}
              setFieldValue={setFieldValue}
              value={values.jenis_izin}
              initialData={values.jenis_izin}
              schema={{
                label: 'label',
                value: 'value',
              }}
              mode="BADGE"
              name="jenis_izin"
              placeholder="Pilih Jenis Izin"
            />
            {errors.jenis_izin && touched.jenis_izin && (
              <HelperText text={errors.jenis_izin} />
            )}
            <Gap height={15} />

            <Input2
              label="Alasan"
              onChangeText={handleChange('alasan')}
              value={values.alasan}
              onBlur={handleBlur('alasan')}
              multiline
              numberOfLines={4}
            />
            {errors.alasan && touched.alasan ? (
              <HelperText text={errors.alasan} />
            ) : null}
            <Gap height={15} />

            <UploadPhoto
              label="Bukti Foto jika ada"
              source={{uri: values.photo}}
              onPress={() => getImage(setFieldValue)}
            />

            <Gap height={windowHeight * 0.05} />

            <View
              style={{position: 'absolute', bottom: 0, left: 16, right: 16}}>
              <CustomButton
                title="Simpan"
                onPress={handleSubmit}
                // disable={!isValid || loading}
                disable={!isValid || !dirty}
              />
            </View>
            <Gap height={windowHeight * 0.05} />
          </ScrollView>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  );
};

export default PermintaanIzin;

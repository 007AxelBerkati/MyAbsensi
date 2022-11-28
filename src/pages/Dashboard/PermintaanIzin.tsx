import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {memo} from 'react';
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
import {
  RootState,
  setNotif,
  setRequest,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import uuid from 'react-native-uuid';

const PermintaanIzin = ({handleCloseSheet, isRequestPending}: any) => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector((state: RootState) => state.dataRequest);

  const reqIzin = ({alasan, photo, jenis_izin}: any) => {
    getData('user').then((res: any) => {
      const bodyId = uuid.v4();
      const dataNotif = {
        uid: bodyId,
        id_user: res.uid,
        fullname: res.fullname,
        alasan,
        photo,
        photoUser: res.photo,
        jenis_izin,
        status: 'pending',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        isRead: false,
      };

      dispatch(setNotif(res.uid, dataNotif, bodyId));

      const dataReq = {
        uid: bodyId,
        id_user: res.uid,
        fullname: res.fullname,
        alasan,
        photo,
        photoUser: res.photo,
        jenis_izin,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        status: 'pending',
      };

      dispatch(setRequest(res.uid, dataReq));
      handleCloseSheet();
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
        onSubmit={(values, {resetForm}) => {
          reqIzin(values);
          resetForm();
        }}
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
                marginBottom: 16,
              }}>
              Masukan Form Izin
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
              source={values.photo ? {uri: values.photo} : null}
              onPress={() => getImage(setFieldValue)}
            />

            <Gap height={windowHeight * 0.05} />
            <View
              style={{position: 'absolute', bottom: 0, left: 16, right: 16}}>
              <CustomButton
                title={
                  isRequestPending
                    ? 'Telah mengajukan izin'
                    : loading
                    ? 'Loading...'
                    : 'Ajukan Izin'
                }
                onPress={handleSubmit}
                disable={!isValid || !dirty || loading || isRequestPending}
              />
            </View>
            <Gap height={windowHeight * 0.05} />
          </ScrollView>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  );
};

export default memo(PermintaanIzin);

import {Formik} from 'formik';
import moment from 'moment';
import React, {memo} from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {
  CustomButton,
  Gap,
  HelperText,
  Input2,
  Select2,
  UploadPhoto,
} from '../../components';
import {getData, getImage, requestSchema} from '../../plugins';
import {
  getNotif,
  getRequest,
  RootState,
  setNotif,
  setRequest,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';

import {COLORS, FONTS, SIZE, windowHeight} from '../../theme';

const PermintaanIzin = ({handleCloseSheet, isRequestPending}: any) => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector((state: RootState) => state.dataRequest);
  const {dataPresence, bisaIzin} = useAppSelector(
    (state: RootState) => state.dataPresence
  );

  const reqIzin = ({alasan, photo, jenis_izin}: any) => {
    getData('user').then((res: any) => {
      const bodyId = uuid.v4();
      const dataNotif = {
        uid: bodyId,
        id_user: res.uid,
        fullname: res.fullname,
        alasan,
        photo: photo ? photo : null,
        photoUser: res.photo ? res.photo : null,
        jenis_izin,
        status: 'pending',
        createdAt: moment().format(''),
        updatedAt: moment().format(''),
        isRead: false,
      };

      dispatch(setNotif(res.uid, dataNotif, bodyId));

      const dataReq = {
        uid: bodyId,
        id_user: res.uid,
        fullname: res.fullname,
        alasan,
        photo: photo ? photo : null,
        photoUser: res.photo ? res.photo : null,
        jenis_izin,
        createdAt: moment().format(''),
        updatedAt: moment().format(''),
        status: 'pending',
        isRead: false,
      };

      dispatch(setRequest(res.uid, dataReq));
      dispatch(getRequest(res.uid));
      dispatch(getNotif(res.uid));
      handleCloseSheet();
    });
  };

  const renderTitleIzin = () => {
    if (isRequestPending) {
      return 'Telah mengajukan izin';
    } else if (loading) {
      return 'Loading...';
    } else if (dataPresence) {
      return 'Anda tidak bisa mengajukan izin, jika telah absen';
    } else if (moment().day() === 0) {
      return 'Anda tidak bisa mengajukan izin, jika hari minggu';
    } else if (!bisaIzin) {
      return 'Telah izin 2 kali berturut-turut';
    } else {
      return 'Ajukan Izin';
    }
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
                {label: 'Dinas Luar', value: 'Dinas'},
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
                title={renderTitleIzin()}
                onPress={handleSubmit}
                disable={
                  loading ||
                  isRequestPending ||
                  !!dataPresence ||
                  moment().day() === 0 ||
                  !bisaIzin
                }
              />
            </View>
            <Gap height={windowHeight * 0.1} />
          </ScrollView>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  );
};

export default memo(PermintaanIzin);

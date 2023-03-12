import BottomSheet from '@gorhom/bottom-sheet';
import {Formik} from 'formik';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import 'moment/locale/id';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import BackgroundService from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Dialog, Modal, Portal, Provider, Text} from 'react-native-paper';
import TouchID from 'react-native-touch-id';
import {Bg, ILNullPhoto} from '../../assets';

import Holiday from 'date-holidays';
import {
  BackDropComponent,
  CardCircle,
  CardDashboard,
  CardProfile,
  CardService,
  CustomButton,
  Gap,
  HelperText,
  Input,
  Loading,
} from '../../components';
import {
  getData,
  getDataSecure,
  loginSchema,
  optionalConfigObject,
  showError,
  showInfo,
  trackingLocationRef,
} from '../../plugins';
import {
  absen,
  checkDataIzin,
  getAkun,
  getDataSetting,
  getLocation,
  getLocationPresence,
  getNotif,
  getPresence,
  getRequest,
  RootState,
  setPresence,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {
  COLORS,
  FONTS,
  RADIUS,
  SIZE,
  windowHeight,
  windowWidth,
} from '../../theme';
import PermintaanIzin from './PermintaanIzin';

const Dashboard = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const [currTime, setCurrTime] = useState(moment());
  const [isLoadingPresence, setIsLoadingPresence] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isInfoAbsen, setIsInfoAbsen] = useState(false);
  const [isTimeForPresence, setIsTimeForPresence] = useState(false);
  const [titlePresence, setTitlePresence] = useState('wait');
  const [refreshing, setRefreshing] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const {isRequestPending, loading} = useAppSelector(
    (state: RootState) => state.dataRequest
  );
  const {dataSetting} = useAppSelector((state: RootState) => state.dataSetting);
  const {location, distance, locationPresence, isMocked} = useAppSelector(
    (state: RootState) => state.dataLocation
  );
  const {dataAkun} = useAppSelector((state: RootState) => state.dataAkun);
  const {presence, dataPresence} = useAppSelector(
    (state: RootState) => state.dataPresence
  );
  const {dataLogin} = useAppSelector((state: RootState) => state.dataAuth);

  const newHD = new Holiday('ID');

  const dataForPresence = () => {
    const lat = location.latitude;
    const long = location.longitude;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`
    )
      .then(response => response.json())
      .then(async dataLocation => {
        const dataAbsen = {
          address: dataLocation.display_name,
          date: moment().format(),
          distance: distance,
          in_area: distance <= 0.005 ? true : false,
          latitude: location.latitude,
          longitude: location.longitude,
        };
        const dataUser = {
          fullname: dataAkun.fullname,
          email: dataAkun.email,
          birth_date: dataAkun.birth_date,
          phone_number: dataAkun.phone_number,
          tempat_lahir: dataAkun.tempat_lahir,
          address: dataAkun.address,
          photo: dataAkun.photo || null,
          role: dataAkun.role,
          pekerjaan: dataAkun.pekerjaan,
        };
        await dispatch(absen(dataAkun.uid, dataAbsen, dataUser, dataSetting));
        dispatch(getPresence(dataAkun.uid));
      });
  };

  const attendance = async () => {
    setIsLoadingPresence(true);
    try {
      if (isMocked) {
        setIsDialogVisible(true);
      } else {
        if (presence === 'alreadyPresence') {
          showInfo('You have already checked in today', () => {});
        } else {
          if (
            dataAkun.address &&
            dataAkun.birth_date &&
            dataAkun.phone_number &&
            dataAkun.tempat_lahir
          ) {
            TouchID.isSupported(optionalConfigObject)
              .then(biometryType => {
                if (biometryType === 'FaceID') {
                  Alert.alert('This device supports FaceID');
                } else {
                  TouchID.authenticate('Lakukan Absen', optionalConfigObject)
                    .then(() => {
                      dataForPresence();
                      dispatch(getPresence(dataAkun.uid));
                    })
                    .catch((error: any) => {
                      showError(error.message);
                    });
                }
              })
              .catch(err => {
                showInfo(
                  'Device Tidak Support Touch Id, Silahkan login dengan mengisikan akun dan password anda',
                  () => {}
                );
                setisModalVisible(true);
              });
          } else {
            Alert.alert(
              'Profile data is incomplete',
              'Please complete your profile data first',
              [
                {text: 'No', style: 'cancel'},
                {
                  text: 'Update Profile',
                  onPress: () => navigation.navigate('EditProfile'),
                },
              ],
              {cancelable: false}
            );
          }
        }
      }
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsLoadingPresence(false);
    }
  };

  const renderInfoAttendance = useCallback(() => {
    if (presence === 'keluar' || presence === 'alreadyPresence') {
      return (
        <View style={styles.service}>
          <CardService
            icon="clock-in"
            title="Absen Masuk"
            clock={
              dataPresence?.masuk?.date
                ? moment(dataPresence.masuk.date).format('HH:mm')
                : '--:--'
            }
          />
          <CardService
            icon="clock-out"
            title="Absen Keluar"
            clock={
              dataPresence?.keluar?.date
                ? moment(dataPresence.keluar.date).format('HH:mm')
                : '--:--'
            }
          />
          <CardService
            icon="clock-check"
            title="Jam Pulang"
            clock={dataSetting?.batasPulang || '--:--'}
          />
        </View>
      );
    }
  }, [presence]);

  const renderInfoAttendanceMemo = useMemo(() => {
    return renderInfoAttendance();
  }, [renderInfoAttendance]);

  const renderTitlePresence = () => {
    if (titlePresence) {
      if (titlePresence === 'minggu') {
        return 'Tidak Ada Absen';
      }
      if (titlePresence === 'notInLocation') {
        return 'Tidak berada di lokasi';
      }
      if (titlePresence === 'libur') {
        return 'Libur';
      }
    } else {
      if (presence === 'masuk') {
        return 'Absen Masuk';
      }
      if (presence === 'keluar') {
        return 'Absen Keluar';
      }
      if (presence === 'alreadyPresence') {
        return 'Anda sudah absen';
      }
      if (presence === 'izin') {
        return 'Anda Telah Izin';
      } else {
        return 'Tunggu Sebentar';
      }
    }
  };

  const renderTitlePresenceMemo = useMemo(() => {
    return renderTitlePresence();
  }, [presence, titlePresence]);

  // code to handle bottom sheet for dashboard
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  const handleOpenPress = useCallback(
    (index: any) => bottomSheetRef?.current?.snapToIndex(index),
    []
  );
  const handleClosePress = useCallback(
    () => bottomSheetRef?.current?.snapToIndex(0),
    []
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // to get current time for realtime clock to show in UI dashboard every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // function to wait
  const sleep = (time: any) =>
    new Promise((resolve: any) => setTimeout(() => resolve(), time));

  // function to get current location of user and update it in firestore (realtime location tracking, every 15 minutes)
  const trackLocation = async () => {
    await new Promise(async () => {
      for (let i = 1; BackgroundService.isRunning(); i++) {
        try {
          await Geolocation.getCurrentPosition(
            async position => {
              await trackingLocationRef()
                .doc(dataLogin.uid)
                .set({
                  fullname: dataLogin.fullname,
                  pekerjaan: dataLogin.pekerjaan,
                  role: dataLogin.role,
                  photo: dataLogin.photo || null,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  date: moment().format(),
                });
            },
            error => {
              console.log('failed to get location', error);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 1000,
            }
          );
        } catch (error) {
          // console.log(error);
        }
        await sleep(900000);
      }
    });
  };
  const options = {
    taskName: 'Live Tracking Location',
    taskTitle: 'Cek Lokasi',
    taskDesc: 'Tolong nyalakan GPS anda untuk cek lokasi anda',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    // linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
      delay: 900000,
    },
  };
  const startTask = async () => {
    await BackgroundService.start(trackLocation, options);
  };

  // to get data user, request, notif, and setting in first time render in dashboard
  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getAkun(res.uid));
      dispatch(getRequest(res.uid));
      dispatch(getNotif(res.uid));
      dispatch(getDataSetting());
      startTask();
      dispatch(getLocationPresence());
      dispatch(checkDataIzin(res.uid));
    });
  }, []);

  const checkBatasJamAbsen = () => {
    try {
      const mulaiJamMasuk = moment(dataSetting?.mulaiMasuk, 'HH:mm');
      const batasJamMasuk = moment(dataSetting?.batasMasuk, 'HH:mm');
      const mulaiJamPulang = moment(dataSetting?.mulaiPulang, 'HH:mm');
      const batasJamPulang = moment(dataSetting?.batasPulang, 'HH:mm');

      // If it's Sunday then set isTimeForPresence to false and titlePresence to "minggu"
      if (moment(currTime).day() === 0) {
        setIsTimeForPresence(false);
        setTitlePresence('minggu');
        return;
      } else if (newHD.isHoliday(new Date())) {
        setIsTimeForPresence(false);
        setTitlePresence('libur');
        return;
      } else if (dataPresence?.status) {
        setIsTimeForPresence(false);
        dispatch(setPresence('izin'));
        return;
      }

      // If user has a status set to izin then set isTimeForPresence to false

      // If user already clocked in then set isTimeForPresence false and set status as keluar
      if (dataPresence?.masuk) {
        setIsTimeForPresence(false);
        dispatch(setPresence('keluar'));
      } else {
        // If current time is between start and end of check-in time
        if (currTime.isBetween(mulaiJamMasuk, batasJamMasuk)) {
          dispatch(setPresence('masuk'));
          // If user is too far from location then set isTimeForPresence to false and titlePresence as "notInLocation"
          if (distance > 0.005) {
            setIsTimeForPresence(false);
            setTitlePresence('notInLocation');
            return;
          }
          setIsTimeForPresence(true);
        }
      }

      // If user already clocked out then set isTimeForPresence false and set status as alreadyPresence
      if (dataPresence?.keluar) {
        setIsTimeForPresence(false);
        dispatch(setPresence('alreadyPresence'));
        setIsTimeForPresence(true);
      } else {
        //If current time is between start and end of checkout time
        if (currTime.isBetween(mulaiJamPulang, batasJamPulang)) {
          dispatch(setPresence('keluar'));
          // If user is too far from location then set isTimeForPresence to false and titlePresence as "notInLocation"
          if (distance > 0.005) {
            setIsTimeForPresence(false);
            setTitlePresence('notInLocation');
            return;
          }
          setIsTimeForPresence(true);
        }
      }

      // Finally set titlePresence empty
      setTitlePresence('');
    } catch {
      console.log('error');
    }
  };
  // to get data presence
  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getPresence(res.uid));
      checkBatasJamAbsen();
    });
  }, []);

  // to get distance and data location
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getLocation(locationPresence));
      checkBatasJamAbsen();
    }, 1000);
    return () => clearInterval(interval);
  }, [location]);

  if (loading) {
    return <Loading type="full" />;
  }

  return (
    <Provider>
      <Portal>
        <GestureHandlerRootView style={styles.page}>
          <ImageBackground source={Bg} style={{flex: 1}}>
            <ScrollView
              style={{paddingHorizontal: 16}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    setRefreshing(true);
                    dispatch(getRequest(dataAkun.uid));
                    dispatch(getNotif(dataAkun.uid));
                    dispatch(getDataSetting());
                    dispatch(getPresence(dataAkun.uid));
                    checkBatasJamAbsen();
                    setRefreshing(false);
                  }}
                />
              }>
              <CardProfile
                name={dataAkun?.fullname}
                title="Selamat Datang, "
                photo={dataAkun?.photo ? {uri: dataAkun?.photo} : ILNullPhoto}
              />
              <View style={styles.cardAbsen}>
                <Gap height={10} />
                <Text style={styles.hourMinutes}>
                  {currTime.format('HH:mm')}
                </Text>
                <Text style={styles.date}>
                  {currTime.format('dddd, DD MMM YYYY')}
                </Text>
                <Gap height={10} />
                <View style={styles.cardDashboard}>
                  <CardDashboard
                    title="Jarak Sekolah"
                    text={
                      isNaN(distance)
                        ? 'wait'
                        : distance.toFixed(3).toString() + ' KM'
                    }
                    onPress={() =>
                      showInfo(
                        distance <= 0.005
                          ? 'Anda sudah berada di titik absensi'
                          : 'Anda belum di titik lokasi absensi',
                        () => {}
                      )
                    }
                  />
                  <CardDashboard
                    type="maps"
                    text="Buka Maps"
                    onPress={() =>
                      navigation.navigate('Location', {locationPresence})
                    }
                  />
                </View>
                <Gap height={20} />
                <CardCircle
                  icon="fingerprint"
                  title={
                    isLoadingPresence ? 'Loading...' : renderTitlePresenceMemo
                  }
                  absen={presence}
                  disable={isLoadingPresence || isTimeForPresence === false}
                  onPress={async () => {
                    attendance();
                  }}
                />
              </View>
              <Gap height={20} />
              {renderInfoAttendanceMemo}
              <View style={styles.service}>
                <CardService
                  icon="book-open-page-variant-outline"
                  title="Ijin Tidak Hadir"
                  onPress={() => {
                    handleOpenPress(1);
                  }}
                />
                <CardService
                  icon="history"
                  title="Lihat History"
                  onPress={() => {
                    navigation.navigate('Riwayat', {uid: dataAkun?.uid});
                  }}
                />
                <CardService
                  icon="clock"
                  title="Info Absen"
                  onPress={() => {
                    setIsInfoAbsen(true);
                    setisModalVisible(true);
                  }}
                />
              </View>

              <Gap height={40} />
            </ScrollView>
            <BottomSheet
              enablePanDownToClose
              enableContentPanningGesture
              enableHandlePanningGesture
              animateOnMount
              enableOverDrag
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              backdropComponent={BackDropComponent}
              onChange={handleSheetChanges}>
              <PermintaanIzin
                handleCloseSheet={handleClosePress}
                isRequestPending={isRequestPending}
              />
            </BottomSheet>
          </ImageBackground>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}
            style={styles.dialog}>
            <Dialog.Title style={{textAlign: 'center'}}>
              Peringatan!!!
            </Dialog.Title>
            <Dialog.Content>
              <LottieView
                source={{
                  uri: 'https://assets10.lottiefiles.com/packages/lf20_svy4ivvy.json',
                }}
                autoPlay
                loop
                style={styles.imageAnimation}
              />
              <Text style={styles.textDialog}>
                Perangkat device terdeteksi menggunakan GPS palsu, Tolong
                matikan GPS palsu Anda
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={{alignSelf: 'center', marginBottom: 20}}>
              <CustomButton
                onPress={() => setIsDialogVisible(false)}
                type={'primary'}
                title={'Okay'}
                style={{width: '80%'}}
              />
            </Dialog.Actions>
          </Dialog>
          <Modal
            visible={isModalVisible}
            onDismiss={() => {
              setisModalVisible(false);
              setIsInfoAbsen(false);
            }}>
            {isInfoAbsen ? (
              <View style={styles.bottomView}>
                <Text style={styles.loginText}>Info Absen</Text>
                <Text style={styles.infoAbsenTitle}>Masuk :</Text>
                <View style={styles.cardDashboard}>
                  <CardDashboard
                    title="Mulai Absen"
                    text={
                      dataSetting?.mulaiMasuk ? dataSetting?.mulaiMasuk : '-'
                    }
                  />
                  <CardDashboard
                    title="Batas Terlambat Absen Masuk"
                    text={
                      dataSetting?.batasMasuk ? dataSetting?.batasMasuk : '-'
                    }
                  />
                </View>
                <Text style={styles.infoAbsenTitle}>Pulang :</Text>

                <View style={styles.cardDashboard}>
                  <CardDashboard
                    title="Mulai Absen"
                    text={
                      dataSetting?.mulaiPulang ? dataSetting?.mulaiPulang : '-'
                    }
                  />
                  <CardDashboard
                    title="Batas Terlambat Absen Masuk"
                    text={
                      dataSetting?.batasPulang ? dataSetting?.batasPulang : '-'
                    }
                  />
                </View>
              </View>
            ) : (
              <View style={styles.bottomView}>
                <Text style={styles.loginText}>Absen</Text>
                <Formik
                  initialValues={{email: '', password: ''}}
                  onSubmit={values => {
                    getDataSecure('userLogin').then((res: any) => {
                      if (res) {
                        if (
                          res.email === values.email &&
                          res.password === values.password
                        ) {
                          dataForPresence();
                          setisModalVisible(false);
                        } else {
                          showInfo('Email atau Password salah', () => {});
                        }
                      }
                    });
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

                      <Gap height={30} />
                      <CustomButton
                        type={'primary'}
                        title={loading ? 'Loading...' : 'Absen'}
                        onPress={handleSubmit}
                        disable={!(dirty && isValid) || loading}
                      />
                    </View>
                  )}
                </Formik>
              </View>
            )}
          </Modal>
        </GestureHandlerRootView>
      </Portal>
    </Provider>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  hourMinutes: {
    fontSize: SIZE.font32,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
  },

  date: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.subtitle,
  },

  cardTime: {
    flexDirection: 'row',
  },

  cardAbsen: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleButton: {
    width: windowHeight * 0.5,
    height: windowHeight * 0.5,
    borderRadius: (windowHeight * 0.5) / 2,
    backgroundColor: COLORS.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.background.black,
    elevation: 18,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  absen: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.secondary,
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: RADIUS.medium,
    borderColor: COLORS.background.secondary,
    marginBottom: 20,
  },

  cardDashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  bottomView: {
    backgroundColor: COLORS.background.primary,
    opacity: 0.95,
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 100,
    borderRadius: 10,
  },

  loginText: {
    fontFamily: FONTS.primary[800],
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
    color: COLORS.text.primary,
  },

  infoAbsenTitle: {
    fontFamily: FONTS.primary[800],
    fontSize: 18,
    marginTop: 12,
    color: COLORS.text.primary,
  },

  imageAnimation: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    alignSelf: 'center',
  },
  dialog: {
    backgroundColor: COLORS.background.primary,
  },

  textDialog: {
    fontFamily: FONTS.primary[800],
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});

import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';
import 'moment/locale/id';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TouchID from 'react-native-touch-id';
import {Bg, ILNullPhoto} from '../../assets';
import {
  BackDropComponent,
  CardCircle,
  CardDashboard,
  CardProfile,
  CardService,
  Gap,
  Loading,
} from '../../components';
import {
  getData,
  optionalConfigObject,
  showError,
  showInfo,
  trackingLocationRef,
} from '../../plugins';
import {
  absen,
  getAkun,
  getLocation,
  getNotif,
  getPresence,
  getRequest,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {COLORS, FONTS, RADIUS, SIZE, windowHeight} from '../../theme';
import PermintaanIzin from './PermintaanIzin';
import {
  isMockingLocation,
  MockLocationDetectorError,
  MockLocationDetectorErrorCode,
} from 'react-native-turbo-mock-location-detector';
import BackgroundFetch from 'react-native-background-fetch';
import Geolocation from 'react-native-geolocation-service';

const Dashboard = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [currTime, setCurrTime] = useState(moment());
  const {isRequestPending, loading} = useAppSelector(
    (state: RootState) => state.dataRequest
  );

  const [triggerPresence, setTriggerPresence] = useState(false);

  const {location, distance} = useAppSelector(
    (state: RootState) => state.dataLocation
  );
  const {data} = useAppSelector((state: RootState) => state.dataAkun);
  const {presence, dataPresence} = useAppSelector(
    (state: RootState) => state.dataPresence
  );

  const attendance = () => {
    isMockingLocation()
      .then(({isLocationMocked}) => {
        if (isLocationMocked) {
          Alert.alert(
            'Pemalsuan Lokasi Terdeteksi',
            'Tolong matikan fitur pemalsuan lokasi',
            [
              {
                text: 'OK',
              },
            ],
            {cancelable: false}
          );
        } else {
          if (presence === 'alreadyPresence') {
            showInfo('Anda sudah melakukan absen Hari ini', () => {});
          } else {
            if (
              data.address &&
              data.birth_date &&
              data.phone_number &&
              data.tempat_lahir
            ) {
              TouchID.isSupported(optionalConfigObject).then(biometryType => {
                if (biometryType === 'FaceID') {
                  Alert.alert('This device supports FaceID');
                } else {
                  TouchID.authenticate('Lakukan Absen', optionalConfigObject)
                    .then(() => {
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
                            in_area: distance <= 0.1 ? true : false,
                            latitude: location.latitude,
                            longitude: location.longitude,
                          };

                          const dataAkun = {
                            fullname: data.fullname,
                            email: data.email,
                            birth_date: data.birth_date,
                            phone_number: data.phone_number,
                            tempat_lahir: data.tempat_lahir,
                            address: data.address,
                            photo: data.photo || null,
                            role: data.role,
                            pekerjaan: data.pekerjaan,
                          };

                          await dispatch(absen(data.uid, dataAbsen, dataAkun));
                          setTriggerPresence(!triggerPresence);
                        });
                    })
                    .catch((error: any) => {
                      showError(error.message);
                    });
                }
              });
            } else {
              Alert.alert(
                'Data profile tidak lengkap',
                'Tolong lengkapi data profile anda terlebih dahulu',
                [
                  {text: 'Tidak', style: 'cancel'},
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
      })
      .catch((error: MockLocationDetectorError) => {
        switch (error.code) {
          case MockLocationDetectorErrorCode.GPSNotEnabled: {
            Alert.alert('GPS Not Enabled', 'Please enable GPS');
            return;
          }
          case MockLocationDetectorErrorCode.CantDetermine: {
            Alert.alert(
              'Can not determine if mock location is enabled',
              'Please try again'
            );
          }
        }
      });
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
            icon="clock-check-outline"
            title="Jam Pulang"
            clock={'19:10'}
          />
        </View>
      );
    }
  }, [presence]);

  const renderInfoAttendanceMemo = useMemo(() => {
    return renderInfoAttendance();
  }, [renderInfoAttendance]);

  const renderTitlePresence = () => {
    switch (presence) {
      case 'masuk':
        return 'Absen Masuk';
      case 'keluar':
        return 'Absen Keluar';
      case 'alreadyPresence':
        return 'Anda sudah absen';
      default:
        return 'Absen Masuk';
    }
  };

  const renderTitlePresenceMemo = useMemo(() => {
    return renderTitlePresence();
  }, [presence]);

  // bottomSheet
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getAkun(res.uid));
      dispatch(getRequest(res.uid));
      dispatch(getNotif(res.uid));

      BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // 1 jam dalam menit
          stopOnTerminate: false,
          startOnBoot: true,
        },
        async taskId => {
          Geolocation.getCurrentPosition(
            async position => {
              trackingLocationRef().doc(res.uid).set({
                fullname: res?.fullname,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp,
                pekerjaan: res?.pekerjaan,
                role: res?.role,
              });
              BackgroundFetch.finish(taskId);
            },
            error => {
              console.log(error);
              BackgroundFetch.finish(taskId);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
              distanceFilter: 0,
            }
          );
        },
        taskId => {
          BackgroundFetch.finish(taskId);
        }
      );

      BackgroundFetch.start();
    });
  }, []);

  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getPresence(res.uid));
    });
  }, [triggerPresence]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getLocation());
    }, 3000);
    return () => clearInterval(interval);
  }, [location]);

  if (loading) {
    return <Loading type="full" />;
  }

  return (
    <GestureHandlerRootView style={styles.page}>
      <ImageBackground source={Bg} style={{flex: 1}}>
        <ScrollView style={{paddingHorizontal: 16}}>
          <CardProfile
            name={data?.fullname}
            title="Selamat Datang, "
            photo={data?.photo ? {uri: data?.photo} : ILNullPhoto}
          />
          <View style={styles.cardAbsen}>
            <Gap height={10} />
            <Text style={styles.hourMinutes}>
              {currTime.format('HH:mm:ss')}
            </Text>
            <Text style={styles.date}>
              {currTime.format('dddd, DD MMM YYYY')}
            </Text>
            <Gap height={10} />
            <View style={styles.cardDashboard}>
              <CardDashboard
                title="Jarak Sekolah"
                text={distance.toFixed(2).toString() + ' KM'}
                onPress={() =>
                  showInfo(
                    distance <= 0.1
                      ? 'Anda sudah berada di lingkungan sekolah'
                      : 'Anda belum di lingkungan sekolah',
                    () => {}
                  )
                }
              />
              <CardDashboard
                type="maps"
                text="Buka Maps"
                onPress={() => navigation.navigate('Location')}
              />
            </View>
            <Gap height={20} />
            <CardCircle
              icon="fingerprint"
              title={renderTitlePresenceMemo}
              absen={presence}
              onPress={() => attendance()}
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
                navigation.navigate('Riwayat', {uid: data?.uid});
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
    </GestureHandlerRootView>
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
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

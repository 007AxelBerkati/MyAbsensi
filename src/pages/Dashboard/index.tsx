import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
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
  showSuccess,
  usersRef,
} from '../../plugins';
import {
  absen,
  getAkun,
  getLocation,
  getNotif,
  getPresence,
  getRequest,
  RootState,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {COLORS, FONTS, RADIUS, SIZE, windowHeight} from '../../theme';
import {dummyData, haversineDistance} from '../../utils';
import PermintaanIzin from './PermintaanIzin';
import TouchID from 'react-native-touch-id';

const Dashboard = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [currTime, setCurrTime] = useState(moment());
  const {isRequestPending, loading} = useAppSelector(
    (state: RootState) => state.dataRequest
  );

  const [distance, setDistance] = useState(0);

  const [triggerPresence, setTriggerPresence] = useState(false);

  const {location} = useAppSelector((state: RootState) => state.dataLocation);
  const {data} = useAppSelector((state: RootState) => state.dataAkun);
  const {presence, dataPresence} = useAppSelector(
    (state: RootState) => state.dataPresence
  );

  const attendance = () => {
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
              .then(async () => {
                const dataAbsen = {
                  address: data.address,
                  date: moment().format(),
                  distance: distance,
                  in_area: distance <= 0.1 ? true : false,
                  latitude: location.latitude,
                  longitude: location.longitude,
                };

                await dispatch(absen(data.uid, dataAbsen));
                setTriggerPresence(!triggerPresence);
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
  };

  const renderInfoAttendance = () => {
    if (presence === 'keluar' || presence === 'alreadyPresence') {
      return (
        <View style={styles.service}>
          <CardService
            icon="clock-in"
            title="Absen Masuk"
            clock={moment(dataPresence.masuk.date).format('HH:mm')}
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
  };

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

  // bottomSheet
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  const handleOpenPress = (index: any) =>
    bottomSheetRef?.current?.snapToIndex(index);
  const handleClosePress = () => bottomSheetRef.current?.close();

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
    });
  }, []);

  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getPresence(res.uid));
    });
  }, [triggerPresence]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(getLocation());
  //     setDistance(
  //       haversineDistance(
  //         {
  //           latitude: location.latitude,
  //           longitude: location.longitude,
  //         },
  //         {
  //           latitude: dummyData.locationSchool.latitude,
  //           longitude: dummyData.locationSchool.longitude,
  //         },
  //         true
  //       )
  //     );
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [location]);

  if (loading) {
    return <Loading />;
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
              title={renderTitlePresence()}
              absen={presence}
              onPress={() => attendance()}
            />
          </View>
          <Gap height={20} />
          {renderInfoAttendance()}
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
                navigation.navigate('Riwayat');
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
          backdropComponent={BackDropComponent}>
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

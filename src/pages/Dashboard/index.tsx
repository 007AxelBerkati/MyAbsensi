import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BackDropComponent,
  CardCircle,
  CardDashboard,
  CardProfile,
  CardService,
  Gap,
  Loading,
} from '../../components';
import {getData} from '../../plugins';
import {
  getAkun,
  getLocation,
  getNotif,
  getRequest,
  RootState,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {COLORS, FONTS, SIZE, windowHeight} from '../../theme';
import {dummyData, haversineDistance} from '../../utils';
import PermintaanIzin from './PermintaanIzin';

const Dashboard = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [currTime, setCurrTime] = useState(moment());
  const {isRequestPending, loading} = useAppSelector(
    (state: RootState) => state.dataRequest
  );

  const [distance, setDistance] = useState(0);

  const {location} = useAppSelector((state: RootState) => state.dataLocation);
  const [dataUser, setDataUser] = useState({
    fullname: '',
    photo: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getData('user').then((res: any) => {
      setDataUser({
        fullname: res.fullname,
        photo: res.photo,
      });

      dispatch(getRequest(res.uid));
      dispatch(getNotif(res.uid));
    });
  }, []);

  useEffect(() => {
    dispatch(getLocation());
    setDistance(
      haversineDistance(
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          latitude: dummyData.locationSchool.latitude,
          longitude: dummyData.locationSchool.longitude,
        },
        true
      )
    );
  }, [location]);

  // bottomSheet
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  const handleOpenPress = (index: any) =>
    bottomSheetRef?.current?.snapToIndex(index);
  const handleClosePress = () => bottomSheetRef.current?.close();

  if (loading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={styles.page}>
      <ScrollView style={{paddingHorizontal: 16}}>
        <CardProfile
          name={dataUser?.fullname}
          title="Selamat Datang, "
          photo={{uri: dataUser?.photo}}
        />
        <View style={styles.cardAbsen}>
          <Gap height={10} />
          <Text style={styles.hourMinutes}>{currTime.format('HH:mm:ss')}</Text>
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
            title="Absen Masuk"
            onPress={() => {}}
          />
        </View>
        <Gap height={20} />

        <View style={styles.service}>
          <CardService
            icon="article"
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
  },

  cardDashboard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

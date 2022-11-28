import moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {
  BackDropComponent,
  CardCircle,
  CardProfile,
  CardService,
  Gap,
} from '../../components';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PermintaanIzin from './PermintaanIzin';
import {getData} from '../../plugins';
import {
  getAkun,
  getRequest,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';

const Dashboard = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [currTime, setCurrTime] = useState(moment());
  const {data} = useAppSelector((state: RootState) => state.dataAkun);
  const {dataRequest} = useAppSelector((state: RootState) => state.dataRequest);

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
    });
  }, []);

  // bottomSheet
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  const handleOpenPress = (index: any) =>
    bottomSheetRef.current?.snapToIndex(index);
  const handleClosePress = () => bottomSheetRef.current?.close();

  return (
    <GestureHandlerRootView style={styles.page}>
      <ScrollView style={{paddingHorizontal: 16}}>
        <CardProfile
          name={data?.fullname}
          title="Selamat Datang, "
          photo={{uri: data?.photo}}
        />
        <View style={styles.cardAbsen}>
          <Gap height={30} />
          <Text style={styles.hourMinutes}>{currTime.format('hh:mm:ss')}</Text>
          <Text style={styles.date}>
            {currTime.format('dddd, DD MMM YYYY')}
          </Text>
          <Gap height={30} />
          <CardCircle
            icon="fingerprint"
            title="Absen Masuk"
            onPress={() => {}}
          />
        </View>
        <Gap height={40} />
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
        <PermintaanIzin handleCloseSheet={() => handleClosePress()} />
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
    width: windowWidth / 1.9,
    height: windowHeight / 3.5,
    borderRadius: windowWidth / 1.5,
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
});

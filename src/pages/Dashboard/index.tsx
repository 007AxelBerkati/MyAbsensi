import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet, ScrollView} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  CardCircle,
  CardList,
  CardProfile,
  CardService,
  Gap,
} from '../../components';
import {ILNullPhoto} from '../../assets';
import moment from 'moment';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../theme';
import 'moment/locale/id';

const Dashboard = ({navigation}: any) => {
  const [currTime, setCurrTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.page}>
      <CardProfile name="Axel" title="Selamat Datang, " photo={ILNullPhoto} />
      <View style={styles.cardAbsen}>
        <Gap height={30} />
        <Text style={styles.hourMinutes}>{currTime.format('hh:mm:ss')}</Text>
        <Text style={styles.date}>{currTime.format('dddd, d MMM YYYY')}</Text>
        <Gap height={30} />
        <CardCircle icon="fingerprint" title="Absen Masuk" onPress={() => {}} />
      </View>
      <Gap height={40} />
      <View style={styles.service}>
        <CardService
          icon="article"
          title="Ijin Tidak Hadir"
          onPress={() => {}}
        />
        <CardService icon="history" title="Lihat History" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 16,
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

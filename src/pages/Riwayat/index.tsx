import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CardRiwayat, Headers} from '../../components';

const Riwayat = ({navigation}: any) => {
  return (
    <View style={styles.pages}>
      <Headers
        title="Riwayat Absen"
        type="back-title"
        pressFilter={() => {}}
        onPress={() => navigation.goBack()}
      />
      <CardRiwayat
        jamKeluar={moment().format('hh:mm:ss')}
        jamMasuk={moment().format('hh:mm:ss')}
        tanggal={moment().format('DD MMMM YYYY')}
        onPress={() => {
          navigation.navigate('DetailRiwayat');
        }}
      />
      <CardRiwayat
        jamKeluar={moment().format('hh:mm:ss')}
        jamMasuk={moment().format('hh:mm:ss')}
        tanggal={moment().format('DD MMMM YYYY')}
        onPress={() => {
          navigation.navigate('DetailRiwayat');
        }}
      />
    </View>
  );
};

export default Riwayat;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    marginHorizontal: 16,
  },
});

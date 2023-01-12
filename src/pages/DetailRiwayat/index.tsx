import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CardDetailPresensi, Headers} from '../../components';
import moment from 'moment';

const DetailRiwayat = ({navigation, route}: any) => {
  const {detailPresence} = route.params;

  return (
    <View style={styles.pages}>
      <Headers
        type="back-title"
        title="Detail Absensi"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <CardDetailPresensi
        date={moment(detailPresence?.masuk.date).format('dddd, DD MMMM YYYY')}
        time={moment(detailPresence?.masuk.date).format('HH:mm')}
        status={
          detailPresence?.masuk.in_area
            ? 'Absen Di Lokasi Sekolah'
            : 'Absen Di Luar Lokasi Sekolah'
        }
        address={detailPresence?.masuk.address}
        type="masuk"
      />
      {detailPresence?.keluar && (
        <CardDetailPresensi
          date={moment(detailPresence?.keluar.date).format(
            'dddd, DD MMMM YYYY'
          )}
          time={moment(detailPresence?.keluar.date).format('HH:mm')}
          status={
            detailPresence?.keluar.in_area
              ? 'Absen Di Lokasi Sekolah'
              : 'Absen Di Luar Lokasi Sekolah'
          }
          address={detailPresence?.keluar?.address}
          type="keluar"
        />
      )}
    </View>
  );
};

export default DetailRiwayat;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

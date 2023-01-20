import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {CardDetailPresensi, Headers} from '../../components';
import moment from 'moment';
import {Bg} from '../../assets';

const DetailRiwayat = ({navigation, route}: any) => {
  const {detailPresence} = route.params;

  return (
    <ImageBackground source={Bg} style={{flex: 1}}>
      <View style={styles.pages}>
        <Headers
          type="back-title"
          title="Detail Absensi"
          onPress={() => {
            navigation.goBack();
          }}
        />
        {detailPresence?.status ? (
          <CardDetailPresensi
            date={moment(detailPresence?.date).format('dddd, DD MMMM YYYY')}
            time={moment(detailPresence?.date).format('HH:mm')}
            status={detailPresence?.status}
            address={detailPresence?.address ? detailPresence?.address : '-'}
            type="masuk"
          />
        ) : (
          <View>
            <CardDetailPresensi
              date={moment(detailPresence?.masuk.date).format(
                'dddd, DD MMMM YYYY'
              )}
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
        )}
      </View>
    </ImageBackground>
  );
};

export default DetailRiwayat;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

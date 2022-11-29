import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {BadgeStatus, CardDetailNotif, Headers} from '../../components';
import {COLORS} from '../../theme';

const DetailNotif = ({navigation, route}: any) => {
  const {item} = route.params;

  return (
    <View style={styles.page}>
      <Headers
        title="Detail Notif"
        type="back-title"
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <CardDetailNotif title="Nama" text={item?.fullname} source={null} />
        <CardDetailNotif
          title="Jenis Izin"
          text={item?.jenis_izin}
          source={null}
        />
        <CardDetailNotif title="Alasan" text={item?.alasan} source={null} />
        <CardDetailNotif title="Bukti photo" source={{uri: item?.photo}} />
        <CardDetailNotif
          title="Durasi"
          text={moment(item?.created_at).format('DD MMMM YYYY')}
          source={null}
        />
        <View style={{position: 'absolute', right: 0}}>
          <BadgeStatus type={item?.status} text={item?.status} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailNotif;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 16,
  },

  container: {
    flex: 1,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.background.primary,
    marginBottom: 16,
    padding: 16,
  },
});

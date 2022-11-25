import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CardNotif, Gap, Headers} from '../../components';
import {ILNullPhoto} from '../../assets';
import moment from 'moment';

const Notif = ({navigation}: any) => {
  return (
    <View style={styles.page}>
      <Headers title="Notification" />
      <CardNotif
        name="Axel"
        request="Izin"
        photo={ILNullPhoto}
        time={moment().format('hh:mm:ss')}
        onPress={() => {}}
        read={false}
      />
      <CardNotif
        name="Axel"
        request="Izin"
        photo={ILNullPhoto}
        time={moment().format('hh:mm:ss')}
        onPress={() => {}}
      />
      <CardNotif
        name="Axel"
        request="Izin"
        photo={ILNullPhoto}
        time={moment().format('hh:mm:ss')}
        onPress={() => {}}
      />
    </View>
  );
};

export default Notif;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 16,
  },
});

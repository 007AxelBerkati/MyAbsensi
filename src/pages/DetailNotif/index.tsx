import moment from 'moment';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import {BadgeStatus, CardDetailNotif, Headers} from '../../components';
import {COLORS} from '../../theme';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ILNullPhoto} from '../../assets';

const DetailNotif = ({navigation, route}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const {item} = route.params;

  const images = [
    {
      url: item?.photo,
    },
  ];

  return (
    <View style={styles.page}>
      <Headers
        title="Detail Notif"
        type="back-title"
        onPress={() => navigation.goBack()}
      />
      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}>
        <ImageViewer
          imageUrls={images}
          onDoubleClick={() => setIsVisible(false)}
        />
      </Modal>
      <ScrollView style={styles.container}>
        <CardDetailNotif title="Nama" text={item?.fullname} source={null} />
        <CardDetailNotif
          title="Jenis Izin"
          text={item?.jenis_izin}
          source={null}
        />
        <CardDetailNotif title="Alasan" text={item?.alasan} source={null} />
        <CardDetailNotif
          title="Bukti photo"
          source={item?.photo ? item?.photo : ILNullPhoto}
          onPress={() => setIsVisible(true)}
        />
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

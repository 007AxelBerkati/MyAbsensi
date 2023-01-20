import moment from 'moment';
import React, {useEffect, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {Bg, IconSellNull, ILNullPhoto, NotifNull} from '../../assets';
import {CardNotif, EmptySkeletonNotif, Headers} from '../../components';
import {
  getNotif,
  RootState,
  updateNotif,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../theme';

const Notif = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {dataNotif, loading} = useAppSelector(
    (state: RootState) => state.dataNotif
  );
  const {data} = useAppSelector((state: RootState) => state.dataAuth);

  const onClickCardNotif = useCallback((item: any) => {
    if (item.isRead === false) {
      dispatch(updateNotif(item.id_user, {isRead: true}, item.uid));
      dispatch(getNotif(item.id_user));
    }
    navigation.navigate('DetailNotif', {item, titleHeader: 'Notifikasi'});
  }, []);

  const emptyComponent = () => (
    <View style={styles.empty}>
      <Image source={NotifNull} style={styles.image} />
      <Text style={styles.emptyText}>Notifikasi Anda Masih Kosong </Text>
    </View>
  );

  useEffect(() => {
    dispatch(getNotif(data?.uid));
  }, []);

  const renderItem = ({item}: any) =>
    loading ? (
      <EmptySkeletonNotif />
    ) : (
      <CardNotif
        request={item?.jenis_izin}
        status={item?.status}
        photo={data?.photo ? {uri: data?.photo} : ILNullPhoto}
        onPress={() => onClickCardNotif(item)}
        read={item?.isRead}
        time={moment(item?.createdAt).format('DD MMMM YYYY, HH:mm')}
      />
    );

  return (
    <ImageBackground source={Bg} style={{flex: 1}}>
      <View style={styles.page}>
        <Headers title="Notification" />
        <FlatList
          data={dataNotif}
          keyExtractor={item => item.uid}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          removeClippedSubviews
          ListEmptyComponent={emptyComponent}
        />
      </View>
    </ImageBackground>
  );
};

export default Notif;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 16,
  },
  emptyText: {
    fontSize: SIZE.font16,
    color: COLORS.text.primary,
    fontFamily: FONTS.primary[600],
    bottom: 50,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },

  image: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
});

import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {IconSellNull, ILNullPhoto} from '../../assets';
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

  const onClickCardNotif = (item: any) => {
    dispatch(updateNotif(item.id_user, item, item.uid));
    dispatch(getNotif(item.id_user));
    navigation.navigate('DetailNotif', {item});
  };

  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
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
        name={item?.fullname}
        request={item?.jenis_izin}
        status={item?.status}
        photo={data?.photo ? {uri: data?.photo} : ILNullPhoto}
        onPress={() => onClickCardNotif(item)}
        read={item?.isRead}
        time={moment(item?.created_at).format('DD MMMM YYYY')}
      />
    );

  return (
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
  );
};

export default Notif;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 16,
  },
  emptyText: {
    fontSize: SIZE.font14,
    color: COLORS.text.subtitle,
    fontFamily: FONTS.primary[400],
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

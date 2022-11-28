import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {IconSellNull, ILNullPhoto} from '../../../assets';
import {CardNotif, EmptySkeletonNotif, Headers} from '../../../components';
import {
  deleteRequest,
  getNotif,
  getRequest,
  RootState,
  updateNotif,
  updateRequest,
  useAppDispatch,
  useAppSelector,
} from '../../../reduxx';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../../theme';

const Notif = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {dataRequest, loading} = useAppSelector(
    (state: RootState) => state.dataRequest
  );
  const {data} = useAppSelector((state: RootState) => state.dataAuth);

  const onClickCardNotif = (item: any) => {
    dispatch(updateRequest(item.id, {status: 'read'}));
    dispatch(getRequest());
  };

  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>Notifikasi Anda Masih Kosong </Text>
    </View>
  );

  useEffect(() => {
    isFocused && dispatch(getRequest());
  }, [isFocused]);

  const renderItem = ({item}: any) =>
    loading ? (
      <EmptySkeletonNotif />
    ) : (
      <CardNotif
        name={item?.fullname}
        request={item?.jenis_izin}
        status={item?.status}
        photo={item?.photoUser ? {uri: item?.photoUser} : ILNullPhoto}
        onPress={() => onClickCardNotif(item)}
        read={item?.isRead}
        time={moment(item?.created_at).format('DD MMMM YYYY, HH:mm')}
        role={data?.role}
        onPressTerima={() => {
          Alert.alert(
            'Terima',
            'Apakah Anda Yakin Akan Menerima Permintaan Ini ? ',
            [
              {
                text: 'Tidak',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Ya',
                onPress: () => {
                  dispatch(
                    updateNotif(
                      item.id_user,
                      {...item, status: 'accepted'},
                      item.uid
                    )
                  );
                  dispatch(deleteRequest(item.id_user));
                  dispatch(getRequest());
                },
              },
            ]
          );
        }}
        onPressTolak={() => {
          Alert.alert(
            'Tolak',
            'Apakah Anda Yakin Akan Menolak Permintaan Ini ? ',
            [
              {
                text: 'Tidak',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Ya',
                onPress: () => {
                  dispatch(
                    updateNotif(
                      item.id_user,
                      {...item, status: 'declined'},
                      item.uid
                    )
                  );
                  dispatch(deleteRequest(item?.id_user));
                  dispatch(getRequest());
                },
              },
            ]
          );
        }}
      />
    );

  return (
    <View style={styles.page}>
      <Headers title="Notification" />
      <FlatList
        data={dataRequest}
        keyExtractor={item => item.id}
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

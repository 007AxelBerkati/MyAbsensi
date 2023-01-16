import moment from 'moment';
import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Bg, IconSellNull, ILNullPhoto} from '../../../assets';
import {CardNotif, EmptySkeletonNotif, Headers} from '../../../components';
import {
  absen,
  deleteRequest,
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
  const {dataRequest, loading} = useAppSelector(
    (state: RootState) => state.dataRequest
  );
  const {location, distance} = useAppSelector(
    (state: RootState) => state.dataLocation
  );
  const {data} = useAppSelector((state: RootState) => state.dataAkun);

  const onClickCardNotif = (item: any) => {
    if (item.isRead === false) {
      dispatch(updateRequest(item.id_user, {isRead: true}));
      dispatch(getRequest(null));
    }
    navigation.navigate('DetailNotif', {item});
  };

  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>Notifikasi Anda Masih Kosong </Text>
    </View>
  );

  useEffect(() => {
    dispatch(getRequest(null));
  }, []);

  const renderItem = ({item}: any) =>
    loading ? (
      <EmptySkeletonNotif />
    ) : (
      <CardNotif
        request={item?.jenis_izin}
        status={item?.status}
        photo={item?.photoUser ? {uri: item?.photoUser} : ILNullPhoto}
        onPress={() => onClickCardNotif(item)}
        read={item?.isRead}
        time={moment(item?.createdAt).format('DD MMMM YYYY, HH:mm')}
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
                      {
                        ...item,
                        status: 'accepted',
                        isRead: true,
                        updatedAt: moment().format(''),
                      },
                      item.uid
                    )
                  );

                  const dataAbsen = {
                    date: moment(item?.createdAt).format('DD/MM/YYYY'),
                    status: item.jenis_izin,
                  };

                  dispatch(absen(item.id_user, dataAbsen, {}));
                  dispatch(deleteRequest(item.id_user));
                  dispatch(getRequest(null));
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
                      {
                        ...item,
                        status: 'declined',
                        isRead: true,
                        updatedAt: moment().format(''),
                      },
                      item.uid
                    )
                  );
                  dispatch(deleteRequest(item?.id_user));
                  dispatch(getRequest(null));
                },
              },
            ]
          );
        }}
      />
    );

  return (
    <ImageBackground source={Bg} style={{flex: 1}}>
      <View style={styles.page}>
        <Headers title="Notification" />
        <FlatList
          data={dataRequest}
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

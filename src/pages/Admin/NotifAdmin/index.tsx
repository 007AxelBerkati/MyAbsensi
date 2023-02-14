import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Bg, ILNullPhoto, PermintaanNull} from '../../../assets';
import {CardNotif, EmptySkeletonNotif, Headers} from '../../../components';
import {getData} from '../../../plugins';
import {
  absen,
  deleteRequest,
  getDataSetting,
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

  const {dataSetting} = useAppSelector((state: RootState) => state.dataSetting);

  const [refreshing, setRefreshing] = useState(false);

  const {dataAkun} = useAppSelector((state: RootState) => state.dataAkun);

  const onClickCardNotif = (item: any) => {
    if (item.isRead === false) {
      dispatch(updateRequest(item.id_user, {isRead: true}));
      dispatch(getRequest(null));
    }
    navigation.navigate('DetailNotif', {item, titleHeader: 'Permintaan'});
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData('user').then((res: any) => {
      dispatch(getRequest(res.uid));
    });
    setRefreshing(false);
  }, []);

  const emptyComponent = () => (
    <View style={styles.empty}>
      <Image source={PermintaanNull} style={styles.image} />
      <Text style={styles.emptyText}>Permintaan Izin Tidak Ada </Text>
    </View>
  );

  useEffect(() => {
    dispatch(getRequest(null));
    dispatch(getDataSetting());
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
        role={dataAkun?.role}
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
                        isRead: false,
                        updatedAt: moment().format(''),
                      },
                      item.uid
                    )
                  );

                  const dataAbsen = {
                    date: moment().format(''),
                    status: item?.jenis_izin,
                    photoBukti: item?.photo ? item?.photo : null,
                  };

                  dispatch(absen(item.id_user, dataAbsen, null, null));
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
                        isRead: false,
                        updatedAt: moment().format(''),
                      },
                      item.uid
                    )
                  );
                  dispatch(updateRequest(item.id_user, {isRead: true}));
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
        <Headers title="Permintaan" />
        <FlatList
          data={dataRequest}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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

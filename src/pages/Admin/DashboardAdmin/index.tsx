import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {ILNullPhoto} from '../../../assets';
import {
  CardDashboard,
  CardNotif,
  CardProfile,
  CustomButton,
  Loading,
} from '../../../components';
import useUser from '../../../hooks/useUser';
import {databaseRef, getData} from '../../../plugins';
import {
  getAkun,
  getDataSetting,
  getLocationPresence,
  getPresenceAllUser,
  getRequest,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../reduxx';
import {COLORS, FONTS, SIZE} from '../../../theme';
import uuid from 'react-native-uuid';

const DashboardAdmin = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {dataAkun} = useAppSelector((state: RootState) => state.dataAkun);
  const {allPresence, loading, total} = useAppSelector(
    (state: RootState) => state.dataPresence
  );

  const {dataSetting} = useAppSelector((state: RootState) => state.dataSetting);

  const {totalUser} = useUser();

  const [refreshing, setRefreshing] = useState(false);

  const {locationPresence} = useAppSelector(
    (state: RootState) => state.dataLocation
  );

  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getAkun(res.uid));
      dispatch(getRequest(res.uid));
      dispatch(getPresenceAllUser());
      dispatch(getLocationPresence());
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData('user').then((res: any) => {
      dispatch(getAkun(res.uid));
      dispatch(getRequest(res.uid));
      dispatch(getPresenceAllUser());
      dispatch(getDataSetting());
    });
    setRefreshing(false);
  }, []);

  const createChatList = (anotherUser: any) => {
    databaseRef()
      .ref(`/chatlist/${dataAkun.uid}/${anotherUser.uid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() == null) {
          const roomId = uuid.v4();
          const myData = {
            roomId,
            uid: dataAkun.uid,
            fullname: dataAkun.fullname,
            photo: dataAkun.photo,
            lastMsg: '',
          };

          databaseRef()
            .ref(`/chatlist/${anotherUser.uid}/${dataAkun.uid}`)
            .update(myData);

          anotherUser.lastMsg = '';
          anotherUser.roomId = roomId;
          databaseRef()
            .ref(`/chatlist/${dataAkun.uid}/${anotherUser.uid}`)
            .update(anotherUser);

          navigation.navigate('Chatting', {
            receiverData: anotherUser,
            dataAkun,
          });
        } else {
          databaseRef()
            .ref(`/chatlist/${dataAkun.uid}/${anotherUser.uid}`)
            .update({
              ...snapshot.val(),
              photo: anotherUser.photo,
              fullname: anotherUser.fullname,
              role: anotherUser.role,
            });
          navigation.navigate('Chatting', {
            receiverData: {
              ...snapshot.val(),
              photo: anotherUser.photo,
              fullname: anotherUser.fullname,
              role: anotherUser.role,
            },
            profile: dataAkun,
          });
        }
      });
  };

  if (loading) return <Loading type="full" />;

  return (
    <View style={styles.pages}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <CardProfile
          name={dataAkun?.fullname}
          title="Selamat Datang, "
          photo={dataAkun?.photo ? {uri: dataAkun?.photo} : ILNullPhoto}
        />
        <CardDashboard
          type="admin"
          user={totalUser}
          hadir={total}
          belumHadir={totalUser - total}
          title="Absensi Hari Ini"
        />

        <View>
          <Text style={styles.titleSection}>Absen Hari Ini (Masuk)</Text>
          {allPresence?.map((item: any) => {
            return (
              <CardNotif
                key={item.uid}
                photo={item?.photo ? {uri: item?.photo} : ILNullPhoto}
                request={item.fullname}
                status={
                  item?.status
                    ? item?.status
                    : item?.masuk
                    ? 'hadir'
                    : 'belum_hadir'
                }
                time={
                  item?.masuk
                    ? moment(item?.masuk?.date).format('HH:mm')
                    : '--:--'
                }
                onPress={() =>
                  item?.status
                    ? navigation.navigate('DetailRiwayat', {
                        detailPresence: item,
                      })
                    : item?.masuk
                    ? navigation.navigate('DetailRiwayat', {
                        detailPresence: item,
                      })
                    : Alert.alert('Perhatian', 'User Belum Melakukan Absen', [
                        {
                          text: 'OK',
                          onPress: () => {},
                        },
                        {
                          text: 'CHAT USER',
                          onPress: () => {
                            createChatList(item);
                          },
                        },
                      ])
                }
              />
            );
          })}

          <Text style={styles.titleSection}>Absen Hari Ini (Pulang)</Text>
          {allPresence?.map((item: any) => {
            return (
              <CardNotif
                key={item.uid}
                photo={item?.photo ? {uri: item?.photo} : ILNullPhoto}
                request={item.fullname}
                status={
                  item?.status
                    ? item?.status
                    : item?.keluar
                    ? 'hadir'
                    : 'belum_hadir'
                }
                time={
                  item?.keluar
                    ? moment(item?.keluar.date).format('HH:mm')
                    : '--:--'
                }
                onPress={() =>
                  item?.status
                    ? navigation.navigate('DetailRiwayat', {
                        detailPresence: item,
                      })
                    : item?.keluar
                    ? navigation.navigate('DetailRiwayat', {
                        detailPresence: item,
                      })
                    : Alert.alert('Perhatian', 'User Belum Melakukan Absen', [
                        {
                          text: 'OK',
                          onPress: () => {},
                        },
                        {
                          text: 'CHAT USER',
                          onPress: () => {
                            createChatList(item);
                          },
                        },
                      ])
                }
              />
            );
          })}
        </View>
      </ScrollView>
      {moment().isBetween(
        moment(dataSetting?.mulaiMasuk, 'HH:mm'),
        moment(dataSetting?.batasPulang, 'HH:mm')
      ) && (
        <CustomButton
          icon="google-maps"
          type="floating-btn"
          color={COLORS.secondary}
          onPress={() => {
            navigation.navigate('TrackingAdmin', {
              locationPresence,
            });
          }}
        />
      )}
    </View>
  );
};

export default DashboardAdmin;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleSection: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
    marginTop: 16,
  },
});

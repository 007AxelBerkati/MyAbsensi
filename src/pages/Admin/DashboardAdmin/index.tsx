import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {BcDashAdmin, ILNullPhoto} from '../../../assets';
import {
  CardDashboard,
  CardNotif,
  CardProfile,
  Loading,
} from '../../../components';
import {COLORS, FONTS, SIZE} from '../../../theme';
import {
  getAkun,
  getNotif,
  getPresenceAllUser,
  getRequest,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../reduxx';
import {getData, usersRef} from '../../../plugins';
import moment from 'moment';
import useUser from '../../../hooks/useUser';

const DashboardAdmin = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector((state: RootState) => state.dataAkun);
  const {allPresence, loading, total} = useAppSelector(
    (state: RootState) => state.dataPresence
  );
  const {totalUser} = useUser();

  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getAkun(res.uid));
      dispatch(getRequest(res.uid));
      dispatch(getPresenceAllUser());
    });
  }, []);

  useEffect(() => {}, []);

  console.log('allPresence', allPresence);

  if (loading) return <Loading />;

  return (
    <View style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardProfile
          name={data?.fullname}
          title="Selamat Datang, "
          photo={data?.photo ? {uri: data?.photo} : ILNullPhoto}
        />
        <CardDashboard
          type="admin"
          user={totalUser}
          hadir={total}
          belumHadir={totalUser - total}
          title="Kehadiran Hari Ini"
        />

        <View>
          <Text style={styles.titleSection}>Absen Hari Ini (Masuk)</Text>
          {allPresence?.map((item: any) => {
            return (
              <CardNotif
                key={item.uid}
                photo={item?.photo ? {uri: item?.photo} : ILNullPhoto}
                request={item.fullname}
                status={item?.masuk ? 'hadir' : 'belum_hadir'}
                time={
                  item?.masuk
                    ? moment(item?.masuk?.date).format('HH:mm')
                    : '--:--'
                }
                onPress={() =>
                  item?.masuk
                    ? navigation.navigate('DetailRiwayat', {
                        detailPresence: item,
                      })
                    : null
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
                status={item?.keluar ? 'hadir' : 'belum_hadir'}
                time={
                  item?.keluar
                    ? moment(item?.keluar.date).format('HH:mm')
                    : '--:--'
                }
                onPress={() =>
                  item?.keluar
                    ? navigation.navigate('DetailRiwayat', {
                        detailPresence: item,
                      })
                    : Alert.alert('Perhatian', 'Belum ada data absen pulang')
                }
              />
            );
          })}
        </View>
      </ScrollView>
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

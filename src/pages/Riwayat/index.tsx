import moment from 'moment';
import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {IconSellNull} from '../../assets';
import {CardRiwayat, EmptySkeletonNotif, Headers} from '../../components';
import {
  getAllPresence,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../theme';
import {DatePickerModal} from 'react-native-paper-dates';

const Riwayat = ({navigation, route}: any) => {
  const {uid} = route.params;

  const dispatch = useAppDispatch();
  const {allPresence, loading} = useAppSelector(
    (state: RootState) => state.dataPresence
  );

  const [range, setRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({startDate: undefined, endDate: undefined});

  const [open, setOpen] = useState(false);

  const onConfirm = useCallback(
    ({startDate, endDate}: any) => {
      setOpen(false);
      setRange({startDate, endDate});
    },
    [setOpen, setRange]
  );

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    dispatch(getAllPresence(uid, null));
  }, []);

  useEffect(() => {
    if (range.startDate && range.endDate) {
      dispatch(
        getAllPresence(uid, {
          start: moment(range.startDate).format(),
          end: moment(range.endDate).format(),
        })
      );
    }
  }, [range]);

  const renderItem = ({item}: any) =>
    loading ? (
      <EmptySkeletonNotif />
    ) : (
      <CardRiwayat
        jamKeluar={
          item?.keluar ? moment(item?.keluar?.date).format('HH:mm') : '--:--'
        }
        jamMasuk={moment(item?.masuk?.date).format('HH:mm')}
        tanggal={moment(item?.masuk?.date).format('DD MMMM YYYY')}
        onPress={() => {
          navigation.navigate('DetailRiwayat', {detailPresence: item});
        }}
      />
    );

  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>Notifikasi Anda Masih Kosong </Text>
    </View>
  );

  return (
    <View style={styles.pages}>
      <Headers
        title="Riwayat Absen"
        type="back-title"
        pressFilter={() => {
          setOpen(true);
        }}
        onPress={() => navigation.goBack()}
      />
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
        startYear={1960} // optional, default is 1800
        endYear={2100} // optional, default is 2200
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        label="Pilih Range Tanggal Absen" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        // closeIcon="close" // optional, default is "close"
        // editIcon="pencil" // optional, default is "pencil"
        // calendarIcon="calendar" // optional, default is "calendar"
      />

      <FlatList
        data={allPresence}
        keyExtractor={(item, index) => index.toString()}
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

export default Riwayat;

const styles = StyleSheet.create({
  pages: {
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

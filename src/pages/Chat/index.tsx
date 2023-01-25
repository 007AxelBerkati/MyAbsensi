import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {Bg, IconSellNull, ILNullPhoto, PesanNull} from '../../assets';
import {
  CustomButton,
  EmptySkeletonNotif,
  Headers,
  List,
} from '../../components';
import {getData} from '../../plugins';
import {
  createChat,
  getListChat,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../theme';

const Chat = ({navigation}: any) => {
  const [profile, setProfile] = useState({
    photo: '',
    fullname: '',
    role: '',
    uid: '',
  });

  const dispatch = useAppDispatch();

  const {dataChatList, loading} = useAppSelector(
    (state: RootState) => state.dataChat
  );

  const getUserData = () => {
    getData('user').then(res => {
      setProfile(res);
      dispatch(getListChat(res.uid));
      console.log(dataChatList);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);
  const emptyComponent = () => (
    <View style={styles.empty}>
      <Image source={PesanNull} style={styles.image} />
      <Text style={styles.emptyText}>Pesan Masih Kosong </Text>
    </View>
  );

  const renderItem = ({item}: any) =>
    loading ? (
      <EmptySkeletonNotif />
    ) : (
      <List
        name={item.fullname}
        chat={item.lastMsg}
        profile={item?.photo?.length > 1 ? {uri: item.photo} : ILNullPhoto}
        date={moment(item.sendTime).format('YYYY/MM/DD')}
        time={moment(item.sendTime).format('h:mm a')}
        onPress={() => createChatList(item)}
      />
    );

  const createChatList = (data: any) => {
    dispatch(createChat(profile, data, navigation));
  };

  return (
    <ImageBackground source={Bg} style={{flex: 1}}>
      <View style={styles.page}>
        <Headers title="Semua Pesan" />
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(Item, index) => index.toString()}
          data={dataChatList}
          renderItem={renderItem}
          ListEmptyComponent={emptyComponent}
        />

        <CustomButton
          icon="account-multiple"
          type="floating-btn"
          color={COLORS.secondary}
          onPress={() => navigation.navigate('AllUser', {profile})}
        />
      </View>
    </ImageBackground>
  );
};

export default Chat;

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

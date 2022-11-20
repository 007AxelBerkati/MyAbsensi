import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import uuid from 'react-native-uuid';
import {ILNullPhoto} from '../../assets';
import {CustomButton, Headers, List} from '../../components';
import {databaseRef, getData} from '../../plugins';
import {
  getAllUser,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {COLORS} from '../../theme';

const Chat = ({navigation}: any) => {
  const [profile, setProfile] = useState({
    photo: {
      uri: '',
    },
    fullname: '',
    role: '',
    uid: '',
  });

  const [allUser, setallUser] = useState([]);

  const getChatList = (uid: any) => {
    databaseRef()
      .ref(`chatlist/${uid}/`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          console.log('snapshot.val()', snapshot.val());
          const array = Object.values(snapshot.val());
          const sortedArray = array.sort(
            (a: any, b: any) =>
              new Date(b.sendTime).getTime() - new Date(a.sendTime).getTime()
          );

          const dataMsgNotNull: any = [];

          sortedArray.forEach((it: any) => {
            if (it.lastMsg !== '') {
              dataMsgNotNull.push(it);
            }
          });

          console.log('dataMsgNotNull', dataMsgNotNull);

          setallUser(dataMsgNotNull);
        }
      });
  };

  const getUserData = () => {
    getData('user').then(res => {
      console.log('res user', res);
      setProfile(res);
      getChatList(res.uid);
    });
  };

  useEffect(() => {
    getUserData();
    console.log(allUser);
  }, []);

  const createChatList = (data: any) => {
    databaseRef()
      .ref(`/chatlist/${profile.uid}/${data.uid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() == null) {
          const roomId = uuid.v4();
          const myData = {
            roomId,
            uid: profile.uid,
            fullname: profile.fullname,
            photo: profile.photo.uri ? profile.photo.uri : profile.photo,
            role: profile.role,
            lastMsg: '',
          };
          databaseRef()
            .ref(`/chatlist/${data.uid}/${profile.uid}`)
            .update(myData);

          data.lastMsg = '';
          data.roomId = roomId;
          databaseRef()
            .ref(`/chatlist/${profile.uid}/${data.uid}`)
            .update(data);

          navigation.navigate('Chatting', {receiverData: data, profile});
        } else {
          databaseRef()
            .ref(`/chatlist/${profile.uid}/${data.uid}`)
            .update({
              ...snapshot.val(),
              photo: data.photo.uri ? data.photo.uri : data.photo,
              fullname: data.fullname,
              role: data.role,
            });
          navigation.navigate('Chatting', {
            receiverData: {
              ...snapshot.val(),
              photo: data.photo.uri ? data.photo.uri : data.photo,
              fullname: data.fullname,
              role: data.role,
            },
            profile,
          });
        }
      });
  };

  return (
    <View style={styles.page}>
      <Headers title="Semua Pesan" />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(Item, index) => index.toString()}
        data={allUser}
        renderItem={({item}: any) => (
          <List
            name={item.fullname}
            chat={item.lastMsg}
            profile={{
              uri: item.photo.uri ? item.photo?.uri : item.photo,
            }}
            date={moment(item.sendTime).format('YYYY/MM/DD')}
            time={moment(item.sendTime).format('h:mm a')}
            onPress={() => createChatList(item)}
          />
        )}
      />

      <CustomButton
        icon="account-multiple"
        type="floating-btn"
        color={COLORS.secondary}
        onPress={() => navigation.navigate('AllUser', {profile})}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    marginHorizontal: 16,
  },
});

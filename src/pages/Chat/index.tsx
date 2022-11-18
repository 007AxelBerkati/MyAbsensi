import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import uuid from 'react-native-uuid';
import {ILNullPhoto} from '../../assets';
import {CustomButton, Headers, List} from '../../components';
import {databaseRef, getData} from '../../plugins';
import {COLORS} from '../../theme';

const Chat = ({navigation}: any) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
    uid: '',
  });

  const [allUser, setallUser] = useState([]);

  const [allContact, setAllContact] = useState([]);

  const getChatList = (uid: any) => {
    databaseRef()
      .ref(`chatlist/${uid}/`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const array = Object.values(snapshot.val());
          const sortedArray = array.sort(
            (a: any, b: any) =>
              new Date(b.sendTime).getTime() - new Date(a.sendTime).getTime()
          );
          const dataMsgNotNull = sortedArray.filter(
            (it: any) => it.lastMsg !== ''
          );
          setallUser(dataMsgNotNull);
        }
      });
  };

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
      getChatList(res.uid);
      getAllUser(res.uid, '');
    });
  };

  const getAllUser = (uid: any, text: any) => {
    databaseRef()
      .ref(`admins/`)
      .once('value')
      .then(snapshot => {
        setAllContact(
          Object.values(snapshot.val()).filter(
            it => it.fullname.toLowerCase().includes(text) && it.uid !== uid
          )
        );
      });
  };

  useEffect(() => {
    getUserData();
    console.log(allUser);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createChatList = (data: any) => {
    databaseRef()
      .ref(`/chatlist/${profile.uid}/${data.uid}`)
      .once('value')
      .then(snapshot => {
        // console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          const roomId = uuid.v4();
          const myData = {
            roomId,
            uid: profile.uid,
            fullname: profile.fullname,
            photo: profile.photo,
            bio: profile.bio,
            lastMsg: '',
          };
          databaseRef()
            .ref(`/chatlist/${data.uid}/${profile.uid}`)
            .update(myData);
          // .then(() => console.log('Data updated.'));

          data.lastMsg = '';
          data.roomId = roomId;
          databaseRef()
            .ref(`/chatlist/${profile.uid}/${data.uid}`)
            .update(data);
          // .then(() => console.log('Data updated.'));

          navigation.navigate('Chatting', {receiverData: data, profile});
        } else {
          databaseRef()
            .ref(`/chatlist/${profile.uid}/${data.uid}`)
            .update({
              ...snapshot.val(),
              photo: data.photo,
              fullname: data.fullname,
              bio: data.bio,
            });
          navigation.navigate('Chatting', {
            receiverData: {
              ...snapshot.val(),
              photo: data.photo,
              fullname: data.fullname,
              bio: data.bio,
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
            profile={item.photo}
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
        onPress={() => navigation.navigate('AllUser', {profile, allContact})}
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

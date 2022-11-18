import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ILNullPhoto} from '../../assets';
import {databaseRef, getData} from '../../plugins';
import {Gap, Headers, List} from '../../components';
import {Searchbar} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {COLORS} from '../../theme';
import {useIsFocused} from '@react-navigation/native';

const AllUser = ({navigation, route}: any) => {
  const {params} = route;
  const {allContact} = params;
  const {profile} = params;

  const [searchQuery, setSearchQuery] = useState('');

  const [allUser, setallUser] = useState(allContact);

  const onChangeSearch = (query: any) => {
    // console.log(query);
    setSearchQuery(query);
    getAllUser(profile.uid, query);
  };

  const getAllUser = (uid: any, text: any) => {
    databaseRef()
      .ref(`admins/`)
      .once('value')
      .then(snapshot => {
        setallUser(
          Object.values(snapshot.val()).filter(
            it => it.fullname.toLowerCase().includes(text) && it.uid !== uid
          )
        );
      });
  };

  const createChatList = (data: any) => {
    // console.log('data', data);
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
            lastMsg: '',
          };

          console.log('myData', myData);

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

  useEffect(() => {
    console.log('allUser', allUser);
    console.log('profile', profile);
  }, []);

  return (
    <View style={styles.page}>
      <Headers title="Contact" onPress={() => navigation.goBack()} />
      <Gap height={16} />
      <Searchbar
        style={{
          borderRadius: 25,
          marginBottom: 15,
          marginHorizontal: 20,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(Item, index) => index.toString()}
        data={allUser}
        renderItem={({item}: any) => (
          <List
            name={item.fullname}
            profile={{uri: item.photo}}
            chat={item.role}
            type="next"
            onPress={() => createChatList(item)}
          />
        )}
      />
    </View>
  );
};

export default AllUser;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    marginHorizontal: 16,
  },
});

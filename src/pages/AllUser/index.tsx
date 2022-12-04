import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {ILNullPhoto} from '../../assets';
import {Gap, Headers, List} from '../../components';
import {databaseRef} from '../../plugins';
import {
  getSearchUser,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import {COLORS} from '../../theme';

const AllUser = ({navigation, route}: any) => {
  const {params} = route;
  const {profile} = params;

  const dispatch = useAppDispatch();

  const {dataSearch} = useAppSelector((state: RootState) => state.dataChat);

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = useCallback(
    (query: any) => {
      setSearchQuery(query);
    },
    [dispatch]
  );

  useEffect(() => {
    const getSearch = setTimeout(() => {
      dispatch(getSearchUser(profile.uid, searchQuery));
    }, 500);

    return () => clearTimeout(getSearch);
  }, [dispatch, searchQuery]);

  const createChatList = (data: any) => {
    console.log('data test', data);

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
            photo: profile.photo,
            lastMsg: '',
          };

          console.log('myData', myData);

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
              photo: data.photo,
              fullname: data.fullname,
              role: data.role,
            });
          navigation.navigate('Chatting', {
            receiverData: {
              ...snapshot.val(),
              photo: data.photo,
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
      <Headers
        type="back-title"
        title="Contact"
        onPress={() => navigation.goBack()}
      />
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
        data={dataSearch}
        renderItem={({item}: any) => (
          <>
            {console.log('item', item)}
            <List
              name={item.fullname}
              profile={item?.photo ? {uri: item?.photo} : ILNullPhoto}
              chat={item?.role}
              type="next"
              onPress={() => createChatList(item)}
            />
          </>
        )}
      />
    </View>
  );
};

export default AllUser;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 16,
  },
});

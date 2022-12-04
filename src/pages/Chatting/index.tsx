import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {databaseRef} from '../../plugins';
import {BackgroundChat, ILNullPhoto} from '../../assets';
import {ChatItem, Headers, InputChat} from '../../components';
import {COLORS, FONTS} from '../../theme';
import {setLoading, useAppDispatch} from '../../reduxx';

const Chatting = ({navigation, route}: any) => {
  const {params} = route;
  const {receiverData} = params;
  const {profile} = params;

  const [msg, setMsg] = useState('');
  const [allChat, setallChat] = useState([]);
  const dispatch = useAppDispatch();

  const sendMsg = () => {
    const msgData = {
      roomId: receiverData.roomId,
      message: msg,
      from: profile?.uid,
      to: receiverData.uid,
      photo: profile?.photo,
      role: profile?.role,
      sendTime: moment().format(''),
      msgType: 'text',
      uid: profile?.uid,
    };

    const newReference = databaseRef()
      .ref(`/messages/${receiverData.roomId}`)
      .push();

    msgData.uid = newReference.key;
    newReference.set(msgData).then(() => {
      const chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      databaseRef()
        .ref(`/chatlist/${receiverData?.uid}/${profile?.uid}`)
        .update(chatListupdate);
      databaseRef()
        .ref(`/chatlist/${profile?.uid}/${receiverData?.uid}`)
        .update(chatListupdate);

      setMsg('');
    });
  };

  useEffect(() => {
    const onChildAdd = databaseRef()
      .ref(`/messages/${receiverData.roomId}`)
      .on('child_added', snapshot => {
        const data: any = (state: any) => [snapshot.val(), ...state];
        setallChat(data);
      });
    return () => {
      databaseRef()
        .ref(`/messages${receiverData.roomId}`)
        .off('child_added', onChildAdd);
    };
    // Stop listening for updates when no longer required
  }, [receiverData.roomId]);

  return (
    <ImageBackground source={BackgroundChat} style={styles.page}>
      <Headers
        type="dark-profile"
        title={receiverData.fullname}
        photo={
          receiverData?.photo.length > 1
            ? {uri: receiverData.photo}
            : ILNullPhoto
        }
        desc={receiverData?.role}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <FlatList
          style={{flex: 1}}
          data={allChat}
          inverted
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index: any) => index}
          renderItem={({item}: any) => (
            <ChatItem
              isMe={item.from === profile.uid}
              text={item.message}
              date={moment(item.sendTime).format('DD/MM/YYYY, HH:mm')}
              photo={
                item.from === profile.uid
                  ? null
                  : item?.photo
                  ? {uri: item.photo}
                  : ILNullPhoto
              }
            />
          )}
        />
      </View>
      <InputChat
        value={msg}
        onChangeText={val => setMsg(val)}
        onButtonPress={sendMsg}
        targetChat={receiverData}
      />
    </ImageBackground>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: FONTS.primary.normal,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
  content: {
    flex: 1,
  },
});

import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {databaseRef} from '../../plugins';
import {BackgroundChat} from '../../assets';
import {ChatItem, Headers, InputChat} from '../../components';
import {COLORS, FONTS} from '../../theme';

const Chatting = ({navigation, route}: any) => {
  const {params} = route;
  const {receiverData} = params;
  const {profile} = params;

  const [msg, setMsg] = useState('');
  const [allChat, setallChat] = useState([]);

  const sendMsg = () => {
    const msgData = {
      roomId: receiverData.roomId,
      message: msg,
      from: profile?.uid,
      to: receiverData.uid,
      photo: profile?.photo,
      sendTime: moment().format(''),
      msgType: 'text',
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
      // .then(() => console.log('Data updated.'));
      // console.log("'/chatlist/' + profile?.uid + '/' + data?.uid", receiverData);
      databaseRef()
        .ref(`/chatlist/${profile?.uid}/${receiverData?.uid}`)
        .update(chatListupdate);

      setMsg('');
    });
  };

  useEffect(() => {
    // onLogScreenView('ChatScreen');
    const onChildAdd = databaseRef()
      .ref(`/messages/${receiverData.roomId}`)
      .on('child_added', snapshot => {
        // console.log('A new node has been added', snapshot.val());
        setallChat(state => [snapshot.val(), ...state]);
      });
    // Stop listening for updates when no longer required
    return () => {
      databaseRef()
        .ref(`/messages${receiverData.roomId}`)
        .off('child_added', onChildAdd);
      setallChat([]);
    };
  }, [receiverData.roomId]);

  return (
    <ImageBackground source={BackgroundChat} style={styles.page}>
      <Headers
        type="dark-profile"
        title={receiverData.fullname}
        photo={
          // receiverData.photo.length > 1
          //   ? {uri: receiverData.photo}
          //   : receiverData.photo
          {uri: receiverData.photo}
        }
        desc={receiverData.role}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <FlatList
          style={{flex: 1}}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => (
            <ChatItem
              isMe={item.from === profile.uid}
              text={item.message}
              date={item.sendTime}
              // photo={
              //   item.from === profile.uid
              //     ? null
              //     : item.photo.length > 1
              //     ? {uri: item.photo}
              //     : item.photo
              // }
              photo={item.from === profile.uid ? null : {uri: item.photo}}
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

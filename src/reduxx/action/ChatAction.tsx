import {databaseRef, showError} from '../../plugins';
import {
  CREATE_CHAT_LIST_ERROR,
  CREATE_CHAT_LIST_LOADING,
  CREATE_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_ERROR,
  GET_CHAT_LIST_LOADING,
  GET_CHAT_LIST_SUCCESS,
  SET_GETALLUSER_ERROR,
  SET_GETALLUSER_LOADING,
  SET_GETALLUSER_SUCCESS,
  SET_GETCHAT_ERROR,
  SET_GETCHAT_LOADING,
  SET_GETCHAT_SUCCESS,
  SET_SEARCHUSER_ERROR,
  SET_SEARCHUSER_LOADING,
  SET_SEARCHUSER_SUCCESS,
} from '../types';
import uuid from 'react-native-uuid';

export const getAllUserLoadin = (loading: any) => ({
  type: SET_GETALLUSER_LOADING,
  loading,
});

export const getAllUserError = (error: any) => ({
  type: SET_GETALLUSER_ERROR,
  error,
});

export const getAllUserSuccess = (success: any) => ({
  type: SET_GETALLUSER_SUCCESS,
  success,
});

export const getChatLoading = (loading: any) => ({
  type: SET_GETCHAT_LOADING,
  loading,
});

export const getChatError = (error: any) => ({
  type: SET_GETCHAT_ERROR,
  error,
});

export const getChatSuccess = (success: any) => ({
  type: SET_GETCHAT_SUCCESS,
  success,
});

export const getSearchUserLoading = (loading: any) => ({
  type: SET_SEARCHUSER_LOADING,
  loading,
});

export const getSearchUserError = (error: any) => ({
  type: SET_SEARCHUSER_ERROR,
  error,
});

export const getSearchUserSuccess = (success: any) => ({
  type: SET_SEARCHUSER_SUCCESS,
  success,
});

export const getAllUser = (uid: any, text: any) => async (dispatch: any) => {
  dispatch(getAllUserLoadin(true));
  try {
    databaseRef()
      .ref(`users/${uid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          databaseRef()
            .ref(`admins`)
            .on('value', snapshot => {
              const lowerFullname: any = Object.values(snapshot.val()).filter(
                (it: any) =>
                  it.fullname.toLowerCase().includes(text) && it.uid !== uid
              );
              dispatch(getAllUserSuccess(lowerFullname));
            });
        } else {
          databaseRef()
            .ref(`users`)
            .on('value', snapshot => {
              const lowerFullname: any = Object.values(snapshot.val()).filter(
                (it: any) =>
                  it.fullname.toLowerCase().includes(text) && it.uid !== uid
              );
              dispatch(getAllUserSuccess(lowerFullname));
            });
        }
      });
  } catch (error: any) {
    dispatch(getAllUserError(error));
    showError(error.message);
  }
};

export const getSearchUser = (uid: any, text: any) => async (dispatch: any) => {
  dispatch(getSearchUserLoading(true));
  try {
    databaseRef()
      .ref(`users/${uid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          databaseRef()
            .ref(`admins`)
            .on('value', snapshot => {
              const lowerFullname: any = Object.values(snapshot.val()).filter(
                (it: any) =>
                  it.fullname.toLowerCase().includes(text) && it.uid !== uid
              );
              dispatch(getSearchUserSuccess(lowerFullname));
            });
        } else {
          databaseRef()
            .ref(`users`)
            .on('value', snapshot => {
              const lowerFullname: any = Object.values(snapshot.val()).filter(
                (it: any) =>
                  it.fullname.toLowerCase().includes(text) && it.uid !== uid
              );
              dispatch(getSearchUserSuccess(lowerFullname));
            });
        }
      });
  } catch (error: any) {
    dispatch(getSearchUserError(error));
    showError(error.message);
  }
};

export const createChatListLoading = (loading: any) => ({
  type: CREATE_CHAT_LIST_LOADING,
  loading,
});

export const createChatListError = (error: any) => ({
  type: CREATE_CHAT_LIST_ERROR,
  error,
});

export const createChatListSuccess = () => ({
  type: CREATE_CHAT_LIST_SUCCESS,
});

export const createChat =
  (profile: any, data: any, navigation: any) => async (dispatch: any) => {
    dispatch(createChatListLoading(true));
    try {
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
            dispatch(createChatListSuccess());
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
            dispatch(createChatListSuccess());
          }
        });
    } catch (error: any) {
      dispatch(createChatListError(error));
      showError(error.message);
    }
  };

export const getChatListLoading = (loading: any) => ({
  type: GET_CHAT_LIST_LOADING,
  loading,
});

export const getChatListError = (error: any) => ({
  type: GET_CHAT_LIST_ERROR,
  error,
});

export const getChatListSuccess = (success: any) => ({
  type: GET_CHAT_LIST_SUCCESS,
  success,
});

export const getListChat = (uid: any) => async (dispatch: any) => {
  dispatch(getChatListLoading(true));
  try {
    databaseRef()
      .ref(`chatlist/${uid}/`)
      .on('value', snapshot => {
        if (snapshot.val()) {
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

          dispatch(getChatListSuccess(dataMsgNotNull));
        }
      });
  } catch (error: any) {
    dispatch(getChatListError(error));
    showError(error.message);
  }
};

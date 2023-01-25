import {settingRef} from '../../plugins';
import {
  GET_DATA_SETTING_ERROR,
  GET_DATA_SETTING_LOADING,
  GET_DATA_SETTING_SUCCESS,
} from '../types';

export const getDataSettingSuccess = (data: any) => ({
  type: GET_DATA_SETTING_SUCCESS,
  data,
});

export const getDataSettingLoading = (loading: any) => ({
  type: GET_DATA_SETTING_LOADING,
  loading,
});

export const getDataSettingError = (error: any) => ({
  type: GET_DATA_SETTING_ERROR,
  error,
});

export const getDataSetting = () => async (dispatch: any) => {
  dispatch(getDataSettingLoading(true));
  try {
    await settingRef()
      .doc('SettingPresence')
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch(getDataSettingSuccess(doc.data()));
        }
      });
  } catch (error) {
    dispatch(getDataSettingError(error));
  }
};

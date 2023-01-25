import {
  GET_DATA_SETTING_ERROR,
  GET_DATA_SETTING_LOADING,
  GET_DATA_SETTING_SUCCESS,
} from '../types';

type initialPropsSetting = {
  loading: boolean;
  error: any;
  dataSetting: any;
};

const initialSetting: initialPropsSetting = {
  loading: false,
  error: null,
  dataSetting: null,
};

export const SettingReducer = (state = initialSetting, action: any) => {
  switch (action.type) {
    case GET_DATA_SETTING_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case GET_DATA_SETTING_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_DATA_SETTING_SUCCESS:
      return {
        ...state,
        dataSetting: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

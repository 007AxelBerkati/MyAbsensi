declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'redux-logger';

declare module '*.svg' {
  const content: any;
}

declare module '*.png' {
  const content: any;
}

declare module '*.jpg' {
  const content: any;
}

declare module '*.jpeg' {
  const content: any;
}

declare module '@env' {
  export const REACT_STORAGE_BUCKET: string;
  export const REACT_PROJECT_ID: string;
  export const REACT_FIREBASE_URL: string;
  export const REACT_PROJECT_NUMBER: string;
}

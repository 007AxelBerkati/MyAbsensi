import {launchImageLibrary} from 'react-native-image-picker';
import {showError} from '../showMessage';

export const getImage = (setFieldValue: any) => {
  launchImageLibrary(
    {
      quality: 1,
      includeBase64: true,
      mediaType: 'photo',
    },
    (response: any) => {
      if (response.didCancel || response.errorCode) {
        showError('Sepertinya anda tidak memilih fotonya');
      } else {
        const source = response?.assets[0];
        //convert image to base 64
        const image = `data:${source.type};base64,${source.base64}`;
        setFieldValue('photo', image);
      }
    }
  );
};

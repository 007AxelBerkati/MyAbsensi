import {launchImageLibrary} from 'react-native-image-picker';
import {showError} from '../showMessage';

export const getImage = (setFieldValue: any) => {
  launchImageLibrary(
    {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 400,
      maxWidth: 400,
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

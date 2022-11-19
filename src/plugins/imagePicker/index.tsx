import {launchImageLibrary} from 'react-native-image-picker';
import {showError} from '../showMessage';

export const getImage = (setFieldValue: any, setPhoto: any) => {
  launchImageLibrary(
    {
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
      includeBase64: true,
      mediaType: 'photo',
    },
    (response: any) => {
      if (response.didCancel || response.errorCode) {
        showError('Sepertinya anda tidak memilih fotonya');
      } else {
        const source = response?.assets[0];
        const Uri = source.uri;
        if (setPhoto !== undefined) {
          setPhoto(Uri);
        }
        setFieldValue('image', source, true);
      }
    }
  );
};

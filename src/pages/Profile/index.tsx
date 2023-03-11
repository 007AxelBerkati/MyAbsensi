import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Fade, Placeholder, PlaceholderMedia} from 'rn-placeholder';
import {version} from '../../../package.json';
import {Bg, ILNullPhoto} from '../../assets';
import {CardList, Headers, Profile, CustomButton} from '../../components';
import {getData} from '../../plugins';
import {
  getAkun,
  RootState,
  signOutUser,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';
import LottieView from 'lottie-react-native';

import {
  COLORS,
  FONTS,
  RADIUS,
  SIZE,
  windowHeight,
  windowWidth,
} from '../../theme';
import BackgroundService from 'react-native-background-actions';
import {Portal, Provider, Dialog, Paragraph} from 'react-native-paper';

function AkunScreen({navigation}: any) {
  const dispatch = useAppDispatch();

  const {loading, dataAkun} = useAppSelector(
    (state: RootState) => state.dataAkun
  );

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getAkun(res.uid));
    });
  }, []);

  const onLogout = () => {
    dispatch(signOutUser(navigation));
    BackgroundService.stop();
  };

  const checkIsLoading = () => {
    if (loading) {
      return (
        <Placeholder Animation={Fade} style={styles.photoSection}>
          <PlaceholderMedia style={styles.placeholder} />
        </Placeholder>
      );
    }
    return (
      <Profile
        source={dataAkun?.photo ? {uri: dataAkun?.photo} : ILNullPhoto}
      />
    );
  };

  return (
    <Provider>
      <Portal>
        <ImageBackground source={Bg} style={{flex: 1}}>
          <View style={styles.pages}>
            <Headers title="Akun Saya" />
            <ScrollView>
              {checkIsLoading()}
              <CardList
                type="akun"
                name="edit"
                title="Ubah Akun"
                onPress={() => navigation.navigate('EditProfile')}
              />
              <CardList
                type="akun"
                name="logout"
                title="Keluar"
                onPress={() => setIsDialogVisible(true)}
              />
              <Text style={styles.version}>Version {version}</Text>
            </ScrollView>
          </View>
        </ImageBackground>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title style={{textAlign: 'center'}}>
            Peringatan!!!
          </Dialog.Title>
          <Dialog.Content>
            <LottieView
              source={{
                uri: 'https://assets5.lottiefiles.com/packages/lf20_0fwl68.json',
              }}
              autoPlay
              loop
              style={styles.imageAnimation}
            />
            <Text style={styles.textDialog}>
              Apakah Anda Yakin Ingin Keluar???
            </Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 20,
            }}>
            <CustomButton
              onPress={() => setIsDialogVisible(false)}
              type={'secondary'}
              title={'Tidak'}
              style={{width: '40%'}}
            />
            <CustomButton
              onPress={() => onLogout()}
              type={'primary'}
              title={'Ya'}
              style={{width: '40%'}}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
}

export default AkunScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    marginHorizontal: 16,
  },

  version: {
    fontFamily: FONTS.primary[600],
    fontSize: SIZE.font12,
    color: COLORS.text.subtitle,
    marginTop: 16,
    alignSelf: 'center',
  },

  placeholder: {
    borderRadius: RADIUS.xLarge,
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    alignSelf: 'center',
  },

  photoSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  imageAnimation: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    alignSelf: 'center',
  },
  dialog: {
    backgroundColor: COLORS.background.primary,
  },

  textDialog: {
    fontFamily: FONTS.primary[800],
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});

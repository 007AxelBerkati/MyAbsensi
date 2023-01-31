import React, {useEffect} from 'react';
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
import {CardList, Headers, Profile} from '../../components';
import {getData} from '../../plugins';
import {
  getAkun,
  RootState,
  signOutUser,
  useAppDispatch,
  useAppSelector,
} from '../../reduxx';

import {
  COLORS,
  FONTS,
  RADIUS,
  SIZE,
  windowHeight,
  windowWidth,
} from '../../theme';
import BackgroundService from 'react-native-background-actions';

function AkunScreen({navigation}: any) {
  const dispatch = useAppDispatch();

  const {loading, dataAkun} = useAppSelector(
    (state: RootState) => state.dataAkun
  );
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
            onPress={() => {
              Alert.alert(
                'Keluar',
                'Apakah anda yakin ingin keluar?',
                [
                  {text: 'Tidak', style: 'cancel'},
                  {text: 'Ya', onPress: () => onLogout()},
                ],
                {cancelable: false}
              );
            }}
          />
          <Text style={styles.version}>Version {version}</Text>
        </ScrollView>
      </View>
    </ImageBackground>
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
});

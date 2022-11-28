import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Fade, Placeholder, PlaceholderMedia} from 'rn-placeholder';
import {version} from '../../../package.json';
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

function AkunScreen({navigation}: any) {
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();
  const {loading, data} = useAppSelector((state: RootState) => state.dataAkun);
  useEffect(() => {
    if (isFocused) {
      getData('user').then((res: any) => {
        dispatch(getAkun(res.uid));
      });
    }
  }, [isFocused]);

  const onLogout = () => {
    dispatch(signOutUser(navigation));
  };

  const checkIsLoading = () => {
    if (loading) {
      return (
        <Placeholder Animation={Fade} style={styles.photoSection}>
          <PlaceholderMedia style={styles.placeholder} />
        </Placeholder>
      );
    }
    return <Profile source={{uri: data?.photo}} />;
  };

  return (
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
        <CardList type="akun" name="setting" title="Pengaturan Akun" />
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

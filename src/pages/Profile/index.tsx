import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
  const dataProfile = useAppSelector((state: RootState) => state.dataAkun);
  useEffect(() => {
    getData('user').then((res: any) => {
      dispatch(getAkun(res.uid));
    });
  }, []);

  const onLogout = () => {
    dispatch(signOutUser(navigation));
  };

  return (
    <View style={styles.pages}>
      <Headers title="Akun Saya" />

      <ScrollView>
        {dataProfile.loading ? (
          <Placeholder Animation={Fade} style={styles.photoSection}>
            <PlaceholderMedia style={styles.placeholder} />
          </Placeholder>
        ) : (
          <Profile source={{uri: dataProfile?.data?.photo}} />
        )}
        <CardList
          type="akun"
          name="edit"
          title="Ubah Akun"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <CardList type="akun" name="setting" title="Pengaturan Akun" />
        <CardList type="akun" name="logout" title="Keluar" onPress={onLogout} />
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

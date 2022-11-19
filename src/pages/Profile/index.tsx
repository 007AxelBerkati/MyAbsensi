import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {version} from '../../../package.json';
import {CardList, Headers} from '../../components';
import {removeData, removeDataSecure, signOut} from '../../plugins';
import {
  COLORS,
  FONTS,
  RADIUS,
  SIZE,
  windowHeight,
  windowWidth,
} from '../../theme';

function AkunScreen({navigation}: any) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = () => {
    signOut().then(() => {
      removeDataSecure('userLogin').then(() => {
        navigation.replace('Login');
      });
    });
  };

  return (
    <View style={styles.pages}>
      <Headers title="Akun Saya" />

      <ScrollView>
        {/* {dataProfile.isLoading ? (
          <Placeholder Animation={Fade} style={styles.photoSection}>
            <PlaceholderMedia style={styles.placeholder} />
          </Placeholder>
        ) : (
          // <Profile source={{uri: dataProfile.profile?.image_url}} />
          <ILNullPhoto />
        )} */}
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
    margin: 16,
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

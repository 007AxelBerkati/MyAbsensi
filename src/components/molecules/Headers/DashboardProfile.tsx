import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../../../theme';

type DashboardProfileProps = {
  photo: any;
  title: string;
  onPress: () => void;
};

function DashboardProfile({photo, title, onPress}: DashboardProfileProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.avaWrapper} onPress={onPress}>
        <Image source={photo} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
}

export default DashboardProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -5,
  },

  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },

  name: {
    fontSize: 23,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
    fontWeight: 'bold',
    marginTop: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  avaWrapper: {
    borderWidth: 1,
    borderRadius: 46 / 2,
  },
});

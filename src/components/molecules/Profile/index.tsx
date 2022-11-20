import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {IconRemovePhoto, ILNullPhoto} from '../../../assets';
import {windowHeight, windowWidth} from '../../../theme';

type ProfileProps = {
  isRemove?: boolean;
  onPress?: () => void;
  source?: any;
};

function Profile({isRemove, source, onPress}: ProfileProps) {
  return (
    <View style={styles.photoSection}>
      {!isRemove && (
        <View style={styles.photo}>
          <FastImage
            source={source !== null ? source : ILNullPhoto}
            style={styles.avatar}
          />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.photo} onPress={onPress}>
          <FastImage source={source} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  photo: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  photoSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    alignSelf: 'center',
  },
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});

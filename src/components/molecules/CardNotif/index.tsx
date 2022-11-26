import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, RADIUS, SIZE, windowWidth} from '../../../theme';
import {CustomButton} from '../../atoms';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string;
  photo: string;
  request: string;
  time: string;
  onPress: () => void;
  read: boolean;
  status: string;
};

const CardNotif = ({
  name,
  photo,
  request,
  time,
  onPress,
  read,
  status,
}: Props) => {
  const titleNotif = () => {
    switch (status) {
      case 'pending':
        return 'Berhasi Mengirimkan Permintaan';
      case 'accepted':
        return 'Permintaan Anda Diterima';
      case 'declined':
        return 'Permintaan Anda Ditolak';
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerNotif}>
      <FastImage source={photo} style={styles.photoProfile} />
      <View style={styles.descNotif}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.name}>
            {name} {``}
          </Text>
          {request === 'Izin' && (
            <Text style={styles.request}>
              {titleNotif()} {``}
            </Text>
          )}
          <Text style={styles.reqTitle}>{request}</Text>
        </View>

        <Text style={styles.time}>{time}</Text>
        <View style={styles.buttonWrapper}>
          <CustomButton
            title="Hallo"
            style={{
              padding: 16,
              marginRight: 16,
              backgroundColor: COLORS.success,
              borderColor: COLORS.success,
            }}
          />
          <CustomButton
            title="test"
            style={{
              padding: 16,
              backgroundColor: COLORS.warning,
              borderColor: COLORS.warning,
            }}
          />
        </View>
      </View>
      {read === false && (
        <Icon
          name="ellipse"
          color="red"
          size={10}
          style={{marginLeft: 'auto'}}
        />
      )}
    </TouchableOpacity>
  );
};

export default CardNotif;

const styles = StyleSheet.create({
  photoProfile: {
    height: 40,
    width: 40,
    borderRadius: RADIUS.large,
  },

  containerNotif: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.secondary,
    paddingVertical: 16,
  },

  buttonWrapper: {
    flexDirection: 'row',
    paddingTop: 4,
  },

  descNotif: {
    flexDirection: 'column',
    marginLeft: 16,
  },

  title: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
  },
  name: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
  },
  request: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
  },
  reqTitle: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
  },
  time: {
    fontSize: SIZE.font12,
    fontFamily: FONTS.primary[400],
    color: COLORS.text.subtitle,
    paddingTop: 6,
  },
});

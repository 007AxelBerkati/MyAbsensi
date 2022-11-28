import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, RADIUS, SIZE} from '../../../theme';
import {CustomButton} from '../../atoms';

type Props = {
  name: string;
  photo: string;
  request: string;
  time: string;
  onPress: () => void;
  read: boolean;
  status: string;
  role: string;
  onPressTerima: () => void;
  onPressTolak: () => void;
};

const CardNotif = ({
  name,
  photo,
  request,
  time,
  onPress,
  read,
  status,
  role,
  onPressTerima,
  onPressTolak,
}: Props) => {
  const titleNotif = () => {
    if (role === 'admin') {
      return 'Permintaan Izin';
    } else {
      switch (status) {
        case 'pending':
          return 'Permintaan Anda Sedang Diproses';
        case 'accepted':
          return 'Permintaan Anda Diterima';
        case 'declined':
          return 'Permintaan Anda Ditolak';
      }
    }
  };
  const statusReq = () => {
    if (role === 'admin') {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomButton
            title="Terima"
            style={{
              backgroundColor: COLORS.success,
              borderColor: COLORS.success,
              paddingHorizontal: 10,
              marginRight: 10,
            }}
            onPress={onPressTerima}
          />

          <CustomButton
            style={{
              backgroundColor: COLORS.warning,
              borderColor: COLORS.warning,
              paddingHorizontal: 10,
            }}
            onPress={onPressTolak}
            title={'Tolak'}
          />
        </View>
      );
    } else {
      switch (status) {
        case 'pending':
          return (
            <View style={styles.badgeStatus}>
              <Text style={styles.labelStatus}>Pending</Text>
            </View>
          );
        case 'accepted':
          return (
            <View style={styles.badgeStatusAccepted}>
              <Text style={styles.labelStatus}>Accepted</Text>
            </View>
          );
        case 'declined':
          return (
            <View style={styles.badgeStatusDeclined}>
              <Text style={styles.labelStatus}>Declined</Text>
            </View>
          );
      }
    }
  };
  return (
    <Pressable onPress={onPress} style={styles.containerNotif}>
      <FastImage source={photo} style={styles.photoProfile} />
      <View style={styles.descNotif}>
        <Text style={styles.title}>{titleNotif()}</Text>
        <Text style={styles.request}>{request}</Text>
        <Text style={styles.time}>{time}</Text>
        {statusReq()}
      </View>
      {read === false && (
        <Icon
          name="ellipse"
          color="red"
          size={10}
          style={{marginLeft: 'auto'}}
        />
      )}
    </Pressable>
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
    fontSize: SIZE.font12,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.subtitle,
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
    paddingTop: 4,
    paddingBottom: 4,
  },

  badgeStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.background.tertiary,
    width: 80,
  },

  badgeStatusAccepted: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.success,
    width: 80,
  },

  badgeStatusDeclined: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.warning,
    width: 80,
  },

  labelStatus: {
    fontSize: SIZE.font12,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});

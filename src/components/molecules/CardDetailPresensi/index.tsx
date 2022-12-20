import {StyleSheet, Text, View, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import {COLORS, FONTS, RADIUS, SIZE} from '../../../theme';

type Props = {
  date: string;
  time: string;
  status: string;
  address: string;
  type: string;
};

const CardDetailPresensi = ({date, time, status, address, type}: Props) => {
  return (
    <View style={cardDetail(type)}>
      <Text style={titleText(type)}>
        {type === 'masuk' ? 'Absen Masuk' : 'Absen Keluar'}
      </Text>
      <Text style={desc(type)}>{time}</Text>
      <Text style={titleText(type)}>Status</Text>
      <Text style={desc(type)}>{status}</Text>
      <Text style={titleText(type)}>Alamat</Text>
      <Text style={desc(type)}>{address}</Text>
      <View style={{position: 'absolute', right: 0, padding: 16}}>
        <Text style={titleText(type)}>{date}</Text>
      </View>
    </View>
  );
};

export default CardDetailPresensi;

const cardDetail = (type: string): ViewStyle => ({
  backgroundColor:
    type === 'masuk' ? COLORS.background.tertiary : COLORS.background.primary,
  padding: 16,
  borderRadius: RADIUS.large,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: COLORS.border.primary,
  elevation: 2,
});

const titleText = (type: string): TextStyle => ({
  fontFamily: FONTS.primary[600],
  fontSize: SIZE.font14,
  color: type === 'masuk' ? COLORS.text.secondary : COLORS.text.primary,
  marginBottom: 4,
});

const desc = (type: string): TextStyle => ({
  fontFamily: FONTS.primary[800],
  fontSize: SIZE.font16,
  color: type === 'masuk' ? COLORS.text.secondary : COLORS.text.primary,
  marginBottom: 16,
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, RADIUS, SIZE} from '../../../theme';

type Props = {
  jamMasuk: string;
  jamKeluar: string;
  tanggal: string;
  type?: string;
  onPress: () => void;
  status?: string;
  date?: string;
};

const CardRiwayat = ({
  jamMasuk,
  jamKeluar,
  tanggal,
  onPress,
  status,
  date,
}: Props) => {
  if (status) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.containerRiwayat}>
        <View style={styles.descAbsen}>
          <Text style={styles.titleAbsen}>User Telah Izin</Text>
          <Text style={styles.textAbsen}>{status}</Text>
        </View>
        <View style={styles.descAbsen}>
          <Text style={styles.textTanggal}>{date}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerRiwayat}>
      <View style={styles.descAbsen}>
        <Text style={styles.titleAbsen}>Jam Masuk</Text>
        <Text style={styles.textAbsen}>{jamMasuk}</Text>
      </View>
      <View style={styles.descAbsen}>
        <Text style={styles.titleAbsen}>Jam Keluar</Text>
        <Text style={styles.textAbsen}>{jamKeluar}</Text>
      </View>
      <View style={styles.descAbsen}>
        <Text style={styles.textTanggal}>{tanggal}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardRiwayat;

const styles = StyleSheet.create({
  containerRiwayat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: COLORS.background.tertiary,
    marginVertical: 12,
    borderRadius: RADIUS.large,
  },

  descAbsen: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  titleAbsen: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
    paddingBottom: 4,
  },

  textAbsen: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
  },

  textTanggal: {
    fontSize: SIZE.font12,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.subtitle,
  },
});

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import {BcDashAdmin, ILNullPhoto} from '../../../assets';
import {CardDashboard, CardNotif, CardProfile} from '../../../components';
import {COLORS, FONTS, SIZE} from '../../../theme';

const DashboardAdmin = ({navigation}: any) => {
  return (
    <View style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardProfile
          name={'Axel Berkati'}
          title="Selamat Datang, "
          photo={ILNullPhoto}
        />
        <CardDashboard
          type="admin"
          user="20"
          hadir="16"
          belumHadir="4"
          title="Kehadiran Hari Ini"
        />

        <View>
          <Text style={styles.titleSection}>Absen Hari Ini</Text>
          <CardNotif
            photo={ILNullPhoto}
            request="Axel Berkati"
            status="hadir"
            time="08.00"
          />
          <CardNotif
            photo={ILNullPhoto}
            request="Axel Berkati"
            status="hadir"
            time="08.00"
          />
          <CardNotif
            photo={ILNullPhoto}
            request="Axel Berkati"
            status="hadir"
            time="08.00"
          />
          <CardNotif
            photo={ILNullPhoto}
            request="Axel Berkati"
            status="hadir"
            time="08.00"
          />
          <CardNotif
            photo={ILNullPhoto}
            request="Axel Berkati"
            status="hadir"
            time="08.00"
          />
          <CardNotif
            photo={ILNullPhoto}
            request="Axel Berkati"
            status="hadir"
            time="08.00"
          />
          <CardNotif
            photo={ILNullPhoto}
            request="Axel Berkati"
            status="hadir"
            time="08.00"
          />
          <CardNotif
            photo={ILNullPhoto}
            request="Axel Berkati"
            status="hadir"
            time="08.00"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardAdmin;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleSection: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
    marginTop: 16,
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {Headers} from '../../components';
import {RootState, useAppSelector} from '../../reduxx';
import {COLORS, FONTS, SIZE, windowWidth} from '../../theme';

const Location = ({navigation, route}: any) => {
  const {locationPresence} = route.params;
  const {location, distance} = useAppSelector(
    (state: RootState) => state.dataLocation
  );

  const renderDistanceLocation = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: windowWidth,
          height: 100,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: 'rgba(0,0,255,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {distance <= 0.05 ? (
          <Text
            style={{
              fontSize: SIZE.font16,
              fontFamily: FONTS.primary[600],
              color: COLORS.text.secondary,
            }}>
            Anda berada di lingkungan Sekolah
          </Text>
        ) : (
          <Text
            style={{
              fontSize: SIZE.font16,
              fontFamily: FONTS.primary[600],
              color: COLORS.text.secondary,
              textAlign: 'center',
            }}>
            {(distance - 0.1).toFixed(2)} KM lagi menuju sekolah
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.pages}>
      <View style={{paddingHorizontal: 16}}>
        <Headers
          type="back-title"
          title="Cek Jangkauan"
          onPress={() => navigation.goBack()}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        showsUserLocation>
        {locationPresence &&
          locationPresence.map((item: any, index: any) => {
            return (
              <Circle
                key={index}
                center={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
                radius={item.radius}
                strokeWidth={1}
                strokeColor="rgba(0,0,255,0.5)"
                fillColor="rgba(0,0,255,0.5)"
              />
            );
          })}
      </MapView>
      {renderDistanceLocation()}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
  },

  map: {
    width: windowWidth,
    height: '100%',
  },
});

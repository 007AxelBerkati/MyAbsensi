import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Headers} from '../../../components';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {RootState, useAppSelector} from '../../../reduxx';
import {COLORS, FONTS, windowWidth} from '../../../theme';
import useTrackingLocation from '../../../hooks/useTrackingLocation';
import {dummyData} from '../../../utils';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import {ILNullPhoto} from '../../../assets';

const TrackingAdmin = ({navigation}: any) => {
  const {dataTrackingLocation} = useTrackingLocation();

  let myMap: any;

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
        ref={ref => {
          myMap = ref;
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={dummyData.locationSchool}
        showsUserLocation>
        {dataTrackingLocation?.map((item: any) => {
          return (
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              key={item.id}
              title={item.fullname}
              description={item.pekerjaan}
              onPress={() => {
                myMap.fitToCoordinates(
                  [
                    {
                      latitude: item.latitude,
                      longitude: item.longitude,
                    },
                  ],
                  {
                    edgePadding: {
                      top: 50,
                      right: 50,
                      bottom: 50,
                      left: 50,
                    },
                    animated: true,
                  }
                );
              }}>
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.title}>{item.fullname}</Text>
                    <Text style={styles.description}>{item.pekerjaan}</Text>
                    <Svg width={125} height={120}>
                      <ImageSvg
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYmid slice"
                        href={item?.photo ? {uri: item.photo} : ILNullPhoto}
                      />
                    </Svg>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default TrackingAdmin;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
  },

  map: {
    width: windowWidth,
    height: '100%',
  },

  bubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background.primary,
    borderRadius: 6,
    borderColor: COLORS.outlineInput,
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },

  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: COLORS.background.primary,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },

  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: COLORS.background.secondary,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },

  title: {
    fontFamily: FONTS.primary[600],
    fontSize: 16,
    color: COLORS.text.primary,
  },

  description: {
    fontFamily: FONTS.primary[400],
    fontSize: 12,
    color: COLORS.text.subtitle,
    marginBottom: 5,
  },
});

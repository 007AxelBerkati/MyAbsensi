import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {Image as ImageSvg, Svg} from 'react-native-svg';
import {ILNullPhoto} from '../../../assets';
import {Headers} from '../../../components';
import useTrackingLocation from '../../../hooks/useTrackingLocation';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  getLocation,
} from '../../../reduxx';
import {COLORS, FONTS, windowWidth} from '../../../theme';

const TrackingAdmin = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();

  const {latitude, longitude} = route.params;

  const {dataTrackingLocation} = useTrackingLocation();

  const {location} = useAppSelector((state: RootState) => state.dataLocation);
  const mapRef = useRef(null);
  useEffect(() => {
    dispatch(getLocation(location.latitude, location.longitude));
  }, []);

  return (
    <View style={styles.pages}>
      <View style={{paddingHorizontal: 16}}>
        <Headers
          type="back-title"
          title="Tracking Location"
          onPress={() => navigation.goBack()}
        />
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }
            : {
                latitude: -6.175392,
                longitude: 106.824964,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }
        }
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
                mapRef.current.fitToCoordinates(
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
                    <Text style={styles.description}>
                      {moment(item.date).format('DD MMMM YYYY, HH:mm')}
                    </Text>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 20,
                        alignSelf: 'center',
                      }}>
                      <Svg style={{overflow: 'hidden'}}>
                        <ImageSvg
                          width="100%"
                          height="100%"
                          preserveAspectRatio="xMidYmid slice"
                          href={item?.photo ? {uri: item.photo} : ILNullPhoto}
                        />
                      </Svg>
                    </View>
                    {/* <Text>
                      <Image
                        style={{width: 100, height: 100}}
                        source={item?.photo ? {uri: item.photo} : ILNullPhoto}
                        resizeMode="cover"
                      />
                    </Text> */}
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          );
        })}
        <Circle
          center={{
            latitude: latitude,
            longitude: longitude,
          }}
          radius={100}
          strokeWidth={1}
          strokeColor="rgba(0,0,255,0.5)"
          fillColor="rgba(0,0,255,0.5)"
        />
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
    minWidth: 150,
    maxWidth: 300,
    // width: 150,
    alignItems: 'center',
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
    textTransform: 'uppercase',
  },

  description: {
    fontFamily: FONTS.primary[400],
    fontSize: 12,
    color: COLORS.text.subtitle,
    // marginBottom: 5,
  },
});

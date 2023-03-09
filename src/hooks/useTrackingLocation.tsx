import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {trackingLocationRef} from '../plugins';

const useTrackingLocation = () => {
  const [dataTrackingLocation, setDataTrackingLocation] = useState([]);

  useEffect(() => {
    try {
      trackingLocationRef()
        .get()
        .then(res => {
          const data: any = res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataTrackingLocation(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {dataTrackingLocation};
};

export default useTrackingLocation;

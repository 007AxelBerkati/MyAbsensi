import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {databaseRef} from '../plugins';

const useUser = () => {
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {}, [
    databaseRef()
      .ref('users')
      .once('value', snapshot => {
        setTotalUser(snapshot.numChildren());
      }),
  ]);

  return {totalUser};
};

export default useUser;

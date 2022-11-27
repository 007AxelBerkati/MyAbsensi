import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import {COLORS, RADIUS, windowWidth} from '../../../theme';

const EmptySkeletonNotif = () => {
  return (
    <Placeholder Animation={Fade}>
      <View
        style={{
          marginTop: 16,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border.primary,
          flexDirection: 'row',
        }}>
        <View>
          <PlaceholderMedia
            style={{
              marginRight: 16,
              width: 48,
              height: 48,
              borderRadius: RADIUS.large,
            }}
            size={90}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <PlaceholderLine width={windowWidth * 0.1} />
            <PlaceholderLine width={windowWidth * 0.04} />
          </View>
          <PlaceholderLine width={windowWidth * 0.15} />
          <PlaceholderLine width={windowWidth * 0.2} />
          <PlaceholderLine width={windowWidth * 0.2} />
        </View>
      </View>
    </Placeholder>
  );
};

export default EmptySkeletonNotif;

const styles = StyleSheet.create({});

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Chat, Dashboard, Profile, Riwayat} from '../pages';
import {COLORS, FONTS} from '../theme';

const Tab = createBottomTabNavigator();

const MainApp = ({navigation}: any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.secondary,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.primary[400],
        },
      }}>
      <Tab.Screen
        name="Beranda"
        component={Dashboard}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={
                focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          tabBarLabel: 'Riwayat',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'list-circle' : 'list-circle-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainApp;

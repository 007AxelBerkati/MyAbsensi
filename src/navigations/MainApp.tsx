import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Chat, Dashboard, Notif, Profile, Riwayat} from '../pages';
import {RootState, useAppSelector} from '../reduxx';
import {COLORS, FONTS} from '../theme';

const Tab = createBottomTabNavigator();

const MainApp = ({navigation}: any) => {
  const {role} = useAppSelector((state: RootState) => state.dataAuth);

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
      {role === 'user' && (
        <>
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
            name="Notifikasi"
            component={Notif}
            options={{
              tabBarLabel: 'Notifikasi',
              tabBarIcon: ({color, focused}) => (
                <Icon
                  name={focused ? 'notifications' : 'notifications-outline'}
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
                    focused
                      ? 'chatbubble-ellipses'
                      : 'chatbubble-ellipses-outline'
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
        </>
      )}

      {role === 'admin' && (
        <>
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
                    focused
                      ? 'chatbubble-ellipses'
                      : 'chatbubble-ellipses-outline'
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
        </>
      )}
    </Tab.Navigator>
  );
};

export default MainApp;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Chat,
  Dashboard,
  DashboardAdmin,
  Notif,
  NotifAdmin,
  Profile,
} from '../pages';
import {RootState, useAppSelector} from '../reduxx';
import {COLORS, FONTS, SIZE} from '../theme';

const Tab = createBottomTabNavigator();

const MainApp = ({navigation}: any) => {
  const {role} = useAppSelector((state: RootState) => state.dataAuth);

  const {totalNotif} = useAppSelector((state: RootState) => state.dataNotif);

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
              tabBarBadge: totalNotif > 0 ? totalNotif : null,
              tabBarBadgeStyle: {
                backgroundColor: COLORS.warning,
                paddingHorizontal: 2,
                paddingVertical: 2,
                fontFamily: FONTS.primary[400],
                fontSize: SIZE.font10,
                color: COLORS.text.primary,
              },
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
            component={DashboardAdmin}
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
            component={NotifAdmin}
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

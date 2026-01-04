import './global.css';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Home, BookOpen, Plus, TrendingUp, Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { HomeScreen } from './src/screens/HomeScreen';
import { DiaryListScreen } from './src/screens/DiaryListScreen';
import { NewDiaryScreen } from './src/screens/NewDiaryScreen';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View className="flex-1 bg-background items-center justify-center">
    <Text className="text-white text-lg font-bold">{name} Screen</Text>
    <Text className="text-gray-500">Coming Soon</Text>
  </View>
);

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <LinearGradient
      colors={['#10B981', '#059669']}
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Plus color="white" size={30} />
    </LinearGradient>
  </TouchableOpacity>
);

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#1E1E1E',
    borderTopColor: '#333',
    height: 90, // Taller tab bar
    paddingTop: 8,
  },
  tabBarShowLabel: true,
  tabBarActiveTintColor: '#10B981',
  tabBarInactiveTintColor: '#6B7280',
  tabBarLabelStyle: {
    fontSize: 10,
    marginBottom: 8,
    marginTop: 4,
    fontWeight: '600',
  },
};

const ExploreScreen = () => <PlaceholderScreen name="Explore" />;
const SettingsScreen = () => <PlaceholderScreen name="Settings" />;

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions as any}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Diaries"
        component={DiaryListScreen}
        options={{
          tabBarLabel: 'Diaries',
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="NewDiary"
        component={NewDiaryScreen}
        options={{
          tabBarLabel: '',
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarStyle: { display: 'none' }
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('NewDiaryStack');
          },
        })}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => <TrendingUp color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

// We need a Stack Navigator to handle "New Diary" properly as a modal or pushed screen
// because it has a header with "Save" and Back button.
// Also to hide the tab bar when on that screen.
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="NewDiaryStack"
            component={NewDiaryScreen}
            options={{
              presentation: 'card',
              animation: 'slide_from_bottom'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

import './global.css';
import './src/i18n';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home, BookOpen, Plus, Settings, PieChart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import { HomeScreen } from './src/screens/HomeScreen';
import { DiaryListScreen } from './src/screens/DiaryListScreen';
import { NewDiaryScreen } from './src/screens/NewDiaryScreen';
import { PortfolioScreen } from './src/screens/PortfolioScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { DiaryDetailScreen } from './src/screens/DiaryDetailScreen';
import { StockSearchScreen } from './src/screens/StockSearchScreen';
import { PortfolioAllocationScreen } from './src/screens/PortfolioAllocationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
    height: 90,
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

const MainTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={screenOptions as any}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Diaries"
        component={DiaryListScreen}
        options={{
          tabBarLabel: t('tabs.diaries'),
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
        }}
      />

      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarLabel: t('tabs.portfolio'),
          tabBarIcon: ({ color }) => <PieChart color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('tabs.settings'),
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
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
            <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
            <Stack.Screen name="StockSearch" component={StockSearchScreen} />
            <Stack.Screen name="PortfolioAllocation" component={PortfolioAllocationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

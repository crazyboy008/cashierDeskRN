import * as React from 'react';
import {Button, StatusBar, StyleSheet, Platform} from 'react-native';
import {
  NavigationContainer,
  RouteProp,
  NavigationState,
  DefaultTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Login from '@/pages/Login';
import Collection from '@/pages/Collection'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#333',
    background: '#fff',
  },
};

const ModalStack = createStackNavigator();
const RootStack = createStackNavigator();

function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={() => ({
        ...TransitionPresets.ModalSlideFromBottomIOS,
        cardOverlayEnabled: true,
        gestureEnabled: true,
        headerTitleAlign: 'center',
        headerStatusBarHeight: StatusBar.currentHeight,
        headerBackTitleVisible: false,
      })}>
      <ModalStack.Screen
        name="Root"
        component={RootStackScreen}
        options={{headerShown: false}}
      />
      <ModalStack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: '登录',
        }}
      />
    </ModalStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerStatusBarHeight: StatusBar.currentHeight,
        headerStyle: {
          height: 30,
          headerTintColor: '#999999',
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          }),
        },
      }}>
      <RootStack.Screen name="BottomTabs" component={BottomTabs} />
      <RootStack.Screen
        name="Collection"
        component={Collection}
        options={{
          headerTitle: '收款',
        }}
      />
    </RootStack.Navigator>
  );
}

class AppNavigator extends React.Component {
  state = {
    navigationState: undefined,
  };

  onStateChange = (state) => {
    this.setState({
      navigationState: state,
    });
  };

  render() {

    return (
      <NavigationContainer
        theme={MyTheme}
        onStateChange={this.onStateChange}>
        <ModalStackScreen />
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
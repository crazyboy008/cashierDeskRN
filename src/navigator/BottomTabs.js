import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Me from '@/pages/Me';

const Tab = createBottomTabNavigator();

function getHeaderTitle(routeName) {
  switch (routeName) {
    case 'Home':
      return '首页';
    case 'Me':
      return '我的';
    default:
      return '';
  }
}


class BottomTabs extends React.Component {
  componentDidMount() {
    const {navigation, route} = this.props;
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params
      ? route.params.screen
      : 'Home';
      // alert(JSON.stringify(route))
    if (routeName === 'Home' || routeName === 'Me') {
      navigation.setOptions({
        headerTitle: '',
        headerTransparent: true,
      });
    } else {
      navigation.setOptions({
        headerTitle: getHeaderTitle(routeName),
        headerTransparent: false,
      });
    }
  }

  componentDidUpdate() {
    const {navigation, route} = this.props;
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params.screen || 'Home';
    if (routeName === 'Home' || routeName === 'Me') {
      navigation.setOptions({
        headerTitle: '',
        headerTransparent: true,
      });
    } else {
      navigation.setOptions({
        headerTitle: getHeaderTitle(routeName),
        headerTransparent: false,
      });
    }
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f86442',
          style: { height: 50 },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({focused, color, size}) => (
              <Image style={focused ? styles.active : styles.image} source={require("@/assets/imgs/ic_home_1.png")} />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={Me}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({focused, color, size}) => (
              <Image style={focused ? styles.active : styles.image} source={require("@/assets/imgs/ic_my_1.png")} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
  active: {
    width: 24,
    height: 24,
    tintColor: '#f86442'
  }
});

export default BottomTabs;

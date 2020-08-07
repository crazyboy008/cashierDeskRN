import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AppNavigator from './navigator/AppNavigator';

type Props = {};
export default class App extends Component<Props> {
  render() {
      return <AppNavigator />
  }
}

// const styles = StyleSheet.create({
// });

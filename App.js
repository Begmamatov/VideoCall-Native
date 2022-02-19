/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';

import ContactsScreen from './src/screens/ContactsScreen';
import CallingScreen from './src/screens/CallingScreen';

function App() {
  return (
    <SafeAreaView>
      <StatusBar />

      <CallingScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;

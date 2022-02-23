/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';

import Navigation from './src/navigation';

function App() {
  return (
    <>
      <StatusBar backgroundColor={'black'} />

      <Navigation />
    </>
  );
}

export default App;

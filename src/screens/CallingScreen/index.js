import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CallingScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>Alex</Text>
        <Text style={styles.phoneNumber}>ringing +99899 310 37 63</Text>

        <View style={styles.buttonsContainer}>
          <Ionicons name="camera-reverse" />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'red',
    height: '100%',
  },
  cameraPreview: {
    backgroundColor: '#7b4e88',
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
  },
  buttonsContainer: {
    backgroundColor: '#333333',
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default CallingScreen;

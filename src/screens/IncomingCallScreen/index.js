import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import bg from '../../../assets/images/ios.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const IncomingCallScreen = () => {
  const onDecline = () => {
    Alert.alert('On Declione', 'Bosma eeee');
  };

  const onAccept = () => {
    console.log('on Decline');
  };

  return (
    <View style={styles.root}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
        <Text style={styles.name}>Diyor Bula</Text>
        <Text style={styles.phoneNumber}>+99899 445 42 35</Text>

        <View style={[styles.row, {marginTop: 'auto'}]}>
          <View style={styles.iconsContainer}>
            <Ionicons name="alarm" color="white" size={30} />
            <Text style={styles.iconText}>Remind Me</Text>
          </View>

          <View style={styles.iconsContainer}>
            <Entypo name="message" color="white" size={30} />
            <Text style={styles.iconText}>Message</Text>
          </View>
        </View>

        <View style={styles.row}>
          {/* // Decline */}

          <Pressable onPress={onDecline} style={styles.iconsContainer}>
            <View style={styles.iconBox}>
              <Feather name="x" color="white" size={45} />
            </View>
            <Text style={styles.iconText}>Decline</Text>
          </Pressable>
          {/* // Accept */}

          <Pressable onPress={onAccept} style={styles.iconsContainer}>
            <View style={[styles.iconBox, {backgroundColor: '#2e7bff'}]}>
              <Feather name="check" color="white" size={45} />
            </View>
            <Text style={styles.iconText}>Accept</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    // flex: 1,
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
  bg: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 50,
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconBox: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },
});

export default IncomingCallScreen;

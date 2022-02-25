import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CallActionBox from '../../components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Voximplant} from 'react-native-voximplant';

import calls from '../Store';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callSatus, setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const {user, call: incomingCall, isIncomingCall} = route?.params;

  const voximplant = Voximplant.getInstance();

  const call = useRef(incomingCall);
  const endpoint = useRef(null);

  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted = (granted[
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      ] = 'granted');
      const cameraGranted = (granted[PermissionsAndroid.PERMISSIONS.CAMERA] =
        'granted');
      if (!cameraGranted | !recordAudioGranted) {
        Alert.alert('Permissions not granted');
      } else {
        setPermissionGranted(true);
      }
    };

    if (Platform.OS === 'android') {
      getPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }

    const callSetting = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };

    const makeCall = async () => {
      call.current = await voximplant.call(user.user_name, callSetting);

      subscribeToCallEvents();
    };

    const answerCall = async () => {
      call = calls.get(callId.current);
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvents();
      call.current.answer(callSetting);
    };

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        showError(callEvent.reason);
      });

      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Calling...');
      });

      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallStatus('Connected');
      });

      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigation.navigate('Contacts');
      });

      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );

      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvents();
      });
    };

    const subscribeToEndpointEvents = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endpointEvent => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        },
      );
    };

    const showError = reason => {
      Alert.alert('Call faild', `Reason: ${reason}`),
        [
          {
            text: 'Ok',
            onPress: navigation.navigate('Contacts'),
          },
        ];
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted]);

  const onHangupPress = () => {
    call.current.hangup();
  };

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <Ionicons name="chevron-back" color={'white'} size={30} />
      </Pressable>

      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        style={styles.localVideo}
      />

      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={styles.remoteVideo}
      />

      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>{callSatus}</Text>
      </View>

      <CallActionBox onHangupPress={onHangupPress} />
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#7b4e88',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  cameraPreview: {
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
  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: 'transparent',

    borderRadius: 10,

    position: 'absolute',
    right: 10,
    top: 20,
  },
  remoteVideo: {
    width: 200,
    height: 300,
    backgroundColor: 'transparent',

    borderRadius: 10,

    position: 'absolute',
    left: 10,
    bottom: 150,
  },
});

export default CallingScreen;

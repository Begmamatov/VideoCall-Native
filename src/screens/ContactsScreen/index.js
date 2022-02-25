import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Voximplant} from 'react-native-voximplant';
import dummyContacts from '../../../assets/data/contacts.json';

export default function ContactsScreen() {
  const [searchTerm, setSerachTerm] = useState('');
  const [filteredContacts, setFilteredContact] = useState(dummyContacts);

  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {call: incomingCallEvent.call});
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  });

  useEffect(() => {
    const newContacts = dummyContacts.filter(contact =>
      contact.user_display_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilteredContact(newContacts);
  }, [searchTerm]);

  const callUser = user => {
    navigation.navigate('Calling', {user});
  };

  return (
    <View style={styles.page}>
      <TextInput
        value={searchTerm}
        onChangeText={setSerachTerm}
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor={'#999'}
      />
      <FlatList
        data={filteredContacts}
        renderItem={({item}) => (
          <Pressable onPress={() => callUser(item)}>
            <Text style={styles.contactName}>{item.user_display_name}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  contactName: {
    fontSize: 16,
    marginVertical: 10,
    color: '#666',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
});

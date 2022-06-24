/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  PermissionsAndroid,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Contacts from 'react-native-contacts';

PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  {
    'title': 'Contacts',
    'message': 'This app would like to view your contacts.',
    'buttonPositive': 'Please accept bare mortal'
  }
)
  .then(Contacts.getAll()
    .then((contacts) => {
        // work with contacts
          console.log('Contacts permissions: true')
        })
          .catch((e) => {
              console.log(e)
          }))

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    getContactCounts();
    getAllContacts();
  }, [])

  const getAllContacts = async () => {
    let contactArr = []
    const result = await Contacts.getAll();
    result.forEach((item) => {
      contactArr = [...contactArr, { contactId: item.rawContactId, displayName: item.displayName, image: item.thumbnailPath, familyName: item.familyName, phoneNumber: item.phoneNumbers[0].number }]
    })
    console.log('getAllContacts(): ', result)
    setData(contactArr)
  }
  const getContactCounts = async () => {
    const result = await Contacts.getCount();
    console.log('getContactCounts(): ', result)
  }
  const getContactById = async (id) => {
    const result = await Contacts.getContactById(id)
    console.log('getContactById(): ', result)
  }
  const onCreateNewContact = async () => {
    const contact = {
      familyName: "Contact",
      givenName: "Test",
      phoneNumbers: [{
        label: "mobile",
        number: "+7 999 999 99 99"
      }]
    }
    const result = await Contacts.openContactForm(contact);
    console.log('onCreateNewContact(): ', result)
  }

  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity onPress={() => {
          getContactById(item.contactId)
        }}>
          <View style={{ flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ backgroundColor: 'blue', height: 50, width: 50, borderRadius: 9999, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 20 }}>{item.displayName.charAt(0).toUpperCase() + " " + item.familyName.charAt(0).toUpperCase()} </Text>
            </View>
            <View style={{ padding: 20, flex: 4 }}>
              <Text>{item.displayName}</Text>
              <Text>{item.phoneNumber}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
  }
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => {
        onCreateNewContact();
      }}>
        <Text>Create new contact</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.contactId}
      />
    </View>
  )
}


export default App;

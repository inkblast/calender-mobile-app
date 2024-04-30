import React, { useState } from 'react';
import { View, Text, TextInput, Button,SafeAreaView,StatusBar,TouchableOpacity,StyleSheet, Platform} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native'

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');
  const [notificationTime, setNotificationTime] = useState('');
  const [customNotificationTime, setCustomNotificationTime] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    const newEvent = {
      date: new Date(date),
      title,
      startTime,
      endTime,
      note,
      notificationTime,
      customNotificationTime,
    };
    onAddEvent(newEvent);
    setTitle('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setNote('');
    setNotificationTime('');
    setCustomNotificationTime('');
  };

  return (
    <SafeAreaView style={ styles.mainContainer}>
      <Text style={{ fontSize: 20, color: 'blue', backgroundColor: '#f0f0f5', padding: 4, fontWeight: 'bold', fontFamily: 'serif', marginBottom: 10 }}>Create Event</Text>
      <View style={{ maxWidth: '90%', alignSelf: 'center' }}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Date"
          value={date}
          onChangeText={setDate}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Start Time"
          value={startTime}
          onChangeText={setStartTime}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
        />
        <TextInput
          placeholder="End Time"
          value={endTime}
          onChangeText={setEndTime}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Note"
          value={note}
          onChangeText={setNote}
          multiline
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
        />
        <Text style={{ marginBottom: 10 }}>Notification Time:</Text>
        <Picker
          selectedValue={notificationTime}
          onValueChange={(itemValue) => setNotificationTime(itemValue)}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
        >
          <Picker.Item label="Select Notification Time" value="" />
          <Picker.Item label="15 minutes before" value="15" />
          <Picker.Item label="1 hour before" value="60" />
          <Picker.Item label="1 day before" value="1440" />
          <Picker.Item label="Select a specific date & time" value="custom" />
        </Picker>
        {notificationTime === 'custom' && (
          <TextInput
            placeholder="Custom Notification Time"
            value={customNotificationTime}
            onChangeText={setCustomNotificationTime}
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
          />
        )}
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={{color:'#fff'}}>Create Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Calender')}>
          <Text style={{color:'#fff'}}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  mainContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      height:'100%',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  btn:{
    width:250,
    height:40,
    backgroundColor:'#00394F',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    margin:20
  }
      
  })

export default EventForm;

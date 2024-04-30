import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView,StyleSheet,StatusBar, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native'


const holidaysData = [
  { date: '2024-04-12' },
  { date: '2024-04-13' },
  { date: '2024-05-01' },
];




const isHoliday = (date) => {
  return holidaysData.some((holiday) => holiday.date === date);
};

const isSameDay = (date1, date2) => {
  return moment(date1).isSame(date2, 'day');
};

function Calender() {
  const navigation = useNavigation();
  const [dateState, setDateState] = useState(moment().format('YYYY-MM-DD'));

  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const changeDate = (date) => {
    setDateState(date.dateString);
  };

  const dayComponent = ({ date }) => {
    let content = null;
    const eventsForDate = events.filter((event) => isSameDay(event.date, date));
    if (eventsForDate.length > 0) {
      content = (
        <View style={{ alignItems: 'center' }}>
          {eventsForDate.map((event, index) => (
            <View key={index} style={{ backgroundColor: 'green', borderRadius: 100, padding: 2, marginBottom: 2 }}>
              <Text style={{ color: 'white' }}>{event.title}</Text>
            </View>
          ))}
        </View>
      );
    } else if (isHoliday(date)) {
      content = (
        <View style={{ backgroundColor: 'red', borderRadius: 100, padding: 2 }}>
          <Text style={{ color: 'white' }}>{moment(date).format('MMMM Do YYYY')}</Text>
        </View>
      );
    }
    return content;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
    <View style={{ display:'flex', marginBottom: 16, justifyContent: 'center', alignItems: 'center' }}>
      <Calendar
        current={dateState}
        onDayPress={changeDate}
        markedDates={{ [dateState]: { selected: true } }}
        renderDay={dayComponent}
      />
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('EventForm',{addEvent:addEvent})}>
        <Text style={{color:'#fff'}}>Add Event</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

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
    margin:40
  }
      
  })

export default Calender;

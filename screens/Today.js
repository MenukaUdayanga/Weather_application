import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Today = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (country.trim() === '') {
      return;
    }

    const API_KEY = 'f35723917969d2ffdb6efed8797927b5';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, [country]);

  const kelvinToCelsius = kelvin => (kelvin - 273.15).toFixed(2);

  const formatTime = timestamp => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedTime;
  };

  return (
    <View style={styles.container}>

    
      <TextInput
        style={styles.input}
        placeholder="Enter country name"
        value={country}
        onChangeText={text => setCountry(text)}
      />
      <Button title="Search" onPress={() => setCountry(country)} />
      {weatherData && weatherData.main && weatherData.main.temp !== undefined ? (
        <>
          <Text style={styles.text}>{`Temperature: ${kelvinToCelsius(weatherData.main.temp)}°C`}</Text>
          <Text style={styles.text}>{`Humidity: ${weatherData.main.humidity}%`}</Text>
          <Text style={styles.text}>{`Sunrise: ${formatTime(weatherData.sys.sunrise)}`}</Text>
          <Text style={styles.text}>{`Sunset: ${formatTime(weatherData.sys.sunset)}`}</Text>
        </>
      ) : (
        <Text style={styles.text}>Weather data not available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
  topic:{
    color:'black'
  }
});

export default Today;

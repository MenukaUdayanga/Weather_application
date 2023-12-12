import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchForecastData(latitude, longitude);
      },
      error => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const fetchForecastData = async (latitude, longitude) => {
    const API_KEY = '7fc644d78fc22f6bedfcac2deccd2dc1';

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setForecastData(data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const kelvinToCelsius = kelvin => (kelvin - 273.15).toFixed(2);

  return (
    <View style={styles.container}>
      {forecastData ? (
        forecastData.list.map((item, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text>{`Time: ${item.dt_txt}`}</Text>
            <Text>{`Temperature: ${kelvinToCelsius(item.main.temp)}°C`}</Text>
            <Text>{`Humidity: ${item.main.humidity}%`}</Text>
           
          </View>
        ))
      ) : (
        <Text style={styles.text}>Forecast data not available</Text>
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
  forecastItem: {
    margin: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
});

export default Forecast;

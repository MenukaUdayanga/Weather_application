import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/1.jpg')}
        style={styles.backgroundImage}
      >
        <View>
          <Text style={styles.title}>Welcome to App</Text>
          <Text style={styles.subtitle}>Explore the amazing features!</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});

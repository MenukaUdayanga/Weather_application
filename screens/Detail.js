import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

export default function Detail() {
  const route = useRoute();
  const {itemId} = route.params;
  const [data, setData] = useState(null);
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.thecatapi.com/v1/breeds/${itemId}`,
        );
        setData(response.data);
        console.log('Data fetched successfully');
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.thecatapi.com/v1/images/search?limit=10`,
        );
        if (response.data && response.data.length > 0) {
          // Check if response data is not empty
          setPhoto(response.data[0].url);
        } else {
          setError('No image found');
        }
        console.log('Image fetched successfully');
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>Error: {error}</Text>}

      {/* Upload a image */}

      {data && (
        <View style={styles.oneCon}>
          {photo ? (
            <Image
              style={{width: '90%', height: 300, marginLeft: '5%'}}
              source={{uri: photo}}
            />
          ) : (
            <Text>No image available</Text>
          )}

          {/* Description about cate */}

          <View style={styles.twoCon}>
            <Text style={styles.fetchData}>
              <Text style={styles.desTitle}>Name of The Cate : </Text>
              {data.name}
            </Text>

            <Text style={styles.fetchData}>
              <Text style={styles.desTitle}>Life Span : </Text>
              {data.life_span}
            </Text>

            <Text style={styles.fetchData}>
              <Text style={styles.desTitle}>Description : </Text>
              {data.description}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  oneCon: {
    flex: 2,
    marginTop: 20,
  },
  twoCon: {
    flex: 2,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
  },
  desTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  fetchData: {
    color: 'black',
    textAlign: 'justify',
    fontSize: 17,
    marginTop: 10,
  },
});

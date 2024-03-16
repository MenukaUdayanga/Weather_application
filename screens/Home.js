import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCate = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetching data from the API
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        setData(response.data);
        console.log('Data fetched successfully');
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    getCate();
  }, []);

  const renderCate = ({item}) => (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => navigation.navigate('Cate Details', {itemId: item.id})}>
      <Text style={styles.cateName}>{item.name}</Text>
      <Text style={styles.arrIcon}>
        <Icon name="arrow-right" size={20} color="black" />
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>Error: {error}</Text>}
      {data.length > 0 && (
        <FlatList
          data={data}
          renderItem={renderCate}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: '#acdee3',
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  cateName: {
    color: 'black',
    fontSize: 17,
  },
  arrIcon: {
    position: 'absolute',
    right: 10,
  },
});

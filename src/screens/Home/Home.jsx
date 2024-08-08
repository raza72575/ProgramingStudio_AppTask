import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import Header from '../../components/Home/Header';
import { goBackIcon1 } from '../../utils/Images';
import HeaderMenu from '../../components/Home/HeaderMenu';
import HomeCard from '../../components/Home/HomeCard';
import { fetchFromApi } from '../../api/apiUtils'; 

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchData = useCallback(async (albumId = null) => {
    try {
      console.log("Fetching data...");
      const url = albumId ? `photos?albumId=${albumId}` : 'photos';
      const result = await fetchFromApi(url);
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header logoSource={goBackIcon1} title="Albums List"  secondTitle={"API RESULTS"}/>
      <View style={{ top: 15 }}>
        <HeaderMenu onAllClick={() => fetchData()} onSingleClick={(albumId) => fetchData(albumId)} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <HomeCard albumId={item.albumId} id={item.id} title={item.title} url={item.url} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  flatListContainer: {
    marginTop: 15,
  },
});

export default Home;

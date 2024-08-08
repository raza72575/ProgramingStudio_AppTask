import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import CustomButton from '../../components/global/CustomButton/CustomButton';
import { fetchFromApi } from '../../api/apiUtils';

// Custom button component for displaying each album ID
const AlbumButton = React.memo(({ title, onSingleClick }) => (
  <CustomButton onPress={() => onSingleClick(title)} title={`Album ${title}`} textColor='#737373' style={styles.button} />
));

const HeaderMenu = ({ onAllClick, onSingleClick }) => {
  const [albumIds, setAlbumIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API and extract unique album IDs
  const fetchData = useCallback(async () => {
    try {
      console.log("Fetching data...");
      const result = await fetchFromApi('photos');
      // Extract unique album IDs
      const uniqueAlbumIds = [...new Set(result.map(item => item.albumId))];
      setAlbumIds(uniqueAlbumIds);
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
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <CustomButton onPress={onAllClick} style={{borderRadius:12}} textColor='black' backgroundColor='#D3F36B' title={'All Albums'} />
        <FlatList
          data={albumIds}
          renderItem={({ item }) => <AlbumButton title={item} onSingleClick={onSingleClick} />}
          keyExtractor={item => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          decelerationRate='normal' // Slows down the deceleration rate
          scrollEventThrottle={32} // Reduces the frequency of scroll events
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 7,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    borderWidth: 0.1,
  },
  flatListContent: {
    alignItems: 'center',
  
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HeaderMenu;

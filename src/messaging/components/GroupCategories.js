import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const GroupCategoryList = [
  {
    gcatrow: '11',
    catname: 'Administration',
    caturl: 'administration',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '12',
    catname: 'Business',
    caturl: 'business',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '8',
    catname: 'Cyber Security',
    caturl: 'cybersecurity',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '2',
    catname: 'Entertainment',
    caturl: 'entertainment',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '5',
    catname: 'Environment',
    caturl: 'environment',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '10',
    catname: 'Health and Wellness',
    caturl: 'health-wellness',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '1',
    catname: 'Here and There',
    caturl: 'here-there',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '7',
    catname: 'Information Technology',
    caturl: 'it',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '6',
    catname: 'Network Marketing',
    caturl: 'network-marketing',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '3',
    catname: 'Pets',
    caturl: 'pets',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '9',
    catname: 'Travel and Tourism',
    caturl: 'travel-and-tourism',
    catstatus: '1',
    catimage: '',
  },
  {
    gcatrow: '4',
    catname: 'Wild Life',
    caturl: 'wild-life',
    catstatus: '1',
    catimage: '',
  },
];

const CategorySelector = ({onSelect, onClose}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    // Perform actions or state updates based on the selected category
    console.log('Selected category:', category);
    onSelect(category.catname);
    onClose();
  };

  const renderCategoryItem = ({item}) => {
    const isSelected =
      selectedCategory && selectedCategory.gcatrow === item.gcatrow;

    return (
      <TouchableOpacity
        onPress={() => handleCategorySelect(item)}
        style={styles.categoryItem}>
        <Text
          style={[styles.categoryName, isSelected && styles.selectedCategory]}>
          {item.catname}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={GroupCategoryList}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.gcatrow}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  categoryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  categoryName: {
    fontSize: 16,
  },
  selectedCategory: {
    fontWeight: 'bold',
    color: 'blue', // Change this to your desired selected color
  },
});

export default CategorySelector;

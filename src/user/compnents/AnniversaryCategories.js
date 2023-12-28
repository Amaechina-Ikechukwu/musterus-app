import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const CategoryList = [
  {
    title: 'In a relationship',
    value: 1,
  },
  {
    title: 'Married',
    value: 2,
  },
  {
    title: 'Divorced',
    value: 3,
  },
  {
    title: 'Single',
    value: 4,
  },
  {
    title: `Its's Complicated`,
    value: 5,
  },
  {
    title: 'Widowed',
    value: 6,
  },
  {
    title: null,
    value: 0,
  },
];

const AnniversaryCategorySelector = ({onSelect, onClose}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    // Perform actions or state updates based on the selected category
    console.log('Selected category:', category);
    onSelect(category.value);
    onClose();
  };

  const renderCategoryItem = ({item}) => {
    const isSelected =
      selectedCategory && selectedCategory.title === item.title;

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
        data={CategoryList}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.title}
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

export default AnniversaryCategorySelector;

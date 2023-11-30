import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getbirthdays} from '../apis/birthdays';
import {holidaysImages} from '../controllers/Cards';
import {Style} from '../../../assets/styles';
import {SendACard} from './SendACard';
const IMAGE_WIDTH = 74;
const IMAGE_HEIGHT = 130;
const BirthdayView = ({user, navigation}) => {
  const [birthdays, setBirthdays] = useState();
  const getBirthdays = async () => {
    const result = await getbirthdays(user);
    setBirthdays(result.birthdays);
  };
  useEffect(() => {
    getBirthdays();
  }, []);
  const renderStoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BirthdayWish', {
            user: item,
            image: holidaysImages[1].data[index] || holidaysImages[1].data[0],
          })
        }>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            width: 100,
            height: 150,
            marginRight: 10,
            borderRadius: 10,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          }}
          source={{
            uri: holidaysImages[1].data[index] || holidaysImages[1].data[0],
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 5,
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
            }}>
            <Text
              style={[
                Style.boldText,
                {
                  color: 'white',
                  fontWeight: 400,
                  textAlign: 'center',
                  fontSize: 14,
                },
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                Style.boldText2,
                {
                  color: 'white',
                  fontWeight: 400,
                  textAlign: 'center',
                  fontSize: 12,
                },
              ]}>
              {item.occurrence}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={birthdays}
      keyExtractor={item => item.id}
      renderItem={renderStoryItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
});

export default BirthdayView;

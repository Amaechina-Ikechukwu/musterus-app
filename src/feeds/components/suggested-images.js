import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
import {Style} from '../../../assets/styles';
import {Color} from '../../components/theme';
import {AddPhoto} from './icons';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {StaticImage} from '../../utilities';
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;
const Colors = Color();
export function SuggestedImages({data, setpickImage, image, chooseimage}) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.imagesContainer}>
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 20,
            }}>
            <Text
              style={{
                borderWidth: 1,
                borderColor: data.length > 500 ? Colors.red : Colors.dark,
                borderRadius: 100,
                paddingHorizontal: 17,
                paddingVertical: 10,
                color: data.length > 500 ? Colors.red : Colors.dark,
              }}>
              {500 - data.length}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => chooseimage}
            style={{marginHorizontal: 10}}>
            <AddPhoto />
          </TouchableOpacity>
          {Array.from({length: 10}, (_, index) => (
            <TouchableOpacity
              onPress={() => {
                setpickImage(true);
              }}
              key={index}
              style={styles.imageWrapper}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} src={StaticImage} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
    // backgroundColor:"red"
  },
  imagesContainer: {
    flexDirection: 'row',
  },
  imageWrapper: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginHorizontal: 5,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 13,
  },
  textWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    // backgroundColor: Colors.grey,
    // opacity: 0.8,
    height: '100%',
    bottom: 0,
    width: '100%',
    borderRadius: 13,
    padding: 3,
  },
  centerText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    zIndex: 1000,
  },
  // bottomText: {
  //     color: 'white',
  //     fontSize: 18,
  // },
});

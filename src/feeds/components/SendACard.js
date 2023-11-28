import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
import {Style} from '../../../assets/styles';
import {Color} from '../../components/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StaticImage} from '../../utilities';
const IMAGE_WIDTH = 74;
const IMAGE_HEIGHT = 130;
const Colors = Color();
export function SendACard({navigation}) {
  return (
    <View style={styles.container}>
      <Text
        style={[
          Style.LabelText,
          {
            paddingVertical: 15,
            paddingHorizontal: 10,
            color: '#204624',
            fontWeight: 400,
          },
        ]}>
        Send A Card
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.imagesContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MuterCards');
            }}
            style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://images.pexels.com/photos/6675835/pexels-photo-6675835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
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

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import {Color} from './theme';
import {ThreeDots} from '../events/components/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StaticImage} from '../utilities';

const Colors = Color();
export function NameDisplayCard({dot, muster, tag, navigation, link}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} src={StaticImage} />
        <View style={[styles.headerInfo, {flexDirection: 'row'}]}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "green"
            }}>
            <TouchableOpacity
              onPress={() => {
                if (!link) {
                  navigation.navigate('Profile');
                } else {
                  navigation.navigate('Chat', {screen: link});
                }
              }}>
              <Text style={styles.username}>John Doe</Text>
              <Text style={styles.usernameTag}>
                {tag ? tag : '@spicyyunaroll'}
              </Text>
            </TouchableOpacity>
          </View>

          {muster && (
            <>
              <View
                style={{
                  flex: 0.8,
                  // backgroundColor: "red",
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  // marginRight: 10,
                  // flex:1
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.primary,
                    height: 30,
                    width: 90,
                    borderRadius: 40,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>Muster</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {dot && (
            <View
              style={{
                flex: 0.6,
                // backgroundColor: "red",
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <ThreeDots />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#041616',
    fontFamily: 'Montserrat_ExtraBold',
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
    color: '#041616',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 5,
  },
  tweetImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 16,
    resizeMode: 'cover',
  },
  usernameTag: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Montserrat_Regular',
  },
  iconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
});

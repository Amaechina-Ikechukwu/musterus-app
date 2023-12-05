import {Text, View, ImageBackground, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Color} from '../../components/theme';
import {Logo, PlusIcon, SearchIcon} from './icons';
import {StaticImage} from '../../utilities';
import {useEffect} from 'react';

let Colors = Color();
export function FeedHeader({showCreatePost, navigation, image}) {
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  return (
    <>
      <View
        style={[
          {
            backgroundColor: Colors.primary,
            height: 75,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            position: 'absolute',
            zIndex: 1000,
          },
        ]}>
        <View
          style={{
            flex: 1.5,
            // backgroundColor: "green",
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <Logo />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            // backgroundColor: "red",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              // showCreatePost(true)
              navigation.navigate('CreatePost');
            }}>
            <PlusIcon />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <SearchIcon />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
              source={{uri: image || emptyimage}}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

import {Text, View, ImageBackground, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Color} from './theme';
import {
  Logo,
  OpenDrawerIcon,
  PlusIcon,
  SearchIcon,
} from '../events/components/icons';

let ImgUrl =
  'https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/324293849_3370804233196602_134225334160101172_n.jpg?_nc_cat=105&cb=99be929b-59f725be&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeHadWpDKaZmTwsY24VIN19Srl1RPqtckHSuXVE-q1yQdH9o_yt1WuoQps5qnC42voWOdi1D4OlIYaq39e7I1Ht6&_nc_ohc=K3fXPsmAaa0AX-QqmYs&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfBawaPypJwhLdAEc4K91wS6y2OfCsPbIDv4rwW0QBKSFw&oe=64D92A6E';
let Colors = Color();
export function HeaderComponent({
  showCreatePost,
  navigation,
  page,
  search,
  image,
}) {
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
            justifyContent: 'flex-end',
            paddingRight: 10,
          }}>
          {showCreatePost && (
            <TouchableOpacity
              onPress={() => {
                showCreatePost(true);
              }}>
              <PlusIcon />
            </TouchableOpacity>
          )}

          {search && (
            <TouchableOpacity>
              <SearchIcon />
            </TouchableOpacity>
          )}

          {page != 'Profile' && (
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
                src={ImgUrl}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          )}

          {page == 'Profile' && <OpenDrawerIcon />}
        </View>
      </View>
    </>
  );
}

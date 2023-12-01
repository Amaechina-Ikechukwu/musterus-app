import {Text, View, ImageBackground, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Logo} from '../../events/components/icons';
import {Color} from '../../components/theme';
import {LabelTexts} from '../../events/components/texts';
import {StaticImage} from '../../utilities';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useEffect} from 'react';

let Colors = Color();
export function Header({
  page,
  navigation,
  groupname,
  groupid,
  profile,
  groupphoto,
}) {
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const group = {groupid, groupname, groupphoto};
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
            zIndex: 100,
          },
        ]}>
        <View
          style={{
            flex: 2,
            // backgroundColor: "green",
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems:"center"
          }}>
          <TouchableOpacity>
            <Logo />
          </TouchableOpacity>
          {page && (
            <Text
              style={{
                color: Colors.light,
                fontSize: 16,
                marginTop: 6,
              }}>
              {'Group Messaging'}
            </Text>
          )}
        </View>
        {page == 'chat group' && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('update group', {
                groupid: groupid,
              });
            }}>
            <MaterialCommunityIcons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        )}
        <View
          style={{
            flex: 0.6,
            // backgroundColor: "red",
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              page == 'chat group'
                ? navigation.navigate('group info', {group: group})
                : navigation.navigate('Profile');
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
              source={{
                uri: profile?.user?.photourl || groupphoto || emptyimage,
              }}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.light,
              fontSize: 11,
            }}>
            {profile?.user?.username
              ? '@' + profile?.user?.username
              : profile?.user?.firstname || groupname}
          </Text>
        </View>
      </View>
    </>
  );
}

import {Text, View, ImageBackground, Image, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Logo} from '../../events/components/icons';
import {Color} from '../../components/theme';
import {LabelTexts} from '../../events/components/texts';
import {StaticImage} from '../../utilities';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useEffect} from 'react';
import {PlusIcon} from '../../feeds/components/icons';
import {connect} from 'react-redux';

let Colors = Color();
function Header({
  page,
  navigation,
  groupname,
  groupid,
  profile,
  groupphoto,
  isadmin,
  appState,
}) {
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const group = {groupid, groupname, groupphoto};
  const {Profile} = appState;
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
          {page == 'chat group' && (
            <Text
              style={{
                color: Colors.light,
                fontSize: 16,
                marginTop: 6,
              }}>
              {'Group '}
            </Text>
          )}
        </View>
        {page == 'chat group' && (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              gap: 25,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('create group post', {
                  groupid: groupid,
                });
              }}>
              <MaterialCommunityIcons name="plus" size={24} color="white" />
            </TouchableOpacity>
            {isadmin == true && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('update group', {
                    groupid: groupid,
                  });
                }}>
                <MaterialCommunityIcons name="pencil" size={18} color="white" />
              </TouchableOpacity>
            )}
          </View>
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
                uri: Profile?.avatar
                  ? `https://www.musterus.com${Profile?.avatar}`
                  : groupphoto || emptyimage,
              }}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.light,
              fontSize: 11,
            }}>
            {Profile?.username
              ? '@' + Profile?.username
              : Profile?.firstname || groupname}
          </Text>
        </View>
      </View>
    </>
  );
}
const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};

export default connect(mapStateToProps)(Header);

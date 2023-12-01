import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color} from '../../components/theme';
import {HeaderComponent} from '../../components/header';
import {BackIcon} from '../../../assets/icons/auth-icons';

import {Style} from '../../../assets/styles';
import {TouchableOpacity} from 'react-native';
import {PrimaryButton} from '../../components/buttons/primary';
import {setMyProfile} from '../../redux';
import {fullgroupinfo} from '../apis/groupinfo';
import UsersFlatlist from '../../muster-points/pages/UsersFlatlist';
const ProfileHeader = ({groupinfo, user, mykey, postlength}) => {
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  return (
    <View>
      <View
        style={{
          // backgroundColor: "red",
          marginTop: 10,
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Profile")
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 65,
            }}
            src={groupinfo?.group.photourl || emptyimage}
            resizeMode={'cover'}
          />
        </TouchableOpacity>

        <Text
          style={[
            Style.bolder,
            {
              marginTop: 10,
              marginBottom: 10,
            },
          ]}>
          {groupinfo?.group.name}
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              Style.TinyText,
              {
                margin: 10,
              },
            ]}>
            {groupinfo?.members?.length} Members
          </Text>
        </View>
        <Text
          style={[
            Style.TinyText,
            {
              margin: 10,
              textAlign: 'center',
            },
          ]}>
          {groupinfo?.group.description}
        </Text>
      </View>
    </View>
  );
};

const Colors = Color();

const GroupInfo = ({route, appState, setmyprofile}) => {
  const {User, Profile} = appState;
  const [groupData, setGroupData] = useState();
  const navigation = useNavigation();
  const {group} = route?.params;

  const getGroupInfo = async () => {
    const result = await fullgroupinfo(User?.mykey, group?.groupid);
    console.log(result.data.group);
    setGroupData(result.data);
  };

  useEffect(() => {
    getGroupInfo();
  }, []);

  if (groupData === null) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <HeaderComponent page={'Group Info'} navigation={navigation} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 100,
          // padding: 20
        }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <BackIcon />
            <Text style={styles.headerText}>{'Group Info'}</Text>
          </View>
          <View style={styles.profileContainer}>
            <ProfileHeader
              groupinfo={groupData}
              mykey={User?.mykey}
              navigation={navigation}
            />
            <UsersFlatlist
              navigation={navigation}
              //   Header={

              //   }
              //   userData={Profile?.user}
              data={groupData?.members}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setmyprofile: userData => dispatch(setMyProfile(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  headerText: {
    marginLeft: 15,
  },
  profileContainer: {
    marginTop: 20,
  },
});

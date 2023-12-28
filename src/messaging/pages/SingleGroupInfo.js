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
import {getgroupsview} from '../oldapis/groups/groupsview';
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
          gap: 10,
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
            src={
              `https://www.musterus.com${groupinfo?.groupheader}` || emptyimage
            }
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
          {groupinfo?.groupname}
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
          }}>
          <Image
            source={{uri: 'https://www.musterus.com' + groupinfo?.avatar}}
            style={{width: 40, height: 40, borderRadius: 100}}
          />
          <Text style={styles.author}>
            {groupinfo?.firstname + ' ' + groupinfo?.lastname}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text
            style={[
              Style.boldText2,
              {
                margin: 5,
                textAlign: 'center',
              },
            ]}>
            {groupinfo?.groupintro}
          </Text>
          <Text
            style={[
              Style.TinyText,
              {
                margin: 5,
                textAlign: 'left',
              },
            ]}>
            {'Category: ' + groupinfo?.catname}
          </Text>
          <Text
            style={[
              Style.TinyText,
              {
                margin: 5,
                textAlign: 'left',
              },
            ]}>
            {groupinfo?.publicgroup ? 'Private Group' : 'Public Group'}
          </Text>
          <Text
            style={[
              Style.TinyText,
              {
                margin: 5,
                textAlign: 'left',
              },
            ]}>
            {'Group Policy: ' + groupinfo?.grouppolicy}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Colors = Color();

const GroupInfo = ({route, appState, setmyprofile}) => {
  const {User, Group} = appState;
  const [groupData, setGroupData] = useState();
  const navigation = useNavigation();
  const {group} = route?.params;

  const getGroupInfo = async () => {
    const result = await getgroupsview(
      User?.mykey,
      User?.mskl,
      Group?.groupkey,
    );

    setGroupData(result.Members);
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
            <UsersFlatlist
              navigation={navigation}
              Header={
                <ProfileHeader
                  groupinfo={Group}
                  mykey={User?.mykey}
                  navigation={navigation}
                />
              }
              // userData={Profile?.user}
              data={groupData}
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
    height: '100%',
    width: '100%',
  },
});

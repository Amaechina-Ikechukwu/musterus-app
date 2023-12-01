import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {setGroup, setGroups} from '../../redux';
import {connect} from 'react-redux';

import {AllGroups} from '../apis/allgroups';

import {Color} from '../../components/theme';
import {joingroup} from '../apis/updategroup copy';
import {MyGroups} from '../apis/groups';
const {width} = Dimensions.get('screen');
export function SuggestionHeader({
  appState,
  groupsData,
  navigation,
  mykey,
  setgroups,
  item,
  index,
  getGroups,
}) {
  const [join, setJoin] = useState(false);
  const {User} = appState;

  const getMyGroups = async () => {
    const result = await MyGroups(User.mykey);

    setgroups(result?.groups);
  };
  const joinGroup = async item => {
    try {
      if (join !== true) {
        await joingroup(User?.mykey, item?.groupId);
        setJoin(true);
        getMyGroups();
        getGroups();
        navigation.navigate('chat group', {
          groupid: item?.groupId,
          groupname: item?.group?.name,
        });
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      return null;
    }
  };
  const color = Color();
  useEffect(() => {
    getGroups();
  }, []);
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  return (
    <View key={index}>
      <View
        style={{
          alignItems: 'center',
          width: width * 0.9,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image
            source={{uri: item?.group?.photourl || emptyimage}}
            style={{width: 50, height: 50, borderRadius: 50}}
          />

          <View style={[{flexDirection: 'row'}]}>
            <View
              style={
                {
                  // backgroundColor: "green"
                }
              }>
              <Text style={{fontSize: 16, fontWeight: '400'}}>
                {item?.group.name}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '300'}}>
                {item?.group.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            key={index}
            onPress={() => joinGroup(item)}
            style={{
              backgroundColor: color.primary,
              padding: 10,
              borderRadius: 5,
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 14, fontWeight: '300', color: color.white}}>
              {join ? 'Joined' : ' Join Group'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

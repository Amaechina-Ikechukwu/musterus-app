import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackIcon} from '../../../assets/icons/auth-icons';

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.pop();
      }}
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <BackIcon />
    </TouchableOpacity>
  );
}

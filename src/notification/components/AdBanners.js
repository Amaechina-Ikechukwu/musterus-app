import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {adbanner} from '../apis/adbanner';
import {Style} from '../../../assets/styles';
import {PrimaryButton} from '../../components/buttons/primary';
import * as Linking from 'expo-linking';
export default function AdBanners({User}) {
  const [data, setData] = useState();
  const link = `https://www.musterus.com/advertisements/order/?mykey=${User?.mykey}`;
  const orderlink = `https://www.musterus.com/advertisements/myorders/?mykey=${User?.mykey}`;
  const renderItem = ({item}) => {
    const bannerlink = `https://www.musterus.com/advertisements/mybanners/order?step=1&banner=${item.bannerid}&mykey=${User?.mykey}`;
    return (
      <TouchableOpacity
        style={{height: 300, width: 200}}
        onPress={() => Linking.openURL(bannerlink)}>
        <ImageBackground
          source={{uri: 'https://www.musterus.com' + item.bannerfile}}
          imageStyle={{height: 400}}
          style={{justifyContent: 'flex-end', height: '100%'}}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              height: 50,
              padding: 5,
            }}>
            <Text style={[Style.boldText, {color: 'white'}]}>
              {item.bannername}
            </Text>
            <Text style={[Style.boldText2, {color: 'white'}]}>
              {item.uploaddate}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const getAdBanner = async () => {
    const result = await adbanner(User?.mykey, User?.mskl);
    setData(result?.MyAds);
  };
  useEffect(() => {
    getAdBanner();
  }, []);
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',

              width: '100%',
            }}>
            <Text style={[Style.boldText]}>
              Seems you haven't added an ad, click on the "Add New Banner"
              above.
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              gap: 5,
              width: '100%',
            }}>
            <PrimaryButton
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
              title=" My Orders"
              callBack={() => {
                Linking.openURL(orderlink);
              }}
            />

            <PrimaryButton
              style={{borderRadius: 5}}
              title="Add New Banner"
              callBack={() => {
                Linking.openURL(link);
              }}
            />
          </View>
        }
      />
    </View>
  );
}

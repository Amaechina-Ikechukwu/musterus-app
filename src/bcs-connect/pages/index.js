import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import {TextInput, Button, Icon, RadioButton} from 'react-native-paper';
import {Color} from '../../components/theme';
import {
  CustomLogin,
  SaveMetadata,
  fetchMetadata,
  localstorageSaveUserMedata,
  signinService,
  signupService,
} from '../../controllers/auth/authController';
import {Loader} from '../../components/loader';
import {connect} from 'react-redux';
import {
  FetchUserTime,
  surprise_state,
  user_state,
  Brethren,
  Connect_user,
} from '../../redux';
import {FetchGifts} from '../../controllers/items/itemsControllers';
import {UserCard} from '../components/user-cards';
import FilterButton from '../../components/buttons/filterButton';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {FetchAllUsers} from '../models';
import {CurrentDate} from '../../utilities';
import {Style} from '../../../assets/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import RNPaystack from 'react-native-paystack';

const Colors = Color();

function Connect({
  navigation,
  disp_user,
  appState,
  disp_fetchTime,
  disp_brethren,
  route,
  disp_viewUser,
}) {
  const [text, setText] = useState('');
  const [gender, setGender] = useState('');
  const {height} = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const handleTextChange = useCallback(
    value => {
      setText(value);
    },
    [setText],
  );

  const [loading, setLoading] = useState(false);
  let Brethren = appState.Brethren;
  const [data, setData] = useState({
    randomUsers: [],
  });

  // render random users
  function RandomUsers() {
    let fetch = () => {
      FetchAllUsers().then(data => {
        // console.log(data)
        if (data.data.length < 1) {
        } else {
          let rndUsers = data.data.sort(() => 0.5 - Math.random()).slice(0, 30);
          setData({
            ...data,
            randomUsers: rndUsers,
          });
          disp_brethren(data.data);
          disp_fetchTime({
            ...appState.FetchUserTime,
            usersFetch: CurrentDate(),
          });
          // console.log(rndUsers[0])
        }
        setLoading(false);
      });
    };
    setLoading(true);
    if (Brethren.length > 0) {
      if (appState.FetchUserTime.usersFetch == CurrentDate()) {
        let rndUsers = Brethren.sort(() => 0.5 - Math.random()).slice(0, 30);
        setLoading(false);
        setTimeout(() => {}, 500);
        setData({
          ...data,
          randomUsers: rndUsers,
        });
        // fetch()
      } else {
        fetch();
      }
    } else {
      fetch();
    }
    // setLoading(true)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      RandomUsers();
    });
    // console.log(Brethren[0].name)
    return unsubscribe;
  }, [navigation]);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = searchWord => {
    const newFilter = Brethren.filter(value => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setWordEntered(searchWord);
    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <>
      {/* <FilterButton title="Filter" icon={faFilter} onPress={() => {
                navigation.navigate("Payments")
            }} /> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          // marginTop: 20,
          backgroundColor: Colors.white,
          // backgroundColor: "green",
          // marginBottom: 15,
          position: 'absolute',
          // top: 10,
          // right: 19,
          zIndex: 2000,
          width: '100%',
          // height: 50,
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            // backgroundColor: "red",
            flex: 1,
            padding: 22,
          }}>
          <Text style={{color: Colors.dark}}>Search by name......</Text>
        </Pressable>

        <Pressable
          style={{
            // backgroundColor: "blue",
            flex: 1,
            padding: 12,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.light,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}>
            <Text style={[Style.boldText2, {color: Colors.primary}]}>
              Filter
            </Text>
            <FontAwesomeIcon
              size={20}
              style={{
                // flex: 1,
                color: Colors.primary,
                // opacity: 0.8,
                marginLeft: 10,
                // margin: 20,
              }}
              icon={faFilter}
            />
          </View>
        </Pressable>
      </View>

      {loading == true ? (
        <>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <ActivityIndicator />
          </View>
        </>
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <View style={styles.content}>
                {data.randomUsers.map((e, index) => {
                  return (
                    <UserCard
                      action={() => {
                        navigation.navigate('view-user', {e});
                      }}
                      disp_viewUser={disp_viewUser}
                      data={e}
                      Navigation={navigation}
                      key={index}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </SafeAreaView>

          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <TextInput
                  autoFocus
                  onFocus={() => {}}
                  value={wordEntered}
                  onChangeText={value => handleFilter(value)}
                  style={{width: '100%', backgroundColor: Colors.white}}
                  textColor={Colors.dark}
                  theme={{
                    colors: {
                      primary: Colors.dark,
                      background: 'white',
                      placeholder: 'red',
                    },
                    // roundness: 8,
                  }}
                  mode=" "
                  // multiline
                  label="Type the name to search"
                />

                {filteredData.length != 0 && (
                  <View>
                    {filteredData.slice(0, 4).map((value, index) => {
                      return (
                        <UserCard
                          action={() => {
                            navigation.navigate('view-user', {value});
                          }}
                          disp_viewUser={disp_viewUser}
                          setModalVisible={setModalVisible}
                          data={value}
                          Navigation={navigation}
                          key={index}
                          setWordEntered={setWordEntered}
                          setFilteredData={setFilteredData}
                        />
                      );
                    })}
                  </View>
                )}
              </View>
            </Modal>
          </View>
        </>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = (dispatch, encoded) => {
  return {
    disp_user: payload => dispatch(user_state(payload)),
    disp_fetchTime: payload => dispatch(FetchUserTime(payload)),
    disp_brethren: payload => dispatch(Brethren(payload)),
    disp_viewUser: payload => dispatch(Connect_user(payload)), // when tap on any user, dispatch their data to state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: "red",
    marginTop: 50,
  },

  textInput: {
    width: '100%',
    backgroundColor: Colors.light,
    height: 50,
    // borderWidth: 1,
    // borderColor: 'gray',
    // paddingLeft: 10,
    // borderRadius: 76, // Add a borderRadius of 16
  },
});

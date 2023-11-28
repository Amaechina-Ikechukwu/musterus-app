import {View, Text, StyleSheet, Image} from 'react-native';
import {Color} from '../../components/theme';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {CreateFeedHeader} from './createpost-header';
import {Divider} from 'react-native-paper';
import {AddPhoto, DividerIcon} from './icons';
import {BackIcon} from '../../../assets/icons/auth-icons';
import {LabelTexts} from './texts';
import {FlatInput, OutlinedInput} from '../../components/inputs';
import {PrimaryButton} from '../../components/buttons/primary';
import {UpcomingBirthdays} from './upcoming-birthdays';
import {SuggestedImages} from './suggested-images';
import {useEffect} from 'react';

const Colors = Color();
const IMAGE_WIDTH = '100%';
const IMAGE_HEIGHT = 380;

export function CreatePostModal({
  data,
  setData,
  showCreatePost,
  pickImage,
  setpickImage,
  image,
  chooseimage,
  createpost,
  fetchposts,
  progress,
}) {
  const CreateMyPost = () => {
    if (data.length > 3) {
      createpost();
      fetchposts();
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <View
        style={{
          display: 'flex',
          // flexDirection: "row",
          // justifyContent: "space-around",
          backgroundColor: Colors.background,
          // marginLeft: "5%",
          position: 'absolute',
          zIndex: 2000,
          width: '100%',
          height: '100%',
          elevation: 20,
          // paddingBottom: 22
        }}>
        <CreateFeedHeader />

        <ScrollView>
          <View
            style={
              {
                // margin: 15,
              }
            }>
            <View
              style={{
                padding: 15,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  showCreatePost(false);
                }}>
                <BackIcon />
              </TouchableOpacity>
              <LabelTexts
                text={progress ? `Uploading ${progress}%` : 'Create a post'}
                style={{marginLeft: 20}}
              />
            </View>
            <View
              style={{
                padding: 5,
              }}>
              <DividerIcon />
            </View>
            <View
              style={{
                padding: 15,
              }}></View>

            {/* post input */}
            {/* {data.length < 1 && <LabelTexts text="Say something about ths photo..." style={{ marginLeft: 20, color: "gray" }} />} */}
            <OutlinedInput
              style={{
                borderWidth: 0,
              }}
              multiline
              data={data}
              setData={setData}
              placeholder="Say something about ths photo..."
            />
          </View>

          {pickImage == true && (
            <View style={styles.imageWrapper}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} src={image} />
                <View style={styles.textWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setpickImage(false);
                    }}
                    style={{
                      // backgroundColor: "red",
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.centerText]}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <SuggestedImages
          setpickImage={setpickImage}
          data={data}
          image={image}
          chooseimage={() => chooseimage()}
        />

        <View>
          <PrimaryButton
            // loading={loading}
            noBG={data.length < 3 ? true : false}
            style={{
              width: '90%',
              marginLeft: '5%',
              textTransform: 'uppercase',
              marginTop: 20,
              marginBottom: 40,
              backgroundColor:
                data.length < 0
                  ? Colors.inactiveButton
                  : data.length < 0
                  ? Colors.inactiveButton
                  : pickImage == true || data.length > 0
                  ? Colors.primary
                  : Colors.inactiveButton,
            }}
            callBack={() => {
              CreateMyPost();
            }}
            title={`Post `}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    // width: IMAGE_WIDTH,
    // height: IMAGE_HEIGHT,
    // marginHorizontal: 25,
    marginTop: 20,
  },
  imageContainer: {
    // flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    // borderRadius: 13
  },

  textWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flex: 1,
    // backgroundColor: Colors.grey,
    // opacity: 0.8,
    height: '100%',
    bottom: 0,
    width: '100%',
    padding: 5,
    // borderRadius: 13,
  },
  centerText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    zIndex: 1000,
  },
});

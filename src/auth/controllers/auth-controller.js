import {AddUser_meta, SaveTokenOnLogin} from '../../user/models/user-model';
import {DuesMonths, RegYears} from '../../utilities';

// import { Alert } from "react-native"
const {
  FetchMetaData,
  SignIn,
  SaveSuggestedUser,
  SaveFellowship,
  SaveUserAfterLogin,
} = require('../models/auth-models');

//  picking users number from input and making a querry
export const LoginController = ({
  phone,
  navigation,
  setLoading,
  Alert,
  disp_Login,
  Fcmoken,
}) => {
  setLoading(true);
  if (phone.length < 10) {
    Alert.alert('Invalid phone', 'Enter a valid phone number', [
      {
        text: 'Close',
      },
    ]);
    setLoading(false);
  } else {
    // console.log(phone.slice(-10))
    FetchMetaData(phone.slice(-10)).then(response1 => {
      if (response1.error != null) {
        setLoading(false);
        Alert.alert('Error', 'No internet access', [
          {
            text: 'Close',
          },
        ]);
      } else {
        // console.log(response1)
        if (response1.data.length < 1) {
          setLoading(false);
          Alert.alert('Error', 'Account donot exist', [
            {
              text: 'Close',
            },
          ]);
        }
        // console.log(response1)
        else {
          SaveSuggestedUser(response1.data[0]).then(res => {
            if (res == true) {
              if (response1.data[0].password == 'RIVABAS') {
                let payload = {
                  email: response1.data[0].meta.email,
                  password: 'RIVABAS',
                };
                // setLoading(false)
                SignIn(payload).then(response => {
                  SaveUserAfterLogin(response1.data[0]).then(res => {
                    if (res == true) {
                      disp_Login({
                        ...response1.data[0],
                        meta: {
                          ...response1.data[0].meta,
                          // Fcmoken
                        },
                      });
                      SaveFellowship(response1.data[0]).then(res => {});
                      navigation.replace('RESET PWD');
                    }
                  });
                });
              } else {
                disp_Login({
                  ...response1.data[0],
                  meta: {
                    ...response1.data[0].meta,
                    // Fcmoken
                  },
                });
                navigation.navigate('Add-password');
                setLoading(false);
              }
            } else {
              Alert.alert('Error', 'A system error occured', [
                {
                  text: 'Close',
                },
              ]);
            }
          });
        }
      }
    });
  }
};

// compare inputed password with querried password
export const continueWithPwd = ({
  password,
  navigation,
  setLoading,
  Alert,
  disp_Login,
  User,
  Fcmoken,
}) => {
  if (password.length < 4) {
    Alert.alert('Invalid Password', 'Enter a valid password', [
      {
        text: 'Close',
      },
    ]);
    setLoading(false);
  } else {
    setLoading(true);
    // console.log(User)
    let payload = {email: User.meta.email, password: password};
    // // let payload = { email: "info.freetalker@gmail.com", password: "hellopaul", }

    SignIn(payload).then(response => {
      // console.log(response)
      if (User.password != password) {
        Alert.alert('Error', 'Incorrect login details', [
          {
            text: 'Close',
          },
        ]);
        setLoading(false);
      } else {
        SaveUserAfterLogin({
          ...User,
          meta: {
            ...User.meta,
            finance: [],
            Fcmoken,
          },
        }).then(res => {
          if (res == true) {
            if (!User.meta.finance) {
              const payload = {
                data: {
                  ...User.meta,
                  finance: [],
                  Fcmoken,
                },
                user: User.phone,
              };
              AddUser_meta(payload).then(res => {});
              disp_Login({
                ...User,
                meta: {
                  ...User.meta,
                  finance: [],
                  Fcmoken,
                },
              });
            } else {
              disp_Login({
                ...User,
                meta: {
                  ...User.meta,
                  finance: [],
                  Fcmoken,
                },
              });
            }
            // disp_Login(User)

            // save device token to suer's public table
            const payload = {
              data: {
                ...User.meta,
                Fcmoken,
              },
              user: User.phone,
            };
            SaveTokenOnLogin(payload).then(res => {});
            // ===

            navigation.replace('Accounts');

            SaveFellowship(User).then(res => {});

            // console.log("Login page")
          }
        });
      }
    });
  }
};

import {Button, Icon, RadioButton} from 'react-native-paper';
import {Color} from './theme';
import {StyleSheet, TextInput} from 'react-native';
import {CalenderIcon} from '../../assets/icons/auth-icons';
const Colors = Color();

// export function OutlinedInputXX({
//     data,
//     setData,
//     placeholder,
//     dataCount,
//     count, style,
//     multiline,
//     autoFocus
// }) {
//     return (<>
//         {/* <TextInput
//             // keyboardType='numeric'
//             autoFocus={autoFocus}
//             value={data}
//             onChangeText={(value) => {
//                 if (dataCount) {
//                     if (data.length < count) {
//                         setData(value)
//                     }
//                 } else {
//                     setData(value)
//                 }
//             }}
//             style={[style,
//                 {
//                     width: "100%",
//                     marginTop: 20,
//                     height: 50
//                 }
//             ]}

//             textColor={Colors.dark}
//             outlineColor={Colors.inputOutlind}
//             activeOutlineColor="#999"
//             theme={{
//                 colors: {
//                     primary: Colors.dark,
//                     background: Colors.background,
//                     placeholder: "red",
//                 },
//                 roundness: 10,
//             }}
//             mode="outlined"
//             // right={<TextInput.Icon icon="account" />}
//             multiline={multiline}
//             label={placeholder}
//         /> */}
//     </>)
// }

export function OutlinedInput({
  data,
  setData,
  placeholder,
  dataCount,
  count,
  style,
  multiline,
}) {
  return (
    <>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        // value={cvv}
        value={data} // Display masked CVV
        onChangeText={text => setData(text)}
        maxLength={500}
        // keyboardType={type}
        placeholderTextColor="#888"
        height={55}
        multiline={multiline ? true : false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 30,
    paddingHorizontal: 10,
    color: 'black',
  },
});

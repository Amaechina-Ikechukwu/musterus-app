import {StyleSheet} from 'react-native';
import {Color} from '../src/components/theme';
const Colors = Color();
export const Style = StyleSheet.create({
  bolder: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.textColor,
    fontFamily: 'Montserrat_Regular',
  },
  boldText: {
    fontWeight: '600',
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: 'Montserrat_Regular',
  },
  boldText2: {
    fontWeight: '600',
    fontSize: 12,
    color: Colors.dark,
    fontFamily: 'Montserrat_Regular',
  },

  TextLink: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.primary,
    fontFamily: 'Montserrat_Regular',
  },

  LabelText: {
    fontWeight: '300',
    fontSize: 12,
    color: Colors.grey,
    fontFamily: 'Montserrat_light',
  },
  TinyText: {
    fontWeight: '300',
    fontSize: 13,
    color: '#7C7381',
    fontFamily: 'Montserrat_Regular',
  },

  Text: {
    fontWeight: '300',
    fontSize: 12,
    color: Colors.dark,
    fontFamily: 'Montserrat_Regular',
  },
});

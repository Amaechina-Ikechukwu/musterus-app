import { StyleSheet } from "react-native";
import { Color } from "../src/components/theme";
const Colors = Color()
export const Style = StyleSheet.create({
    bolder: {
        fontWeight: 600,
        fontSize: 25,
        color: Colors.textColor,
        fontFamily:"Montserrat"
    },
    boldText: {
        fontWeight: 600,
        fontSize: 20,
        color: Colors.textColor,
        fontFamily:"Montserrat"
    },
    boldText2: {
        fontWeight: 600,
        fontSize: 17,
        color: Colors.dark,
    },
 
    TextLink: {
        fontWeight: 400,
        fontSize: 15,
        color: Colors.primary,
    },

    LabelText: {
        fontWeight: 300,
        fontSize: 15,
        color: Colors.grey,
    },
    TinyText: {
        fontWeight: 300,
        fontSize: 13,
        color:"#7C7381",
    },

    Text: {
        fontWeight: 300,
        fontSize: 16,
        color: Colors.dark,
    }

});
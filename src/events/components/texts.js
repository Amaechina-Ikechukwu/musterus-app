import { Text } from "react-native"
import { Color } from "../../components/theme"
import { Style } from "../../../assets/styles"

const Colors = Color()

export function LabelTexts({
    text, style
}) {
    return (<>
        <Text style={[style, Style.Text, {
            color:Colors.dark
        }]} >
            {text}
        </Text>
    </>)
}
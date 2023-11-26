import { SuccessIcon } from "../../../assets/icons/auth-icons"
import { Style } from "../../../assets/styles"
import { PrimaryButton } from "../../components/buttons/primary"
import { Color } from "../../components/theme"
import { View, TouchableOpacity, Text } from "react-native"

export function SuccessAlert({
    navigation,
    loading,
    setModalVisible
}) {
    let Colors = Color()
    return (
        <>
            <View
                style={{
                    backgroundColor: Colors.background,
                    flex: 1,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 1000
                }}>
                <View style={{
                    width: "90%",
                    marginLeft: "5%",


                }} >



                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 80
                    }} >
                        <SuccessIcon />
                    </View>

                    <Text style={[
                        Style.boldText2,
                        {
                            marginTop: 30, marginBottom: 4,
                            textAlign: "center",
                            fontSize: 35,
                            fontWeight: 900
                        }]}>
                        Congrats !
                    </Text>
                    <Text style={{
                        marginBottom: 4,
                        color: Colors.grey, textAlign: "center",
                        fontSize: 14,
                        fontFamily: "Montserrat"
                    }}>
                        Account Created Succesfully
                    </Text>
                    <PrimaryButton
                        loading={loading}
                        style={{
                            width: "100%",
                            textTransform: 'uppercase',
                            marginTop: 50,
                        }} callBack={() => {
                            navigation.navigate("Get Started")
                            setModalVisible(false)
                            // console.log("Hello")
                        }} title={`Get Started `} />


                </View>
            </View>
        </>
    )
}
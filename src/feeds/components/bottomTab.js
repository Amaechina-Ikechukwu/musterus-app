import { View, Text } from "react-native";
import { Color } from "../../components/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GroupIcon, HomeIcon, MessagingIcon, NotificationIcon, PeopleIcon } from "./icons";

const Colors = Color()
export function BottomTab({
    page, navigation
}) {
    return (
        <>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: Colors.primary,
                marginLeft: "5%",
                position: 'absolute',
                bottom: 20,
                borderRadius: 40,
                zIndex: 1000,
                width: "90%",
                height: 50,
                elevation: 20
                // paddingBottom: 22
            }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Dashboard")
                    }}
                    style={{
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "flex-start",
                    }} >
                    <HomeIcon color={page == "Home" ? "#A8EFF0" : "white"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Muster Point")
                    }}
                    style={{
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "flex-start",
                    }} >
                    <PeopleIcon color={page == "MusterPoint" ? "#A8EFF0" : "white"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Group")
                    }}
                    style={{
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "flex-start",
                    }} >
                    <GroupIcon color={page == "Group" ? "#A8EFF0" : "white"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Notification")
                    }} style={{
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "flex-start",
                    }} >
                    <NotificationIcon color={page == "Notification" ? "#A8EFF0" : "white"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Chat")
                    }}
                    style={{
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "flex-start",
                    }} >
                    <MessagingIcon color={page == "Chat" ? "#A8EFF0" : "white"} />
                </TouchableOpacity>

            </View >
        </>
    )
} 
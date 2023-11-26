import { Text, View, ImageBackground, Image } from "react-native"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from "../../components/theme";
import { Logo, PlusIcon, SearchIcon } from "./icons";

let ImgUrl = "https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2"
let Colors = Color()
export function FeedHeader({
    showCreatePost, navigation
}) {
    return (
        <>
            <View style={[{
                backgroundColor: Colors.primary,
                height: 75,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
                position: "absolute",
                zIndex: 1000

            }]} >
                <View
                    style={{
                        flex: 1.5,
                        // backgroundColor: "green",
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity>
                        <Logo />
                    </TouchableOpacity>

                </View>

                <View
                    style={{
                        flex: 1,
                        // backgroundColor: "red",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <TouchableOpacity onPress={() => {
                        showCreatePost(true)
                    }} >
                        <PlusIcon />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Search")
                        }}  >
                        <SearchIcon />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Profile")
                    }} >
                        <Image
                            style={{
                                width: 30, height: 30,
                                borderRadius: 30,
                            }}
                            src={ImgUrl}
                            resizeMode={'cover'} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
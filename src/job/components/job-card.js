import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Divider, Avatar } from 'react-native-paper';
import { NumberWithCommas } from '../../utilities';
const Colors = Color()
export function CampaignCard({
    data, navigation
}) {
    return (
        <Pressable
            onPress={() => {
                navigation.navigate("View-job", { data })
                console.log(data)
            }}
            style={styles.container} >
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5
            }} >

                <Text style={[Style.boldText, {
                    flex: 2, marginLeft: 4
                }]} >
                    {data.meta.title}
                </Text>
            </View>

            {data.meta.employerType == 'Me' && <>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 2
                }} >
                    <Text style={[Style.LabelText, { color: Colors.grey, fontSize: 16, }]}>
                        Employer:

                    </Text>
                    <Text style={[Style.boldText2, { color: Colors.grey, fontSize: 16, }]}>
                        {data.poster}

                    </Text>
                </View>
            </>}

            {data.meta.employerType == 'Private Individual' && <>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 2
                }} >
                    <Text style={[Style.LabelText, { color: Colors.grey, fontSize: 16, }]}>
                        Employer:

                    </Text>
                    <Text style={[Style.boldText2, { color: Colors.grey, fontSize: 16, }]}>
                        {data.meta.company}

                    </Text>
                </View>
            </>}
            {data.meta.employerType == 'Registered Business' && <>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 2
                }} >

                    <Text style={[Style.boldText2, { color: Colors.grey, fontSize: 16, }]}>
                        @ {data.meta.company}

                    </Text>
                </View>
            </>}



            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 2
            }} >
                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                    {data.meta.location} ({data.meta.jobtype})
                </Text>
            </View>

            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5
            }} >
                <FontAwesomeIcon size={20} style={{
                    flex: 0.4,
                    color: "mediumseagreen",
                    opacity: 0.8,
                    // marginTop: 2,
                }}
                    icon={faCheckCircle} />
                <Text style={{
                    fontSize: 15, color: Colors.dark,
                    flex: 2, marginLeft: 4
                }} >
                    Actively recruiting - <Text style={[Style.boldText]} >₦{NumberWithCommas(data.meta.salary)}</Text>
                </Text>
            </View>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",

            }} >
                <Text style={{
                    fontSize: 15, color: Colors.dark,
                    flex: 2, marginLeft: 4
                }} >
                    Deadline
                </Text>
                <Text style={{
                    fontSize: 15, color: Colors.dark,
                    flex: 2, marginLeft: 4
                }} >
                    {data.deadline}
                </Text>
            </View>

        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
        // backgroundColor: "red",
        borderRadius: 4,
        elevation: 1,
        padding: 16,
        width: "100%",
        // marginLeft: "4%",
        marginBottom: 10
    },
});

import React from 'react';
import { View, StyleSheet, Text ,Pressable} from 'react-native';
import { Color } from '../../components/theme';
import { NavigationType } from 'react-router-dom';

const Colors = Color()
export function HistoryCard({
    navigation
}) {
    return (
        <Pressable 
        onPress={()=>{
            navigation.navigate("View-finance-history")
        }}
        style={styles.container} >
            <Text style={{ fontWeight: 900, fontSize: 15, color: Colors.dark }} >Donation of ₦50,000</Text>
            <Text style={{ color: Colors.grey, fontSize: 14,marginTop:10 }}>
                For CNCF INTER ZONAL SINGING EXERCISE 2023
            </Text>

            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop:10
            }} >
                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                    2023-06-29
                </Text>
                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                    10:48am
                </Text>

            </View>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fffdfd",
        borderRadius: 10,
        elevation: 1,
        padding: 16,  
        width: "92%",
        marginLeft:"4%",
        marginBottom:15
    },
});

import * as React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function Card({onPress, isTurnedOver, children}) 
{
    return(
        <Pressable 
            onPress={onPress} 
            style={isTurnedOver ? styles.cardUP : styles.cardDOWN}
        >
         {isTurnedOver ? (
            <Text style={styles.text}>{children}</Text>
         ) : (
            <Text style={styles.text}>?</Text>
         )}
        </Pressable>
    );
}


const styles = StyleSheet.create({
    cardUP: {
        width : 100,
        height : 100,
        margin : 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius:"25%",
        borderColor:"#334155",

        backgroundColor : "#1e293b"
    },
    cardDOWN: {
        width : 100,
        height : 100,
        margin : 10,
        borderWidth: 10,
        borderColor:"#334155",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:"25%",
        backgroundColor : "#1e293b"
    },
    text: {
        fontSize: 46,
        color:"#334155"
    }
})
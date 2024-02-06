import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../globals/style';
import { Feather } from '@expo/vector-icons';

const Bottomnav = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btncon1}>
      <AntDesign name="home" size={24} color="black" onPress={() => navigation.navigate("home")}/>
      </View>
      <View style={styles.btncon2}>
      <AntDesign name="search1" size={24} color="black" onPress={() => navigation.navigate("home")}/>
      </View>
      <View style={styles.btncon1}>
      <AntDesign name="shoppingcart" size={24} color="black" onPress={() => navigation.navigate("cart")}/>
      </View>
      <View style={styles.btncon1}>
      <Feather name="map" size={24} color="black" onPress={() => navigation.navigate("home")}/>
      </View>
    </View>
  )
}

export default Bottomnav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        elevation: 30,
        borderTopColor: colors.text1,
        borderTopWidth: 0.5,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    btncon1: {
        alignItems: 'center',
    },
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -20,
        backgroundColor: colors.text1,
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    icon2: {
        color: 'white',

    },
    icon1: {
        color: colors.text1,
    }
})
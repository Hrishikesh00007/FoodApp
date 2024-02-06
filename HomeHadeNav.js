import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../globals/style';

const HomeHadeNav = ({navigation}) => {
  return (
    <View style={styles.container}>
      <EvilIcons name="navicon" size={26} color="black" style={styles.myicon}/>
      <View style={styles.containerin}>
        <Text style={styles.mytext}>Foodie</Text>
        <Ionicons name="fast-food-outline" size={26} color="black" style={styles.myicon}/>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("userprofile")}>
      <FontAwesome name="user-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between",
        padding:10,
        alignItems:"center",
        backgroundColor:colors.col1,
        elevation:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    containerin:{
        flexDirection:"row",
        alignItems:"center"
    },
    myicon:{
        color:colors.text1
    } ,
    mytext:{
        color:colors.text1,
        fontSize:24
    }
})
export default HomeHadeNav
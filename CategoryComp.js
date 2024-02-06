import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../globals/style';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const CategoryComp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.box}>
        <FontAwesome5 name="hamburger" size={24} color="black" style={styles.myicon}/>
        <Text style={styles.text}>Burger</Text>
        </View>
        <View style={styles.box}>
        <Ionicons name="pizza" size={24} color="black" style={styles.myicon}/>
        <Text style={styles.text}>piza</Text>
        </View>
        <View style={styles.box}>
        <MaterialCommunityIcons name="noodles" size={24} color="black"  style={styles.myicon}/>
        <Text style={styles.text}>noodles</Text>
        </View>
        <View style={styles.box}>
        <Entypo name="drink" size={24} color="black" style={styles.myicon}/>
        <Text style={styles.text}>Drinks</Text>
        </View>
        <View style={styles.box}>
        <MaterialIcons name="icecream" size={24} color="black" style={styles.myicon}/>
        <Text style={styles.text}>Icecream</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default CategoryComp

const styles = StyleSheet.create({
  container:{
    backgroundColor:colors.col1,
    width:"100%",
    // height:100,
    // alignItems:"center",
    elevation:10,
    borderRadius:10
  },
  head:{
    color:colors.text1,
    fontSize:25,
    fontWeight:"300",
    margin:10,
    alignSelf:"center",
    paddingBottom:5,
    borderBottomWidth:1,
    borderBottomColor: colors.text1
  },
  box:{
    backgroundColor:colors.col1,
    elevation:20,
    margin:10,
    padding:10,
    borderRadius:10,alignItems:"center",
    justifyContent:"center"
  },
  myicon:{
    marginRight:10,
    color:colors.text3
  },
  text:{
    color:colors.text3
  }
})
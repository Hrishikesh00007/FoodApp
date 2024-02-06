import { View, Text, StatusBar, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHadeNav from '../components/HomeHadeNav'
import CategoryComp from '../components/CategoryComp'
import OfferSlider from '../components/OfferSlider'
import { Feather } from '@expo/vector-icons';
import { colors } from '../globals/style'
import { AntDesign } from '@expo/vector-icons';

import { firebase } from "../../FirebaseData/FirebaseConfig"
import CardSlider from '../components/CardSlider'
import Bottomnav from '../components/Bottomnav'

const HomeScreen = ({navigation}) => {
  const [foodData, setFoodData] = useState([])
  const [vegData, setVegData] = useState([])
  const [nonVegData, setNonVegData] = useState([])

  const foodRef = firebase.firestore().collection("FoodData")

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()))
    })
  },[])

  useEffect(()=>{
    setVegData(foodData.filter(item => item.foodType == "veg"))
    setNonVegData(foodData.filter(item => item.foodType == "non-veg"))
  },[foodData])
  // console.log(foodData);

const [search,setSearch] = useState("")
// console.log(search);
  return (
    <View style={styles.container}>
        <StatusBar />
        <HomeHadeNav navigation={navigation}/>
        <View style={styles.bottomnav}>
          <Bottomnav navigation={navigation}/>
        </View>


        <ScrollView>
        <View style={styles.searchbox}>
        <Feather name="search" size={24} color="black" style={styles.searchicon}/>
        <TextInput placeholder='search' style={styles.input} onChangeText={(text) => setSearch(text)}/>
        </View>
        {search != "" 
        && <View style={styles.searchresultouter}>
          <FlatList style={styles.searchresultinner}
          data={foodData}
          renderItem={({item}) => {
            if (item.foodName.toLowerCase().includes
            (search.toLocaleLowerCase())) {
              return (
                <View style={styles.searchresult}>
                  <AntDesign name="arrowright" size={24} color="black" />

                  <Text style={styles.searchresulttext}>{item.foodName}</Text>
                </View>
              )
            }
          }}
          />
        </View>
        }
        <CategoryComp />
        <OfferSlider />
      {/* <Text>HomeScreen</Text> */}
      <CardSlider title={"Today's Special"} data={foodData} navigation={navigation}/> 
      <CardSlider title={"Veg Mashala"} data={vegData} navigation={navigation}/> 
      <CardSlider title={"Nonveg Hunger"} data={nonVegData} navigation={navigation}/> 
      </ScrollView>
      </View>
  )
}
const styles = StyleSheet.create({
    container:{
      // marginTop:50,
        flex:1,
        backgroundColor:colors.col1,
        // alignItems:"center",
        width:"100%"
    },
    searchbox:{
        flexDirection:"row",
        width:"90%",
        backgroundColor:colors.col1,
        borderRadius:30,
        alignItems:"center",
        padding:10,
        margin:20,
        elevation:20
    },
    input:{
        marginLeft:10,
        width:"90%",
        fontSize:18,
        color:colors.text1
    },
    searchicon:{
        color:colors.text1
    },
    searchresultouter:{
      width:"100%",
      // height:"50%",
      marginHorizontal:30,
      backgroundColor:colors.col1
    },
    searchresultinner: {
      width:"100%"
    },
    searchresult:{
      width:"100%",
      flexDirection:"row",
      alignItems:"center",
      padding:5,
    },
    searchresulttext:{
      marginLeft:10,
      fontSize:18,
      color:colors.text1
    },
    bottomnav:{
      position:"absolute",
      bottom:0,
      width:"100%",
      backgroundColor:colors.col1,
      zIndex:20
    }
})
export default HomeScreen
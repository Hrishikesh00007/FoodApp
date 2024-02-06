import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { colors } from '../globals/style'

const OfferSlider = () => {
  return (
    <View>
      <View style={styles.offerslider}>
        <Swiper autoplay={true} autoplayTimeout={4} showsButtons={true} dotColor='red' activeDotColor='blue'>
          <View style={styles.slide}>
              <Image source={require("../../assets/3.png")} style={styles.image}/>
          </View>
          <View style={styles.slide}>
              <Image source={require("../../assets/3.png")} style={styles.image}/>
          </View>
          <View style={styles.slide}>
              <Image source={require("../../assets/5.jpg")} style={styles.image}/>
          </View>
        </Swiper>
      </View>
    </View>
  )
}
 
export default OfferSlider

const styles = StyleSheet.create({
  offerslider:{
    width:"100%",
    height:200,
    backgroundColor:colors.col1,
    paddingHorizontal:10,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:10,
  
  },
  slide:{
    width:"100%",
    height:200,
    backgroundColor:colors.text3,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20
  },
  image:{
    width:"100%",
    height:"100%",
    borderRadius:20
  }
})
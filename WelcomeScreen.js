import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from "../../assets/b.png"
import { colors, hr80 } from '../globals/style'
import {firebase} from "../../FirebaseData/FirebaseConfig"



const WelcomeScreen = ({navigation}) => {
  const [userlogged, setUserLogged] = useState(null)

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user)
          setUserLogged(user)
        } else {
          setUserLogged(null)
          console.log("no user logged in")
        }
      })
    }
    checklogin()
  },[])
  // console.log(userlogged)

const handleLogOut = () => {
  firebase.auth().signOut()
  .then(() => {
    setUserLogged(null)
    console.log("User loged out")
  })
  .catch((error) => {
    console.log(error)
  })
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fooddy</Text>
      <View style={styles.logoout}>
        <Image source={logo} style={styles.logo}/>
      </View>
      <View style={hr80}/>
      <Text style={styles.text}>Find the best food around you at lowest price</Text>
      <View style={hr80}/>

    {userlogged == null ? 
    <View style={styles.btnout}>
    <TouchableOpacity>
        <Text style={styles.btn} onPress={()=>navigation.navigate("signup")}>Sign Up</Text>
    </TouchableOpacity>
    <TouchableOpacity>
        <Text style={styles.btn} onPress={()=>navigation.navigate("login")}>Sign In</Text>
    </TouchableOpacity>
  </View>
  :
  <View style ={styles.logged}> 
  <Text style={styles.txtlog}>Signed in as &nbsp;
  <Text style={styles.txtlogin}>{userlogged.email}</Text>
  </Text>

    <View style={styles.btnout}>
        <TouchableOpacity>
            <Text style={styles.btn} onPress={()=>navigation.navigate("home")}>Go to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.btn} onPress={() => handleLogOut()}>Log Out</Text>
        </TouchableOpacity>
      </View>
  </View>
  }
    
    </View>
  )
}
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ff4242",
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    title:{
        fontSize:50,
        color:colors.col1,
        textAlign:"center",
        marginVertical:10,
        fontWeight:"200"
    },
    logoout:{
        width:"80%",
        height:"30%",
        // backgroundColor:"#fff",
        alignItems:"center"
    },
    logo:{
        width:"100%",
        height:"100%"
    },
    text:{
        fontSize:18,
        width:"80%",
        textAlign:"center",
        color:colors.col1
    },
    btnout:{
        flexDirection:"row"
    },
    btn:{
        fontSize:20,
        color:colors.text1,
        textAlign:"center",
        backgroundColor:"#fff",
        marginVertical:30,
        marginHorizontal:10,
        fontWeight:"700",
        borderRadius:10,
        padding:10,
        paddingHorizontal:20
    },
    logged:{
      alignItems:"center"
    },
    txtlog: {
      fontSize:18,
      color:colors.col1
    },
    txtlogin:{
      fontSize:20,
      color:colors.col1,
      fontWeight:"700",
      textDecorationStyle:"solid",
      textDecorationLine:"underline"
    }
})
export default WelcomeScreen
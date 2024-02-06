import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { btn1, colors, hr80, titles } from "../globals/style";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import {firebase} from "../../FirebaseData/FirebaseConfig"
const LoginScreen = ({navigation}) => {

  // for changing colour
  const [email, setEmail] = useState(false);
  const [password, SetPassword] = useState(false);
  const [showpass, SetShowpass] = useState(false);

  //from
  const [emaiId, setEmailId] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [customerError, setCustomerError] = useState("")


  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(emaiId,userPassword)
    .then((userCredential) => {
      var user = userCredential.user
      console.log("logged in sucessfully")
      // console.log(user)

      navigation.navigate("welcomePage")
    })
    .catch((error) => {
      var errorMessage = error.message
      console.log(errorMessage)
      if(errorMessage === "Firebase: The email address is badly formatted. (auth/invalid-email).") {
        setCustomerError("Pleace enter a valid email adress")
      }else{
        setCustomerError("Incorrect email or password")
      }
    })
  }


  return (
    
    <View style={styles.container}>
      <Text style={styles.head1}>Sign In</Text>
      {customerError !== "" && <Text style={styles.errormsg}>{customerError}</Text> }
      <View style={styles.inputout}>
        <AntDesign
          name="user"
          size={24}
          color={email === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmail(true)
            SetPassword(false)
            SetShowpass(false)
            setCustomerError("")
          }}
          onChangeText={(text) => {setEmailId(text)}}
        />
      </View>
      {/* eye-slash */}
      <View style={styles.inputout}>
      <AntDesign name="lock1" size={24} color={password === true ? colors.text1 : colors.text2} />
        <TextInput style={styles.input} placeholder="Password" onFocus={()=>{
            setEmail(false)
            SetPassword(true)
            SetShowpass(false)
            setCustomerError("")
        }}
        onChangeText={(text) => {setUserPassword(text)}}

        secureTextEntry = {showpass === false ? true : false}
        
        />
        <FontAwesome name={showpass==false ? "eye-slash" : "eye"} size={24} color="black" onPress={()=>SetShowpass(!showpass)}/>
      </View>


      <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
        <Text style={{color:colors.col1,fontSize:titles.btntext,fontWeight:"bold"}}>Sign In</Text>
      </TouchableOpacity>


      <Text style={styles.forgot}>Forgot Password</Text>
      <Text style={styles.or}>OR</Text>
      <Text style={styles.gftxt}>Sign in With</Text>


      <View style={styles.gf}>
        <TouchableOpacity>
        <View style={styles.gficon}><FontAwesome name="google" size={24} color="#EA4335" /></View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.gficon}><FontAwesome name="facebook-f" size={24} color="blue" /></View>
        </TouchableOpacity>
      </View>
 
      <View style={hr80}></View>

      <Text>Don't have an account?
        <Text style={{color:colors.text1}} onPress={()=>navigation.navigate("signup")}> Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 10,
  },
  inputout: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
    // alignSelf:"center"
    // elevation is use for SHADOW
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "80%",
  },
  forgot:{
    color:colors.text2,
    marginTop:20,
    marginBottom:10
  },
  or:{
    color:colors.text1,
    marginVertical:10,
    fontWeight:"bold"
  },
  gftxt:{
    color:colors.text2,
    marginVertical:10,
    fontSize:25
  },
  gf:{
    flexDirection:"row"
  },
  gficon:{
    backgroundColor:"white",
    width:50,
    margin:10,
    borderRadius:10,
    padding:10,
    alignItems:"center",
    elevation:20
  },
  errormsg: {
    color:"red",
    fontSize:18,
    textAlign:"center",
    marginTop:10,
    borderColor:"red",
    borderWidth:1,
    borderRadius:10,
    padding:10
  },
});
export default LoginScreen;

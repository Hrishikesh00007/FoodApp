import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { btn1, colors, hr80, titles } from "../globals/style";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {firebase} from '../../FirebaseData/FirebaseConfig'
import {createUserWithEmailAndPassword} from "firebase/auth"



 const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState(false);
  const [name, setName] = useState(false)
  const [phone,setPhone] = useState(false)
  
  const [password, SetPassword] = useState(false);
  const [showpass, SetShowpass] = useState(false);
  const [conpass, setConpass] = useState(false)
  const [showconpass, setShoeconpass] = useState(false)

  //taking Form data
  const [formemail, setFormEmail] = useState("");
  const [formname, setFormName] = useState("")
  const [formphone,setFormPhone] = useState("")
  const [formpassword, SetFormPassword] = useState("");
  const [formconpass, setFormConpass] = useState("")
  const [adress, setAdress] = useState("")

//error and sucess msg
  const [customError, setCustomError] = useState("")
  const [sucessMsg, setSucessMsg] = useState(null)

  const handleSignUp = () => {
      // const FromData = {
      //   formemail:formemail,
      //   formname:formname,
      //   formphone:formphone,
      //   formpassword:formpassword,
      //   // formconpass:formconpass,
      //   adress:adress,
      // }
      // console.log(FromData)

      if (formpassword != formconpass) {
        setCustomError("Password doesn't match")
        return;
      }
      //  if (formphone.length != 10) {
      //   setCustomError("Phone number should be 10 degit")
      //   return;
      // }
      
      try {
          firebase.auth().createUserWithEmailAndPassword(formemail,formpassword)
          .then((userCredential) => {
            console.log(userCredential?.user.uid)
            console.log("user created")
            
            if(userCredential?.user.uid){
              const useRef = firebase.firestore().collection
            ("UserData")
           
            useRef.add({
              formemail:formemail,
              formname:formname,
              formphone:formphone,
              formpassword:formpassword,
              // formconpass:formconpass,
              adress:adress,
              uid:userCredential?.user.uid
            }).then(() => {
              console.log("data added to firestore")
              setSucessMsg("user created sucessfully")
            }).catch((error) => {
              console.log("firestore error",error)
            })
            }
            
          }  )
          .catch((error) => {
            console.log("sign up firebase error", error.message)
            setCustomError("Email already exist")
          })
      } catch (error) {
        console.log("sign up system error", error.message)
      }
  }
   return (
<View style={styles.container}>
            {sucessMsg == null ?

      <View style={styles.container}>
      <Text style={styles.head1}>Sign Up</Text>
      {customError !== "" && <Text style={styles.errormsg}>{customError}</Text> }
  
      <View style={styles.inputout}>
        <AntDesign name="user" size={24} color={name === true ? colors.text1 : colors.text2}/>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onFocus={() => {
            setName(true)
            setEmail(false)
            SetPassword(false)
            SetShowpass(false)
            setConpass(false)
            setShoeconpass(false)
            setPhone(false)
            setCustomError("")
          }}
          onChangeText={(text) => setFormName(text)}
        />
        
      </View>
  
  
  
      <View style={styles.inputout}>
        <Entypo name="email" size={24} color={email === true ? colors.text1 : colors.text2}/>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmail(true)
            setName(false)
            SetPassword(false)
            SetShowpass(false)
            setConpass(false)
            setShoeconpass(false)
            setPhone(false)
            setCustomError("")
          }}
          onChangeText={(text) => setFormEmail(text)}
        />
      </View>
  
  
  
      <View style={styles.inputout}>
        <Entypo name="phone" size={24} color={phone === true ? colors.text1 : colors.text2} />
        <TextInput
          style={styles.input}
          placeholder="phone No"
          onFocus={() => {
            setPhone(true)
            setEmail(false)
            setName(false)
            SetPassword(false)
            SetShowpass(false)
            setConpass(false)
            setShoeconpass(false)
            setCustomError("")
          }}
          onChangeText={(text) => setFormPhone(text)}
        />
      </View>
  
  
   
      <View style={styles.inputout}>
      <AntDesign name="lock1" size={24} color={password === true ? colors.text1 : colors.text2} />
        <TextInput style={styles.input} placeholder="Password" onFocus={()=>{
            setEmail(false)
            SetPassword(true)
            setName(false)
            SetShowpass(false)
            setConpass(false)
            setShoeconpass(false)
            setPhone(false)
            setCustomError("")
        }}
        secureTextEntry = {showpass === false ? true : false}
        onChangeText={(text) => SetFormPassword(text)}
        />
        <FontAwesome name={showpass==false ? "eye-slash" : "eye"} size={24} color="black" onPress={()=>SetShowpass(!showpass)}/>
      </View>
  
  
      <View style={styles.inputout}>
      <AntDesign name="lock1" size={24} color={conpass === true ? colors.text1 : colors.text2} />
        <TextInput style={styles.input} placeholder="Confirm Password" onFocus={()=>{
            setEmail(false)
            setConpass(true)
            setName(false)
            SetPassword(false)
            setPhone(false)
            setCustomError("")
        }}
        secureTextEntry = {showconpass === false ? true : false}
        onChangeText={(text) => setFormConpass(text)}
        />
        <FontAwesome name={showconpass==false ? "eye-slash" : "eye"} size={24} color="black" onPress={()=>setShoeconpass(!showconpass)}/>
      </View>
  
  
        <Text style={styles.adress}>Pleace enter your Adress</Text>
        <View style={styles.inputout}>
          <TextInput  placeholder="Enter your Adress" onChangeText={(text) => setAdress(text)}
          onFocus={()=>{
            setEmail(false)
            setConpass(true)
            setName(false)
            SetPassword(false)
            setPhone(false)
            setCustomError("")
        }}/>
        </View>
  
  
  
      <TouchableOpacity style={btn1} onPress={() => handleSignUp()}>
        <Text style={{color:colors.col1,fontSize:titles.btntext,fontWeight:"bold"}}>Sign Up</Text>
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
  
      <Text>Already have an account?
        <Text style={{color:colors.text1}} onPress={()=>navigation.navigate("login")}> Sign In</Text>
      </Text>
    </View> 
  
:

              <View style={styles.container1}>
                    <Text style={styles.successmessage}>{sucessMsg}</Text>
                    <TouchableOpacity style={btn1} onPress={() => navigation.navigate('login')}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntext, fontWeight: "bold" }}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={btn1} onPress={() => setSucessMsg(null)}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntext, fontWeight: "bold" }}>Go Back</Text>
                    </TouchableOpacity>
                </View>

}
</View>
   )
 }
 

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    marginTop:50
  },
  container1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
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
    marginBottom:0,
    fontSize:25
  },
  gf:{
    flexDirection:"row"
  },
  gficon:{
    backgroundColor:"white",
    width:50,
    marginHorizontal:10,
    borderRadius:10,
    padding:10,
    alignItems:"center",
    elevation:20
  },
  adress:{
    fontSize:18,
    color:colors.text2,
    textAlign:"center",
    marginTop:10
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
  successmessage: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
}
});
 export default SignUpScreen
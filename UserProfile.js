import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {firebase} from "../../FirebaseData/FirebaseConfig"
import { AntDesign } from '@expo/vector-icons';
import { colors, navbtn, navbtnin, navbtnout } from '../globals/style';
const UserProfile = ({navigation}) => {

    const [userloggeduid, setUserLoggeduid] = useState(null)
    const [userdata,setUserdata] = useState(null)

    useEffect(() => {
      const checklogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // console.log(user)
            setUserLoggeduid(user.uid)
          } else {
            setUserLoggeduid(null)
           
          }
        })
      }
      checklogin()
    },[])
    // console.log(userloggeduid) 
    useEffect(() => {
        const getuserdata = async () => {
            const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
            const doc = await docRef.get();
            if (!doc.empty) {
                doc.forEach((doc) => {
                    setUserdata(doc.data());
                })
            }  
            else {
                console.log('no user data');
            }
        }
        getuserdata()
    },[userloggeduid])  
  return (
    <View style={styles.containerout}>
      <TouchableOpacity onPress={() => navigation.navigate("home")} style={navbtnout}>
        <View style={navbtn}>
        <AntDesign name="back" size={24} color="black" style={navbtnin}/>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
      <Text style={styles.head1}>Your Profile</Text>
                <View style={styles.containerin}>
                    <Text style={styles.head2}>Name: {userdata ? <Text style={styles.head2in}>
                        {userdata.formname}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Email: {userdata ? <Text style={styles.head2in}>
                        {userdata.formemail}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Phone: {userdata ? <Text style={styles.head2in}>
                        {userdata.formphone}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Address: {userdata ? <Text style={styles.head2in}>
                        {userdata.adress}
                    </Text> : 'loading'}</Text>
                </View>
      </View>
      {/* <Text>{userdata.formname}</Text>
      <Text>{userdata.formemail}</Text>
      <Text>{userdata.formphone}</Text>
      <Text>{userdata.adress}</Text> */}
    </View>
  )
}
const styles = StyleSheet.create({
    containerout:{
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
    },
    head1: {
        fontSize: 40,
        fontWeight: '200',
        marginVertical: 20,
        color: colors.text1,
    },
    containerin: {
        width: '90%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.text1,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    head2: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 20,

    },
})
export default UserProfile
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { btn1, colors, hr80, navbtn, navbtnin, navbtnout } from '../globals/style'
import { AntDesign } from '@expo/vector-icons';
import {firebase} from "../../FirebaseData/FirebaseConfig"

const Placeorder = ({navigation,route}) => {
    const {cartdata} = route.params
    const [orderdata, setOrderdata] = useState([])
    const [totalcost, setTotalcost] = useState("0")

    // console.log(cartdata)
    useEffect(() => {
        setOrderdata(JSON.parse(cartdata))
    },[cartdata])
    // console.log(orderdata)


    useEffect(() => {
        if (cartdata != null) {
            const foodprice = JSON.parse(cartdata).cart;
            let totalfoodprice = 0;
            foodprice.map((item) => {
                // console.log(item.data.foodPrice)
                totalfoodprice = (parseInt(item.data.foodPrice) * parseInt(item.Foodquantity)) +
                    (parseInt(item.data.foodAddOnPrice) * parseInt(item.Addonquantity)) + totalfoodprice;
            })
            // console.log(totalfoodprice)
            setTotalcost(JSON.stringify(totalfoodprice))
        }
    }, [cartdata])



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


    const placenow = () => {
        // const docRef = firebase.firestore().collection('UserOrders').doc(new Date().getTime().toString());
        // docRef.set({
        //     orderid: docRef.id,
        //     orderdata: orderdata.cart,
        //     orderstatus: 'pending',
        //     ordercost: totalcost,
        //     orderdate: firebase.firestore.FieldValue.serverTimestamp(),
        //     orderaddress: userdata.address,
        //     orderphone: userdata.phone,
        //     ordername: userdata.name,
        //     orderuseruid: userloggeduid,
        //     orderpayment: 'online',
        //     paymenttotal: totalcost
        // }).then(() => {
        //     alert('Order Placed Successfully')
        // })
        // navigation.navigate('home');
        // alert('Order Placed Successfully');
        // navigation.navigate('trackorders');
        alert("Sucessfull")
    }




  return (
    <ScrollView style={styles.containerout}>
         <TouchableOpacity onPress={() => navigation.navigate("home")} style={navbtnout}>
        <View style={navbtn}>
        <AntDesign name="back" size={24} color="black" style={navbtnin}/>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.head1}>Your order Summery</Text>
        <FlatList style={styles.c1} data={orderdata.cart} renderItem={
            ({item}) => {
                return (
                    <View style={styles.rowout}>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.qty}>{item.Foodquantity}</Text>
                                <Text style={styles.title}>{item.data.foodName}</Text>
                                <Text style={styles.price1}>{item.data.foodPrice}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.totalprice}>Rs.{parseInt(item.Foodquantity) * parseInt(item.data.foodPrice)}</Text>
                            </View>
                        </View>

                        {item.Addonquantity > 0 &&  <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.qty}>{item.Foodquantity}</Text>
                                <Text style={styles.title}>{item.data.foodName}</Text>
                                <Text style={styles.price1}>{item.data.foodPrice}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.totalprice}>Rs.{parseInt(item.Foodquantity) * parseInt(item.data.foodPrice)}</Text>
                            </View>
                        </View>
                        }
                    </View>
                )
            }
        }
        />
        <View style={hr80}></View>

        <View style={styles.row}>
            <View style={styles.left}>
                <Text style={styles.totalprice}>Rs.{totalcost}</Text>
            </View>
        </View>
        <View style={hr80}></View>
        <View style={styles.userdataout}>
                    <Text style={styles.head1}>Your Details</Text>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>Name :</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.title}>{userdata?.formname}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>Email :</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.title}>{userdata?.formemail}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>Phone :</Text>
                        </View>

                        <View style={styles.right}>
                            <Text style={styles.title}>{userdata?.formphone}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>Address :</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.title}>{userdata?.adress}</Text>
                        </View>
                    </View>
                </View>
                <View style={hr80}></View>

<View >
    <TouchableOpacity style={btn1}>
        <Text style={styles.btntext} onPress={() => placenow()}>Proceed to Payment</Text>
    </TouchableOpacity>
</View>
      </View>
    </ScrollView>
  )
}

export default Placeorder

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    head1: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.text1,
        margin: 10,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    rowout: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
    },

    qty: {
        width: 40,
        height: 30,
        backgroundColor: colors.text1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: colors.col1,
        fontSize: 17,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
    },
    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: colors.text1,
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        flexDirection: 'row',
    },
    totalprice: {
        fontSize: 17,
        fontWeight: 'bold',
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.col1,
        margin: 10,
    }
})
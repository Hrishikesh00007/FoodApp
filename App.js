import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserProfile from './src/screens/UserProfile';
import ProductPage from './src/screens/ProductPage';
import UserCart from './src/screens/UserCart';
import Placeorder from './src/screens/Placeorder';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <View style={styles.container}>
       <NavigationContainer>
       <Stack.Navigator initialRouteName='welcomePage'>
        <Stack.Screen name="welcomePage" component={WelcomeScreen} 
        options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={SignUpScreen} 
        options={{headerShown:false}}/>
        <Stack.Screen name="login" component={LoginScreen} 
        options={{headerShown:false}}/>
         <Stack.Screen name="home" component={HomeScreen} 
        options={{headerShown:false}}/>
        <Stack.Screen name="userprofile" component={UserProfile} 
        options={{headerShown:false}}/>
        <Stack.Screen name="productpage" component={ProductPage} 
        options={{headerShown:false}}/>
        <Stack.Screen name="cart" component={UserCart} 
        options={{headerShown:false}}/>
        <Stack.Screen name="placeorder" component={Placeorder} 
        options={{headerShown:false}}/>
      </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
  
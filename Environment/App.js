import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as firebase from 'firebase';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import {createAppContainer} from 'react-navigation';
var firebaseConfig = {
  apiKey: 'AIzaSyDdi1sGikD-FpXHnxxLlJaJ_vZhPAyCd28',
  authDomain: 'environmentloc.firebaseapp.com',
  databaseURL: 'https://environmentloc.firebaseio.com',
  projectId: 'environmentloc',
  storageBucket: 'environmentloc.appspot.com',
  messagingSenderId: '160908192187',
  appId: '1:160908192187:web:b07bb01d54ade77a34bc9e',
  measurementId: 'G-VLPD025WB8',
};
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

// const MainNavigator = createStackNavigator(
//   {
//     Home: {screens: HomeScreen},
//     SignIn: {screens: SignInScreen},
//     SignUp: {screens: SignUpScreen},
//   },
//   {initialRouteName: 'SignIn'},
// );
// const App = createAppContainer(MainNavigator);
// export default App;
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
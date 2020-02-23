import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import * as firebase from 'firebase';
import {Form, Item, Input, Label, Button} from 'native-base';
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
export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      email: '',
      password: '',
    };
  }
  static navigationOptions = {
    title: 'SignIn',
    header: null,
  };

  signInUser = (email, password) => {
    if (!this.isPressed) {
      this.isPressed = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.replace('Home');
        })
        .catch(error => {
          alert(error.message);
        });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          <View style={styles.logoContainer}>
            {/* <Image source={require("../assets/logo.png")} /> */}
            <Text></Text>
          </View>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={email => this.setState({email})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={password => this.setState({password})}
              />
            </Item>
            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                this.signInUser(this.state.email, this.state.password);
              }}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
          </Form>
          <View style={styles.footer}>
            <Text style={{paddingBottom: 20}}>OR</Text>
            <View style={styles.footerText}>
               <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("SignUp");
                }}
              >
                <Text>Create a new Account</Text>
              </TouchableOpacity> 
            </View>
          </View>
          <View style={styles.empty}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 100,
  },
  form: {
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
  },
  // empty: {
  //   height: 500,
  //   backgroundColor: "#FFF"
  // },
  footerText: {
    backgroundColor: '#FF3031',
    padding: 15,
    borderRadius: 7,
    fontWeight: 'bold',
  },
});

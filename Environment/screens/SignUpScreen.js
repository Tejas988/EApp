import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Form, Item, Button, Input, Label} from 'native-base';

import * as firebase from 'firebase';
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

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }
  addProfile = () =>
    new Promise((resolve, reject) => {
      var userId = firebase.auth().currentUser.uid;
      console.log(userId);

      var userProfile = {
        accepted: 0,
        rejected: 0,
        email: this.state.email,
      };

      firebase
        .database()
        .ref(`/user/${userId}`)
        .set(userProfile)
        .then(data => console.log(data))
        .catch(error => reject(error));
    });

  static navigationOptions = {
    title: 'SignUp',
    header: null,
  };

  signupUser = (name, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authenticate => {
        return authenticate.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            this.props.navigation.replace('Home');
            this.addProfile();
            console.log('Done');
          });
      })
      .catch(error => {
        alert(error.message);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={{marginTop: 100}}>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                onChangeText={name => this.setState({name})}
              />
            </Item>
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
                this.signupUser(
                  this.state.name,
                  this.state.email,
                  this.state.password,
                );
              }}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
          </Form>
          <View style={styles.footer}>
            <Text style={{paddingBottom: 20}}>OR</Text>
            <View style={styles.footerText}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SignIn');
                }}>
                <Text>Already having Account?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.empty} />
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
  footerText: {
    backgroundColor: '#7CEC9F',
    padding: 15,
    borderRadius: 7,
    fontWeight: 'bold',
  },
});

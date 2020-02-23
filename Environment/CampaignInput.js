import React, {Component} from 'react';
import {View, Text, TextInput, Image, Button} from 'react-native';
import * as firebase from 'firebase';

var FloatingLabel = require('react-native-floating-labels');

// var firebaseConfig = {
//   apiKey: 'AIzaSyDdi1sGikD-FpXHnxxLlJaJ_vZhPAyCd28',
//   authDomain: 'environmentloc.firebaseapp.com',
//   databaseURL: 'https://environmentloc.firebaseio.com',
//   projectId: 'environmentloc',
//   storageBucket: 'environmentloc.appspot.com',
//   messagingSenderId: '160908192187',
//   appId: '1:160908192187:web:b07bb01d54ade77a34bc9e',
//   measurementId: 'G-VLPD025WB8',
// };

// firebase.initializeApp(firebaseConfig);

export default class CampaignInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      company: '',
    };
  }

  sendData = () => {
    firebase
      .database()
      .ref('/campaign/' + this.state.name)
      .set({
        name: this.state.name,
        description: this.state.description,
        email: 'tejasghone73@gmail.com',
      });
  };

  render() {
    return (
      <View style={styles.container22}>
        <View style={styles.header}>
          <Text>Campaign Details</Text>
        </View>
        <View style={{paddingBottom: 20}}>
          <FloatingLabel
            multiline={true}
            onChangeText={text => {
              this.setState({name: text});
            }}>
            Campaign Name
          </FloatingLabel>
        </View>

        <View style={{borderWidth: 1, borderRadius: 10}}>
          <TextInput
            placeholder="Description"
            multiline={true}
            style={{fontSize: 20}}
            onChangeText={text =>
              this.setState({description: text})
            }></TextInput>
          <TextInput
            placeholder="Companies"
            multiline={true}
            style={{fontSize: 20}}
            onChangeText={text => this.setState({company: text})}></TextInput>
        </View>
        <View>
          <Button
            title="send"
            onPress={() => {
              this.sendData();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container22: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 70,
    alignItems: 'stretch',
  },
  container2: {
    flex: 4,
    justifyContent: 'space-around',
  },
  header2: {
    fontSize: 27,
    borderBottomColor: '#777872',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  header: {
    alignItems: 'center',

    flex: 0.1,
  },
  labelInput: {
    color: '#673AB7',
  },
  formInput: {
    marginLeft: 20,
    borderColor: '#333',
  },
  input: {
    borderWidth: 0,
  },
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: 'white',
  },
};

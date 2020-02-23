import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
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
//import { Avatar, Card, Title, Paragraph } from "react-native-paper";
export default class ListH extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: false,
    };
  }
  UNSAFE_componentWillMount() {
    this.getAll();
  }
  getAll = () => {
    let self = this;
    //TODO: get all contact from firebase
    let contactRef = firebase.database().ref('/barcode');
    //FIX: Snapshot
    contactRef.on('value', dataSnapshot => {
      if (dataSnapshot.val()) {
        let contactResult = Object.values(dataSnapshot.val());
        //console.log(contactResult);

        let contactKey = Object.keys(dataSnapshot.val());
        //console.log(contactKey);

        contactKey.forEach((value, key) => {
          contactResult[key]['key'] = value;
        });
        self.setState({
          flag: true,
          data: contactResult
            .sort((a, b) => {
              var nameA = a.rejected; // ignore upper and lowercase
              var nameB = b.rejected; // ignore upper and lowercase
              return nameA - nameB;

              // names must be equal
              return 0;
            })
            .reverse(),
        });
        console.log(this.state.data);
      }
    });
    //TODO:
    // sort array by fname and set it to data state
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.flag ? (
          <View>
            <Text style={{fontSize:40,color:'red'}}>Heat list</Text>
            <FlatList
              data={this.state.data}
              keyExtractor={(item, id) => id}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      paddingBottom: 20,
                      borderTopWidth: 1,
                    }}>
                    <Text style={{color: 'black', fontSize: 35, marginTop: 15}}>
                      {item.product}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffe6',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 100,
  },
});

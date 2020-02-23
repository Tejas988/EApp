import React from 'react';
import * as firebase from 'firebase';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import ListH from './List';
import CampaignInput from './CampaignInput';
import {RNCamera} from 'react-native-camera';
import {Barscan} from './screens';

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
const chemicals = {
  cyanide: 6,
  isocyanide: 10,
  lead: 12,
  deet: 40,
  cyflouthrine: 10,
  sodiumSulphide: 14,
  chromiumSulphate: 18,
  magnesiumOxide: 20,
};
export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-undef
    this.state = {
      ac: 0,
      rj: 0,
      chem: '',
      anima: null,
      emai: '',
      manifact: null,
      recycle: null,
      prod: null,
      isload: false,
      loadcom: false,
      code: -1,
      at: null,
      rt: null,
      barcode: null,
      barload: true,

      modalVisible: false,
      data: ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99'],
      num: Math.random() * 9,
      color: '#000',
      severity: 'good', // 1 good, 2 bad, 3 severe
    };
  }

  calculate() {
    let pers = 0;
    const st = this.state.chem;
    console.log(this.state.chem);
    Object.keys(chemicals).forEach(function(value) {
      if (st.includes(value)) {
        pers = pers + chemicals[value];
      }
    });
    if (this.state.animal) pers = pers + 50;
    if (!this.state.recycle) pers = pers + 20;

    let codee = -1;
    if (pers > 100) codee = 3;
    else if (pers >= 50) codee = 2;
    else codee = 1;

    this.setState({
      loadcom: true,
      code: codee,
    });
    if (this.state.code === 1) {
      this.setState({severity: 'good', color: '#090'});
    } else if (this.state.code === 2) {
      this.setState({severity: 'bad', color: '#bb0'});
    } else if (this.state.code === 3) {
      this.setState({severity: 'worst', color: '#f00'});
    }
  }
  accept = () => {
    var userID = firebase.auth().currentUser.uid;
    const a = this.state.ac + 1;
    this.setState({ac: a, modalVisible: false});
    console.log(this.state.ac);
    firebase
      .database()
      .ref('/barcode/100001')
      .update({
        accepted: a,
      });

    firebase
      .database()
      .ref('/user/' + userID)
      .once('value')
      .then(snapshot => {
        this.setState({at: snapshot.val().accepted});
        console.log(snapshot.val().accepted);
      });

    firebase
      .database()
      .ref('/user/' + userID)
      .update({
        accepted: this.state.at + 1,
      });
  };
  reje = () => {
    var userId = firebase.auth().currentUser.uid;
    const r = this.state.rj + 1;
    this.setState({modalVisible: false, rj: r});

    console.log(this.state.rj);

    firebase
      .database()
      .ref('/barcode/100001')
      .update({
        rejected: r,
      });

    firebase
      .database()
      .ref('/user/' + userId)
      .once('value')
      .then(snapshot => {
        this.setState({rt: snapshot.val().rejected});
      });
    firebase
      .database()
      .ref('/user/' + userId)
      .update({
        rejected: this.state.rt + 1,
      });
  };
  handlechange = () => {
    firebase
      .database()
      .ref('/barcode/100001')
      .once('value')
      .then(snapshot => {
        this.setState({
          ac: snapshot.val().accepted,
          rj: snapshot.val().rejected,
          chem: snapshot.val().chemicals,
          emai: snapshot.val().email,
          manifact: snapshot.val().manufacturer,
          recycle: snapshot.val().recyclable,
          anima: snapshot.val().animal,
          isload: true,
          prod: snapshot.val().product,
        });
        this.calculate();
      })
      .catch(e => {
        console.log(e);
      });
    this.setState({modalVisible: true});
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  barcodeRecognized = ({barcodes}) => {
    barcodes.forEach(barcode => console.warn(barcode.data));
    this.setState({barload: false});
  };

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.barload && (
          <View style={{flex: 1}}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{
                flex: 1,
                width: '100%',
              }}
              onGoogleVisionBarcodesDetected={
                this.barcodeRecognized
              }></RNCamera>
          </View>
        )}
        {this.state.loadcom && (
          <View style={styles.container}>
            <Modal
              style={{paddingLeft: 40, paddingRight: 40}}
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}>
              <View
                style={[styles.modal_bg, {backgroundColor: this.state.color}]}>
                <Text style={styles.tipHeading}>{this.state.severity}</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.accept();
                    }}
                    style={styles.button}>
                    <Text style={styles.button_text}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.reje();
                    }}
                    style={styles.button}>
                    <Text style={styles.button_text}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_bg: {
    // backgroundColor: '#f0f',
    height: 400,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
    marginBottom: 40,
  },

  tipHeading: {
    marginTop: 10,
    fontSize: 40,
    alignSelf: 'center',
  },

  tip_bg: {
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  button_bg: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  button: {
    backgroundColor: '#ccf',
    borderWidth: 3,
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },

  button_text: {
    fontSize: 30,
    alignSelf: 'center',
  },
});

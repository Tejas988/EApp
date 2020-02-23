import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import {List, Card, CardItem, Container, Content} from 'native-base';
// name --> company, description

class Tip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      data: [
        'Use Reusable Bags',
        'Print as Little as Necessary',
        'Use reusable Beverage Containers',
        'Save Water and Electricity',
        'Avoid taking cars or carpool when possible',
        'Use energy efficient lightbulbs',
        'Turn your computer off overnight',
        "Don't Pre-rinse the dishes",
        "Don't pre-heat your oven",
        'Always recycle glass',
        'Use a Clothesline',
        'Have a vegetarian day',
        'Launder Sensibly',
        "Don't waste napkins",
        'Use all of the papers',
        'Never throw away newspapers',
        'Personalise gift wrapping',
        'Re-think your water comsumption',
        'Opt for a shower',
        'Turn the tap off when brushing',
        'Shorten your shower time',
        'Plant your own tree',
        'Use cruise control',
        'Buy second hand',
        'Buy local products',
        'Adjust the temperature',
        'Invest in a travel mug',
        'Do errand batches',
        "Turn off lights when you're not in the room",
        'Garden manually',
        'Use picnic markers',
        'Recycle your cell phone',
        'Regularly maintain your vehicle',
        'Recycle unwanted wire hangers',
        'Always Recycle glass and aluminium',
        'Work from home',
        'Keep your fireplace damper closed',
        'Reduce your junk mail',
        'Choose matches over a lighter',
        'Use online directories',
        "Don't throw it away",
        'Use a professional car wash service',
        "Don't use plastic carrier bags",
        'Use e-tickets',
        'Download software',
        "Don't use an answering machine",
        "Don't use coffee stirrers",
        'Use non-chemical De-Icers',
        'Use paper based cotton buds',
        'Pay household bills online',
        'Cancel your paper back statements',
        'Use rechargeable batteries',
        'Share the knowledge!',
      ],
      num: Math.random() * 9,
    };
  }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          elevation: 8,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginLeft: 25,
          marginRight: 25,
          marginTop: 20,
        }}
        onPress={props => {
          props.navigate.navigation('Details');
        }}>
        <View style={{height: 70, justifyContent: 'center'}}>
          <Text style={{fontSize: 20, alignSelf: 'center'}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const data = [
      {id: 1, title: 'campaign a'},
      {id: 2, title: 'campaign a'},
      {id: 3, title: 'campaign c'},
      {id: 4, title: 'campaign d'},
      {id: 5, title: 'campaign e'},
      {id: 6, title: 'campaign f'},
      {id: 7, title: 'campaign g'},

    ];
    // [{1:a, 2:b}, {1:c, 2:d}]
    console.log('this is array', data);

    return (
      <View style={{backgroundColor: '#fa5c', flex: 1}}>
        <Modal
          style={{paddingLeft: 40, paddingRight: 40}}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.modal_bg}>
            <Text style={styles.tipHeading}>Tip of the Day!!</Text>
            <View style={styles.tip_bg}>
              <Text style={{fontSize: 30, color: '#0f0'}}>
                {this.state.data[Math.ceil(this.state.num)]}
              </Text>
            </View>
            <View style={styles.button_bg}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.button_text}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({num: Math.random() * 9});
                }}>
                <Text style={styles.button_text}>Next Tip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            // renderItem={<MainPage />}

            renderItem={this.renderItem}
            // horizontal={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal_bg: {
    backgroundColor: '#000c',
    height: 400,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 30,
  },

  tipHeading: {
    marginTop: 10,
    fontSize: 40,
    alignSelf: 'center',
    color: '#fff',
  },

  tip_bg: {
    height: 250,
    backgroundColor: '#fff6',
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

export default Tip;

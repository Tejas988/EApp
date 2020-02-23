import React, {Component} from 'react';
import {View, Text} from 'react-native';

// import campaign,campaigndetails,Barscan,Flatlist
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tip from './Campaigns';
import CampaignList from './CampaignList';
import Bar from '../campaignData';
import ListH from '../List';
/*const Rootstack1=createStackNavigator(
  {
      Home:{
        screen:Campaigns,
       navigationOptions:{
         header:null
       }
      },
      Details:Campaignlist
  },
  {
      initialRouteName:'Home'
  },

  );
  */
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Campaigns">
      <Stack.Screen name="Campaigns" component={Tip} />
      <Stack.Screen name="Details" component={CampaignList} />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

function Navs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Campaigns" component={MyStack} />
      <Tab.Screen name="Scan" component={Bar} />
      <Tab.Screen name="Ratings" component={ListH} />
    </Tab.Navigator>
  );
}
/* const Rootstack2=createStackNavigator(
    {
        Home1:{
          screen:Movielist1,
         navigationOptions:{
           header:null
         }
        },
        Details1:DetailScreen
    },
    {
        initialRouteName:'Home1'
    },
  
    );
    */
/*  const TabNav=createBottomTabNavigator({
    Campaigns:{
      screen:Rootstack1
    },
    Scan:{
      screen:Basrcan
    },
    Ranking:{
        screen:Flatlist
    }

  })
*/
//const AppContainer=createAppContainer(TabNav);

export default Navs;

/*export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View style={{flex:1}}>
        <AppContainer />
      </View>
    );
  }
}
*/

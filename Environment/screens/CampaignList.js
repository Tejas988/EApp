import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
export default class CampaignList extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Card
            style={{
              marginTop: 50,
              backgroundColor: '#FFF',
              elevation: 10,
              borderRadius: 15,
              marginHorizontal: 10,
            }}>
            <Card.Title
              title="Campaign"
              // subtitle="Card Subtitle"
              left={props => <Avatar.Icon {...props} icon="folder" />}
            />
            <View
              style={{
                alignSelf: 'center',
                marginVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: '#6274EC',
                borderRadius: 8,
                backgroundColor: '#00ffcc',
                marginVertical: 3,
              }}>
              <TouchableOpacity>
                <Text style={{fontSize: 30, color: 'white'}}>
                  JOIN CAMPAIGN
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Card.Content>
                <Title>Description</Title>
              </Card.Content>

              <View
                style={{
                  // marginBottom: 10,
                  // marginHorizontal: 10,
                  elevation: 5,
                  backgroundColor: '#FFF',
                }}>
                <Paragraph style={{paddingVertical: 5, paddingHorizontal: 8}}>
                  On July 16, 1969, the Apollo 11 spacecraft launched from the
                  Kennedy Space Center in Florida. Its mission was to go where
                  no human being had gone before—the moon! The crew consisted of
                  Neil Armstrong, Michael Collins, and Buzz Aldrin. The
                  spacecraft landed on the moon in the Sea of Tranquility, a
                  basaltic flood plain, on July 20, 1969. The moonwalk took
                  place the following day. On July 21, 1969, at precisely 10:56
                  EDT, Commander Neil Armstrong emerged from the Lunar Module
                  and took his famous first step onto the moon’s surface. He
                  declared, “That’s one small step for man, one giant leap for
                  mankind.” It was a monumental moment in human history!
                </Paragraph>
              </View>
              <View>
                <Card.Content>
                  <Title style={{marginVertical: 10}}>Company Involved</Title>
                </Card.Content>
                <View style={{elevation: 3, backgroundColor: '#FFF'}}>
                  <Text style={{paddingVertical: 5, paddingHorizontal: 8}}>
                    klsad
                  </Text>
                </View>
              </View>
            </View>
            {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
            <View style={{paddingBottom: 40}}></View>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffe6',
  },
});

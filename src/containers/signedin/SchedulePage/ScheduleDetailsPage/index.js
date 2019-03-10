import React, { Component } from "react";
import { View, Text, ScrollView, Image, Linking, TouchableOpacity } from "react-native";
import {
  Header,
  TabbedMenu,
  Card,
  ListItem
} from "../../../../components";
import PageStyle from "./styles";
import {connect} from "react-redux";
import * as actions from "../../../../actions";
class ScheduleDetailsPage extends Component {

  renderFacilitator(){
    const { navigation } = this.props;
    const talk = navigation.getParam("talk");
    if(talk.facilitators.length > 0){
      return(
        <View style={PageStyle.listContainer}>
          <ListItem>
            <View style={PageStyle.speakerContainer}>
              <View>
                <Text style={PageStyle.title}>{talk.facilitators[0].first_name + ' ' + talk.facilitators[0].last_name}</Text>
                <Text style={PageStyle.text}>{talk.facilitators[0].company + ' ' + talk.facilitators[0].position}</Text>
              </View>
              <TouchableOpacity onPress={() => Linking.openURL(talk.facilitators[0].linkedin)}>
                <View style={PageStyle.linkedInContainer}>
                  <Image
                    style={PageStyle.linkedInButton}
                    source={require("../../../../assets/linkedin.png")}
                  />
                </View>
              </TouchableOpacity>

            </View>
          </ListItem>
        </View>
      );
    }else{
      return(
        <View style={PageStyle.listContainer}>
          <ListItem>
            <View style={PageStyle.speakerContainer}>
              <Text style={PageStyle.title}>TBA</Text>
            </View>
          </ListItem>
        </View>
      );
    }

  }
  renderEventDetails() {
    const { navigation } = this.props;
    const talk = navigation.getParam("talk");
    if (talk.topic) {
      return (
        <View>
          <Text style={PageStyle.header}>
            ABOUT
          </Text>
          <Card>
            <View style={PageStyle.detailsContainer}>
              <Text style={PageStyle.title}>{talk.topic}</Text>
              <Text style={PageStyle.text}>{talk.description}</Text>
            </View>

            {this.renderFacilitator()}
          </Card>
        </View>
      );
    }

  }

  renderLocation(){
    const { navigation } = this.props;
    const talk = navigation.getParam("talk");
    const floor_plans = talk.floor_plans;
    if(floor_plans.length > 0){
      return (
        <View>
          <Text style={PageStyle.header}>
            LOCATION
          </Text>
          <Card>
            <View style={PageStyle.locationContainerStyle}>
              <View>
                <Text style={PageStyle.title}>
                  {floor_plans[0].location}
                </Text>
              </View>
              <View>
                <Image source={require("../../../../assets/checkin_button.png")} style={PageStyle.locationIconStyle} />
              </View>
            </View>
            {floor_plans[0].image !== undefined && <Image source={floor_plans[0].image.url} style={PageStyle.mapImage} />}
          </Card>
        </View>
      );
    }else {
      return (
        <View>
          <Text style={PageStyle.header}>
            LOCATION
          </Text>
          <Card>
            <View style={PageStyle.locationContainerStyle}>
              <Text style={PageStyle.title}>
                TBA
              </Text>
            </View>
          </Card>
        </View>
      );
    }

  }
  render() {
    const { navigation, user } = this.props;
    const talk = navigation.getParam("talk");
    return (
      <View style={PageStyle.container}>
        <Header
          label={talk.title.toUpperCase()}
          status="details"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          {this.renderEventDetails()}
          {this.renderLocation()}
        </ScrollView>
        <TabbedMenu status="loggedin" user={user} navigation={navigation} />
      </View>
    );
  }
}


const mapStatetoProps = ({ meetingsState, auth, userState }) => {
  const { meeting,
    hasLoadedMeeting
  } = meetingsState;
  const { meetings } = meetingsState;
  const { user } = userState;
  const { status, token } = auth;
  return {
    meetings, meeting, hasLoadedMeeting, status, user, token
  };
};

export default connect(
  mapStatetoProps,
  { actions }
)(ScheduleDetailsPage);

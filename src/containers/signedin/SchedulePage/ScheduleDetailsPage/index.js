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
    const event = navigation.getParam("event");
    if( event.facilitator !== null && event.facilitator !== undefined ){
      return(
        <Card>
          <View style={PageStyle.listContainer}>
            <ListItem>
              <View style={PageStyle.speakerContainer}>
                <View>
                  <Text style={PageStyle.title}>{event.facilitator.first_name + ' ' + event.facilitator.last_name}</Text>
                  <Text style={PageStyle.text}>{event.facilitator.company + ' ' + event.facilitator.position}</Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL(event.facilitator.linkedin)}>
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
        </Card>
      );
    }else{
      return(
        <Card>
          <View style={PageStyle.listContainer}>
            <ListItem>
              <View style={PageStyle.speakerContainer}>
                <Text style={PageStyle.title}>TBA</Text>
              </View>
            </ListItem>
          </View>
        </Card>
      );
    }

  }
  renderEventDetails() {
    const { navigation } = this.props;
    const event = navigation.getParam("event");
    if (event.topic !== null && event.topic !== undefined ) {
      return (
        <View>
          <Text style={PageStyle.header}>
            ABOUT
          </Text>
          <Card>
            <View style={PageStyle.detailsContainer}>
              <Text style={PageStyle.title}>{event.topic}</Text>
              <Text style={PageStyle.text}>{event.description}</Text>
            </View>
          </Card>
        </View>
      );
    }

  }

  renderLocation(){
    const { navigation } = this.props;
    const event = navigation.getParam("event");
    if(event.floor_plan !== null && event.floor_plan !== undefined){
      return (
        <View>
          <Text style={PageStyle.header}>
            LOCATION
          </Text>
          <Card>
            <View style={PageStyle.locationContainerStyle}>
              <View>
                <Text style={PageStyle.title}>
                  {event.floor_plan.location}
                </Text>
              </View>
              <View>
                <Image source={require("../../../../assets/checkin_button.png")} style={PageStyle.locationIconStyle} />
              </View>
            </View>
            {event.floor_plan.image !== undefined && <Image source={event.floor_plan.image.url} style={PageStyle.mapImage} />}
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
    const { navigation } = this.props;
    const event = navigation.getParam("event");
    return (
      <View style={PageStyle.container}>
        <Header
          label={event.title.toUpperCase()}
          status="details"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          {this.renderEventDetails()}
          {this.renderFacilitator()}
          {this.renderLocation()}
        </ScrollView>
        <TabbedMenu status="loggedin" navigation={navigation} />
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

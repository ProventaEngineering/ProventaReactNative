import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity
} from "react-native";
import { Header, TabbedMenu, Card, ListItem } from "../../../../components";
import PageStyle from "./styles";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
class ScheduleDetailsPage extends Component {
  renderFacilitator() {
    const { navigation } = this.props;
    const event = navigation.getParam("event");
    console.log({ event });
    if (event && event.facilitator) {
      const { facilitator } = event;
      const {
        full_name,
        first_name,
        last_name,
        position,
        company,
        linkedin
      } = facilitator;
      return (
        <Card key={event.id}>
          <View style={PageStyle.listContainer}>
            <ListItem>
              <View style={PageStyle.speakerContainer}>
                <View>
                  <Text style={PageStyle.title}>
                    {full_name ? full_name : `${first_name} ${last_name}`}
                  </Text>
                  <Text style={PageStyle.text}>{`${company} ${position}`}</Text>
                </View>
                <TouchableOpacity 
                  disabled={linkedin == null || linkedin == '' ? true : false} 
                  onPress={() => Linking.openURL(linkedin)}>
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
    } else {
      return (
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
    if (event.topic !== null && event.topic !== undefined) {
      return (
        <View>
          <Text style={PageStyle.header}>ABOUT</Text>
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

  renderLocation() {
    const { navigation } = this.props;
    const event = navigation.getParam("event");
    if (event && event.floor_plan && event.floor_plan.location) {
      return (
        <View>
          <Text style={PageStyle.header}>LOCATION</Text>
          <Card>
            <View style={PageStyle.locationContainerStyle}>
              <View>
                <Text style={PageStyle.title}>{event.floor_plan.location}</Text>
              </View>
              <View>
                <Image
                  source={require("../../../../assets/checkin_button.png")}
                  style={PageStyle.locationIconStyle}
                />
              </View>
            </View>
            {event.floor_plan.image ? (
              <Image
                source={event.floor_plan.image.url}
                style={PageStyle.mapImage}
              />
            ) : null}
          </Card>
        </View>
      );
    }
    return (
      <View>
        <Text style={PageStyle.header}>LOCATION</Text>
        <Card>
          <View style={PageStyle.locationContainerStyle}>
            <Text style={PageStyle.title}>TBA</Text>
          </View>
        </Card>
      </View>
    );
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
      </View>
    );
  }
}

const mapStatetoProps = ({ meetingsState, auth, userState }) => {
  const { meeting, hasLoadedMeeting } = meetingsState;
  const { meetings } = meetingsState;
  const { user } = userState;
  const { status, token } = auth;
  return {
    meetings,
    meeting,
    hasLoadedMeeting,
    status,
    user,
    token
  };
};

export default connect(
  mapStatetoProps,
  { actions }
)(ScheduleDetailsPage);

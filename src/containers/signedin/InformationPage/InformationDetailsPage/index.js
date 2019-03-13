import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, Linking, ActivityIndicator, AsyncStorage } from "react-native";
import { Header, TabbedMenu, Card, ListItem } from "../../../../components";
import PageStyle from "./styles";
import { connect } from 'react-redux';
import { DrawerActions } from "react-navigation";
import * as actions from "../../../../actions";
import ComponentStyle from "../../../../components/TabbedMenu/styles";

class InformationDetailsPage extends Component {


  renderFacilitators() {
    const { navigation, meetings } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    const facilitator = meeting.facilitators.map(({ id, first_name, last_name, company, position }, index, facilitators) => {
      return (
        <View key={id} style={PageStyle.listContainer}>
          <ListItem
            onPress={() => {
              ("schedl");
              this.setState(
                {
                  selectedIndex: index
                },
                () => {
                  navigation.navigate("FacilitatorDetailsPage", {
                    facilitator: facilitators[index],
                    meetingId: meetingId
                  });
                });
            }}
          >
            <View style={PageStyle.list}>
              <View style={{ width: "25%" }}>
                <Image
                  style={[PageStyle.listIcon, PageStyle.profileIcon]}
                  source={{ uri: "https://cdn5.vectorstock.com/i/thumb-large/13/04/male-profile-picture-vector-2041304.jpg" }}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Text style={PageStyle.listTitle}>{first_name} {last_name}</Text>
                <Text style={PageStyle.listDescription}> {company} {position} </Text>
              </View>
            </View>
            <View style={PageStyle.listBorder} />
          </ListItem>
        </View>
      );
    });
    return facilitator;
  }

  renderParticipants() {
    const { navigation, meetings } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    // const participants = navigation.getParam("participants");
    const participant = meeting.participants.map(({ id, first_name, last_name, position, company, linkedin }, index, participants) => {
      return (
        <View key={id} style={PageStyle.listContainer}>
          <ListItem onPress={() => ("pressed")}>
            <View style={PageStyle.list}>
              <View style={{ width: "25%" }}>
                <Image
                  style={[PageStyle.listIcon, PageStyle.profileIcon]}
                  source={{ uri: "https://cdn5.vectorstock.com/i/thumb-large/13/04/male-profile-picture-vector-2041304.jpg" }}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Text style={PageStyle.listTitle}>{first_name} {last_name}</Text>
                <Text style={PageStyle.listDescription}>{company} {position}</Text>
              </View>
              <View style={{ width: "25%" }}>
                <TouchableOpacity onPress={() => Linking.openURL(linkedin)}>
                  <Image
                    style={[PageStyle.linkedInButton]}
                    source={require("../../../../assets/linkedin.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={PageStyle.listBorder} />
          </ListItem>
        </View>
      );
    });
    return participant;
  }

  renderSponsors() {
    const { navigation, meetings } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    const sponsor = meeting.sponsors.map(({ id, title, image, website }) => {
      return (
        <View key={id} style={{ width: "45%", alignItems: "flex-start" }}>
          <TouchableOpacity onPress={() => { Linking.openURL(website) }}>
            <Image style={PageStyle.boxImage} source={{ uri: image.url }} />
            <Text style={PageStyle.title}> {title} </Text>
          </TouchableOpacity>
        </View>
      );
    });

    return sponsor;
  }

  renderPersonalSchedule() {
    return (
      <View style={{ width: "45%", alignItems: "center" }}>
        <Text> Upcoming Feature</Text>
      </View>
    );
  }

  renderContent() {
    const { navigation } = this.props;
    const content = navigation.getParam("content");
    if (content === "FACILITATORS") {
      return <Card>{this.renderFacilitators()}</Card>;
    } else if (content === "PARTICIPANTS") {
      return <Card>{this.renderParticipants()}</Card>;
    } else if (content === "SPONSORS") {
      return (
        <ScrollView>
          <Card>
            <View style={PageStyle.box}>
              {this.renderSponsors()}
            </View>
          </Card>
        </ScrollView>
      );
    } else if (content === "PERSONAL SCHEDULE") {
      return <Card>{this.renderPersonalSchedule()}</Card>;
    }
  }


  render() {
    const { navigation, meetings } = this.props;
    const content = navigation.getParam("content");
    const route = navigation.getParam("previousRoute");
    const meetingId = navigation.getParam("meetingId");
    console.log(">>>>>>>>>.information Details Page", navigation);
    if(meetings.hasMeetingsLoaded) {
      return (
        <View style={PageStyle.container}>
          <Header
            label={content}
            status="details"
            onPress={() => {
              if (content === 'PERSONAL SCHEDULE') {
                navigation.dispatch(DrawerActions.openDrawer());
              } else {
                navigation.navigate(route, {
                  meetingId: meetingId,
                  status: "loggedin"
                });
              }
            }}
            settings={() => {
              if (content !== "PERSONAL SCHEDULE") {
                navigation.navigate("SettingsPage", {
                  meetingId: meetingId,
                  content: "settings",
                  previousRoute: "MeetingLoginPage"
                });
              }
            }}
          />
          {this.renderContent()}
          <TabbedMenu navigation={navigation} status="loggedin"/>
        </View>
      );
    }else{
      return (
        <View style={ComponentStyle.container}>
          <View style={PageStyle.loading}>
            <ActivityIndicator loaded={meetings.hasMeetingsLoaded} size="large" />
          </View>
        </View>
      );
    }
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
)(InformationDetailsPage);

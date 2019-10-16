import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { Header, TabbedMenu, Card, ListItem } from "../../../../components";
import PageStyle from "./styles";
import { connect } from "react-redux";
import { DrawerActions } from "react-navigation";
import * as actions from "../../../../actions";
import ComponentStyle from "../../../../components/TabbedMenu/styles";

class InformationDetailsPage extends Component {
  getMeetingId = () => {
    const { navigation, user, meetings } = this.props;
    const meetingId = navigation.getParam("meetingId");
    if (!meetingId) {
      if (user.profile.meetingIds.length > 0) {
        return user.profile.meetingIds[0];
      } else {
        return meetings.ids[0];
      }
    }
    return meetingId;
  };

  removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {
      var key = keyFn(x),
        isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }

  renderFacilitators() {
    const { navigation, meetings } = this.props;
    const meetingId = this.getMeetingId();
    const meeting = meetings.items[meetingId];
    const facilitatorCopy = this.removeDuplicatesBy(
      x => x.id,
      meeting.facilitators
    );

    const test = facilitatorCopy.map(data => data);
    const facilitator = facilitatorCopy.map(
      (
        { id, first_name, last_name, company, position },
        index,
        facilitators
      ) => {
        return (
          <View key={id} style={PageStyle.listContainer}>
            <ListItem
              onPress={() => {
                this.setState(
                  {
                    selectedIndex: index
                  },
                  () => {
                    navigation.navigate("FacilitatorDetailsPage", {
                      facilitator: facilitators[index],
                      meetingId: meetingId
                    });
                  }
                );
              }}
            >
              <View style={PageStyle.list}>
                <View style={{ width: "25%" }}>
                  <Image
                    style={[PageStyle.listIcon, PageStyle.profileIcon]}
                    source={{
                      uri:
                        "https://cdn5.vectorstock.com/i/thumb-large/13/04/male-profile-picture-vector-2041304.jpg"
                    }}
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={PageStyle.listTitle}>
                    {first_name} {last_name}
                  </Text>
                  <Text style={PageStyle.listDescription}>
                    {" "}
                    {company} {position}{" "}
                  </Text>
                </View>
              </View>
              <View style={PageStyle.listBorder} />
            </ListItem>
          </View>
        );
      }
    );
    return facilitator;
  }

  renderParticipants() {
    const { meetings } = this.props;
    const meetingId = this.getMeetingId();
    const meeting = meetings.items[meetingId];
    const participant = meeting.participants.map(
      ({ id, first_name, last_name, position, company, linkedin }) => {
        return (
          <View key={id} style={PageStyle.listContainer}>
            <ListItem onPress={() => "pressed"}>
              <View style={PageStyle.list}>
                <View style={{ width: "25%" }}>
                  <Image
                    style={[PageStyle.listIcon, PageStyle.profileIcon]}
                    source={{
                      uri:
                        "https://cdn5.vectorstock.com/i/thumb-large/13/04/male-profile-picture-vector-2041304.jpg"
                    }}
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={PageStyle.listTitle}>
                    {first_name} {last_name}
                  </Text>
                  <Text style={PageStyle.listDescription}>
                    {company} {position}
                  </Text>
                </View>
                <View style={{ width: "25%" }}>
                    <TouchableOpacity 
                      disabled={linkedin == null || linkedin == ''? true : false } 
                      onPress={() => Linking.openURL(linkedin)}>
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
      }
    );
    return participant;
  }

  renderSponsors() {
    const { meetings } = this.props;
    const { items } = meetings || [];
    const meetingId = this.getMeetingId();
    const meeting = items[meetingId];
    const { sponsors = [] } = meeting || {};
    const sponsor = sponsors.map(({ id, title, image, website }) => {
      return (
        <View key={id} style={{ width: "45%", alignItems: "flex-start" }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(website);
            }}
          >
            <Image style={PageStyle.boxImage} source={{ uri: image.url }} />
            <Text style={PageStyle.title}> {title} </Text>
          </TouchableOpacity>
        </View>
      );
    });

    return sponsor;
  }

  renderPersonalSchedule() {
    const { meetings } = this.props;
    const meetingId = this.getMeetingId();
    const meeting = meetings.items[meetingId];

    const session = meeting.personalizeAgenda.schedules.map(item => {
      const { subject, time } = item;
      return (
        <Card key={subject.title}>
          <View style={PageStyle.listContainer}>
            <ListItem
              onPress={() => {
                this.props.navigation.navigate("ScheduleDetailsPage", {
                  event: { ...subject, time },
                  meetingId
                });
              }}
            >
              <Text style={PageStyle.listTitle}> {subject.title} </Text>
              {subject.facilitator !== null ? (
                <Text style={PageStyle.agendaDetails}>
                  {" "}
                  {subject.facilitator.full_name} -{" "}
                  {subject.facilitator.company}{" "}
                </Text>
              ) : null}
              {subject.floor_plan !== null ? (
                <View>
                  <Image
                    style={PageStyle.agendaImage}
                    source={{ uri: subject.floor_plan.image.url }}
                  />
                  <Text style={PageStyle.agendaDetails}>
                    {" "}
                    {subject.floor_plan.location}{" "}
                  </Text>
                </View>
              ) : null}
              <View style={PageStyle.timeContainer}>
                <Text style={PageStyle.listTitle}> {time} </Text>
              </View>
            </ListItem>
          </View>
        </Card>
      );
    });

    return session;
  }

  renderContent() {
    const { navigation } = this.props;
    const content = navigation.getParam("content");
    console.log({ content });
    if (content === "FACILITATORS") {
      return <Card>{this.renderFacilitators()}</Card>;
    } else if (content === "PARTICIPANTS") {
      return <Card>{this.renderParticipants()}</Card>;
    } else if (content === "SPONSORS") {
      return (
        <ScrollView>
          <Card>
            <View style={PageStyle.box}>{this.renderSponsors()}</View>
          </Card>
        </ScrollView>
      );
    } else if (content === "PERSONAL SCHEDULE") {
      return (
        <ScrollView>
          <View style={PageStyle.agendaContainer}>
            {this.renderPersonalSchedule()}
          </View>
        </ScrollView>
      );
    }
  }

  render() {
    const { navigation, meetings } = this.props;
    const content = navigation.getParam("content");
    const route = navigation.getParam("previousRoute");
    let meetingId = this.getMeetingId();
    if (meetings.hasMeetingsLoaded) {
      return (
        <View style={PageStyle.container}>
          <Header
            label={content}
            status="details"
            onPress={() => {
              if (content === "PERSONAL SCHEDULE") {
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
        </View>
      );
    } else {
      return (
        <View style={ComponentStyle.container}>
          <View style={PageStyle.loading}>
            <ActivityIndicator
              loaded={meetings.hasMeetingsLoaded}
              size="large"
            />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = ({ meetingsState, auth, userState }) => {
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
  mapStateToProps,
  { actions }
)(InformationDetailsPage);

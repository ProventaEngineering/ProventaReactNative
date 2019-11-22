import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import {
  Header,
  Card,
  TabbedMenu,
  ListItem,
  Video,
  Map,
  ModalScreen
} from "../../../components";
import { connect } from "react-redux";
import PageStyle from "./styles";
import { DrawerActions } from "react-navigation";
import { fetchProfileAndMeetings } from "../../../actions";

class MeetingPage extends Component {
  state = {
    modalVisible: false,
    selectedIndex: null,
    status: "loggedout"
  };

  componentDidMount() {
    try {
      const { navigation, meetings } = this.props;
      const { hasMeetingsLoaded, ids, items } = meetings;
      if (!hasMeetingsLoaded && ids.length === 0 && items.length === 0) {
        this.props.fetchProfileAndMeetings();
      }
      this.setState({ status: navigation.getParam("status") });
      //set meeting id in navigation param if undefined or null
    } catch (error) {
      // Error retrieving data
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.meetings.hasMeetingsLoaded !==
        this.props.meetings.hasMeetingsLoaded &&
      this.props.meetings.hasMeetingsLoaded
    ) {
      console.log("setNavigationMeetingId");
      this.setNavigationMeetingId();
    }
  }
  setNavigationMeetingId() {
    const { navigation, user, meetings } = this.props;
    const meetingId = navigation.getParam("meetingId");
    console.log({ user, state: this.state, meetingId, meetings });
    if (!meetingId) {
      //set meeting id from profile meeting ids if loggedin or first of ids from meetings ids
      if (
        this.state.status == "loggedin" &&
        user.profile.meetingIds.length > 0
      ) {
        navigation.setParams({ meetingId: user.profile.meetingIds[0] });
      } else {
        navigation.setParams({ meetingId: meetings.ids[0] });
      }
    }
  }

  renderTitle() {
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    if (meeting != undefined) {
      return (
        <Card>
          {this.renderMeetingPicture()}
          <View style={PageStyle.info}>
            <Text style={PageStyle.description}>{meeting.title}</Text>
            <Text style={PageStyle.date}>{meeting.date}</Text>
            <Text style={PageStyle.area}> {this.renderVenue()}</Text>
          </View>
        </Card>
      );
    }
  }

  renderVenue() {
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    if (meeting.venue != undefined) {
      return (
        <Text key={"venue" + meeting.venue.id}> {meeting.venue.title} </Text>
      );
    } else {
      return <Text> TBA </Text>;
    }
  }

  renderMeetingPicture() {
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    if (meeting != undefined) {
      return (
        <Image
          key={"picture" + meeting.venue.id}
          style={PageStyle.image}
          source={{ uri: meeting.image.url }}
        />
      );
    }
  }

  renderVideo() {
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    if (meeting != undefined) {
      return (
        <Card>
          <Video videoSource={meeting.video} />
        </Card>
      );
    }
  }

  renderDescription() {
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    if (meeting != undefined) {
      return (
        <Card>
          <View style={PageStyle.textArea}>
            <Text style={PageStyle.text}>{meeting.description}</Text>
          </View>
        </Card>
      );
    }
  }

  renderExpectations() {
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    if (meeting != undefined) {
      const expectation = meeting.expectations.map(
        ({ id, image, title, description }) => {
          return (
            <View
              key={"expectations" + id}
              style={PageStyle.expectationContainer}
            >
              <View style={PageStyle.expectationList}>
                <View style={{ width: "25%" }}>
                  <Image
                    style={PageStyle.expectationIcon}
                    source={{ uri: image.url }}
                  />
                </View>
                <View style={{ width: "75%" }}>
                  <Text style={PageStyle.expectationTitle}>{title}</Text>
                  <Text style={PageStyle.expectationDescription}>
                    {description}
                  </Text>
                </View>
              </View>
              <View style={PageStyle.expectationBorder} />
            </View>
          );
        }
      );

      return expectation;
    }
  }

  toggleModal = () =>
    this.setState(
      prevState => ({ modalVisible: !prevState.modalVisible }),
      () => {
        console.log("this.state.modalVisible", this.state.modalVisible);
      }
    );

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
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    if (meeting) {
      const facilitatorCopy = this.removeDuplicatesBy(
        x => x.id,
        meeting.facilitators
      );
      const facilitator = facilitatorCopy.map(
        ({ id, first_name, last_name, position }, index, facilitators) => {
          return (
            <View
              key={"facilitators" + id}
              style={PageStyle.expectationContainer}
            >
              <ListItem
                onPress={() => {
                  this.setState({ selectedIndex: index }, this.toggleModal);
                }}
              >
                <View style={PageStyle.expectationList}>
                  <View style={{ width: "25%" }}>
                    <Image
                      style={[PageStyle.expectationIcon, PageStyle.profileIcon]}
                      source={{
                        uri:
                          "https://cdn5.vectorstock.com/i/thumb-large/13/04/male-profile-picture-vector-2041304.jpg"
                      }}
                    />
                  </View>
                  <View style={{ width: "75%" }}>
                    <Text style={PageStyle.expectationTitle}>
                      {first_name} {last_name}
                    </Text>
                    <Text style={PageStyle.expectationDescription}>
                      {position}
                    </Text>
                  </View>
                </View>
                <View style={PageStyle.expectationBorder} />
              </ListItem>
              <ModalScreen
                facilitator={
                  this.state.selectedIndex == null
                    ? facilitators[0]
                    : facilitators[this.state.selectedIndex]
                }
                visible={this.state.modalVisible}
                onPressClose={this.toggleModal}
              />
            </View>
          );
        }
      );

      return facilitator;
    }
  }

  renderMap() {
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    if (meeting != undefined) {
      return (
        <Map
          key={"map" + meeting.venue.id}
          latitude={meeting.venue.latitude}
          longitude={meeting.venue.longitude}
          title={meeting.venue.title}
        />
      );
    }
  }

  renderDetails() {
    const { meetings, navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const meeting = meetings.items[meetingId];
    //if (this.state.status !== "loggedin")
      return (
        <View>
          <Text style={PageStyle.header}> FACILITATORS </Text>
          {this.renderFacilitators()}
          <Text style={[PageStyle.header, PageStyle.mapContainer]}>VENUE</Text>
          {/* For refactoring, must be inside Card */}
          <View style={PageStyle.mapContainer} />
          <Card>{this.renderMap()}</Card>
        </View>
      );
  }

  render() {
    const { navigation, meetings } = this.props;
    const status =
      navigation.getParam("status") != undefined
        ? navigation.getParam("status")
        : "loggedout";
    const meetingId = navigation.getParam("meetingId");
    return (
      <View style={PageStyle.container}>
        <Header
          label="MEETING DETAILS"
          status={status}
          settings={() =>
            navigation.navigate("SettingsPage", {
              content: "settings",
              previousRoute: "MeetingLoginPage",
              status: status,
              meetingId: meetingId
            })
          }
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        {meetings.hasMeetingsLoaded ? (
          <ScrollView>
            <Image
              style={PageStyle.backgroundImage}
              source={require("../../../assets/event.png")}
            />
            <View style={PageStyle.overlapCardContainer}>
              {this.renderTitle()}
              {this.renderVideo()}
              <Text style={PageStyle.header}> OUR UNIQUE FORMAT </Text>
              {this.renderDescription()}
              <Text style={PageStyle.header}> WHAT TO EXPECT </Text>
              {this.renderExpectations()}
              {this.renderDetails()}
            </View>
          </ScrollView>
        ) : (
          <View style={PageStyle.loading}>
            <ActivityIndicator
              loaded={meetings.hasMeetingsLoaded}
              size="large"
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ meetingsState, auth, userState }) => {
  const { meetings } = meetingsState;
  const { user } = userState;
  const { status, token } = auth;
  return {
    meetings,
    status,
    user,
    token
  };
};
export default connect(
  mapStateToProps,
  { fetchProfileAndMeetings }
)(MeetingPage);

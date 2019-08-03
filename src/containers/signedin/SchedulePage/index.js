import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Header, TabbedMenu, ListItem, Accordion } from "../../../components";
import PageStyle from "./styles";
import { connect } from "react-redux";
import { DrawerActions } from "react-navigation";
import * as actions from "../../../actions";
import ComponentStyle from "../../../components/TabbedMenu/styles";

class SchedulePage extends Component {
  state = {
    morningSessions: [],
    afternoonSessions: [],
    selectedIndex: 1,
    selectedInnerIndex: 1
  };

  formatHours(date) {
    var date = new Date(date);
    return parseInt(date.getHours()) - 8;
  }

  formatMinutes(date) {
    var date = new Date(date);
    if (parseInt(date.getMinutes()) === 0) {
      return "00";
    }
    return parseInt(date.getMinutes());
  }

  filterSessions() {
    const { discussions } = this.props;
    const sessions = discussions;
    for (i = 0; i <= sessions.length - 1; i++) {
      console.log(i <= sessions.length - 1);
      const endTime = this.formatHours(sessions[i].endTime);
      const data = [
        {
          id: sessions[i].id,
          startTime: sessions[i].startTime,
          endTime: sessions[i].endTime,
          title: sessions[i].title
        }
      ];
      if (parseInt(endTime) <= 12) {
        // this.setState({
        //   morningSessions: [this.state.morningSessions.concat(data)
        // });
      }
    }
  }

  getIndex(id) {
    const { discussions } = this.props;
    return discussions.findIndex(discussions => discussions.id === id);
  }

  getIndexTalks(talks, id) {
    return talks.findIndex(talks => talksWithFacilitator.id === id);
  }

  renderSessions() {
    const {
      navigation,
      meetings: { items = {} }
    } = this.props;
    const meetingId = navigation.getParam("meetingId") || "";
    const meeting = items[meetingId];
    const { discussions = [] } = meeting;
    const session = discussions.map((discussion, index, discussions) => {
      if (discussion.talks.length == 0) {
        return (
          <View key={index} style={PageStyle.ListContainer}>
            <ListItem
              onPress={() => {
                this.props.navigation.navigate("ScheduleDetailsPage", {
                  event: { ...discussion },
                  meetingId: meetingId
                });
              }}
            >
              <View
                style={[
                  index == discussions.length - 1
                    ? [PageStyle.scheduleList, { borderBottomWidth: 0 }]
                    : PageStyle.scheduleList
                ]}
              >
                <View>
                  <Text style={PageStyle.text}>
                    {this.formatHours(discussion.start_time)}:
                    {this.formatMinutes(discussion.start_time)}-{" "}
                    {this.formatHours(discussion.end_time)}:
                    {this.formatMinutes(discussion.end_time)}
                  </Text>
                  <Text style={PageStyle.title}>{discussion.title}</Text>
                </View>
              </View>
            </ListItem>
          </View>
        );
      } else {
        return (
          <View key={index} style={PageStyle.ListContainer}>
            <Accordion
              sessionTitle={discussion.title}
              startTime={discussion.start_time}
              endTime={discussion.end_time}
            >
              {this.renderDropdownList(discussion.talks)}
            </Accordion>
          </View>
        );
      }
    });
    return session;
  }
  // {
  //   label: talk.title,
  //   topic: talk.topic,
  //   description: talk.description,
  //   eventTitle: talk.topic,
  //   name: talk.facilitators[0].first_name + ' ' + talk.facilitators[0].last_name,
  //   nameTitle: talk.facilitators[0].company + ' ' + talk.facilitators[0].position,
  //   linkedIn: talk.facilitators[0].linkedin,
  //   location: talk.floorPlans[0].location,
  //   image: talk.floorPlans[0].image.url
  // }
  renderDropdownList(talks) {
    const { navigation } = this.props;
    const meetingId = navigation.getParam("meetingId");
    const event = talks.map((talk, index, talks) => {
      return (
        <View key={index} style={PageStyle.dropdownList}>
          <ListItem
            onPress={() => {
              navigation.navigate("ScheduleDetailsPage", {
                event: { ...talk },
                meetingId: meetingId
              });
            }}
          >
            <View>
              <Text style={PageStyle.title}>{talk.title}</Text>
            </View>
          </ListItem>
        </View>
      );
    });
    return event;
  }
  renderFloorPlan(map) {
    return <Image source={map.image} style={PageStyle.mapImage} />;
  }

  render() {
    const { navigation, meetings } = this.props;
    const meetingId = navigation.getParam("meetingId");
    if (meetings.hasMeetingsLoaded) {
      return (
        <View style={PageStyle.container}>
          <Header
            label="SCHEDULE"
            status="details"
            onPress={() => {
              navigation.navigate("InformationPage", {
                status: "loggedin",
                meetingId: meetingId
              });
            }}
          />
          <ScrollView>
            {/* <Text style={PageStyle.header}> MORNING SESSION </Text> */}
            <Text style={PageStyle.header}> SESSIONS </Text>
            {this.renderSessions()}
            {/* <Text style={PageStyle.header}> AFTERNOON SESSION </Text> */}
            {/* {this.renderSessions('pm')} */}
          </ScrollView>
          <TabbedMenu navigation={navigation} status="loggedin" />
        </View>
      );
    } else {
      return (
        <View style={ComponentStyle.container}>
          <View style={PageStyle.loading}>
            <ActivityIndicator loaded="false" size="large" />
          </View>
        </View>
      );
    }
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
)(SchedulePage);

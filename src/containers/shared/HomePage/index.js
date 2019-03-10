import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { Header, TabbedMenu, Card, ListItem } from "../../../components";
import PageStyle from "./styles";
import { DrawerActions } from "react-navigation";
import * as actions from "../../../actions";
import { Permissions, Notifications } from 'expo';


class HomePage extends Component {
  state = {
    meetings: {
      items: [],
      isFetched: false
    },
    notification: {},
    loading: true
  };



  async componentWillMount() {
    try {
      this.registerForPushNotificationsAsync();
      this.notificationSubscription = Notifications.addListener(this.handleNotification);

      //Todo: getToken
      //Todo: getToken
      this.props.fetchMeetings();



    } catch (error) {
      // Error retrieving data
    }
  }


  handleNotification = (notification) => {
    this.setState({ notification: notification });
  };
  // renderCategories() {
  //   const { meetings } = this.props;
  //   console.log(meetings);
  //   return (< Text > All Meetings </Text >)
  //   const category = meetings.map(({ id, attributes  }) => {
  //     return (
  //           {this.renderEvents(events)}
  //         </View>

  //     );
  //   });

  //   // return category;
  // }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log("TOKEN FOR PUSH", token);

  }

  renderMeetings() {
    const { navigation, meetings } = this.props;
    const meeting = meetings.items.map(({ id, attributes }) => {
      return (
        <View key={id} style={PageStyle.eventList}>
          <ListItem
            onPress={() =>
              navigation.navigate("MeetingPage", { meetingId: id, status: "loggedout" })
            }
          >
            <Card style={{ width: "90%" }}>
              <Image
                style={PageStyle.eventTitle}
                source={{
                  uri: attributes.image.url
                }}
              />
              <Text style={PageStyle.eventDescription}>
                {attributes.title}
              </Text>
              <Text style={PageStyle.eventDate}> {attributes.date} | { this.renderVenue(attributes.venues) }</Text>
              <View style={PageStyle.eventBorder} />
            </Card>
          </ListItem>
        </View>
      );
    });
    return meeting;
  }


  renderVenue(venues) {
      const venue = venues.map(({ id, title }) => {
          return <Text key={id}> {title} </Text>;
      });

      return venue;
  }

  featuredMeeting(){
      const { meetings } = this.props;
    //Todo: featured meeting logic
    return meetings.items[0].attributes;
  }

  render() {
    const { navigation, meetings } = this.props;
    return (
      <View style={PageStyle.container}>
        <Header
          label="STRATEGY MEETINGS"
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        {( meetings.hasLoadedMeetings )? (
          <ScrollView>
            <ListItem onPress={() => navigation.navigate("MeetingPage", { meetingId: this.featuredMeeting().id, status: "loggedout" })}>
              <Card>
                <Image
                  style={PageStyle.image}
                  source={{
                    uri: this.featuredMeeting().image.url
                  }}
                />
                <View style={PageStyle.info}>
                  <Text style={PageStyle.description}>{this.featuredMeeting().title}</Text>
                  <Text style={PageStyle.date}>
                    {this.featuredMeeting().date} | {this.renderVenue(this.featuredMeeting().venues)}
                  </Text>
                </View>
              </Card>
            </ListItem>
            <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: "500" }}>
              All Meetings
            </Text>
            <View style={PageStyle.meetingsContainer}>
              {this.renderMeetings()}
            </View>
          </ScrollView>
        ) : (
            <View style={PageStyle.loading}>
              <ActivityIndicator loaded={(!meetings.hasLoadedMeetings)} size="large" />
            </View>
          )}
        <TabbedMenu navigation={navigation} status={this.state.status} />
      </View>
    );
  }
}

const mapStateToProps = ({ meetingsState, userState, auth }) => {

  const { status, token } = auth;
  const { meetings } = meetingsState;
  const { user } = userState;
  return {
    meetings,
    status,
    token,
    user
  };
};

export default connect(
  mapStateToProps,
  actions
)(HomePage);

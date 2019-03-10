import React, { Component } from "react";
import { Text, View, ScrollView, Image, AsyncStorage, ActivityIndicator } from "react-native";
import {
  Header,
  TabbedMenu,
  Card,
  ListItem,
  Video,
  Map,
  ModalScreen
} from "../../../components";
import { connect } from "react-redux";
import PageStyle from "./styles";
import { DrawerActions } from "react-navigation";
import {
  fetchProfile,
} from "../../../actions";

class MeetingPage extends Component {

  state = {
    modalVisible: false,
    selectedIndex: 1,
    status: "loggedout"
  };

   componentDidMount() {
    try {
      const { navigation, meetings } = this.props;
      this.props.fetchProfile();
    } catch (error) {
      // Error retrieving data
    }
  }
  // componentDidMount() {
  //
  //   try {
  //     const { navigation, token } = this.props;
  //     const id = navigation.getParam("meetingId");
  //     // const token = await AsyncStorage.getItem('token');
  //     console.log("=================status from props", status)
  //     console.log("=================id from params", id)
  //     console.log("=================token from props", token)
  //     this.props.fetchMeeting(id, this.state.status, token);
  //     // if (status === "loggedin") {
  //     //     this.props.fetchMeeting(id, loggedin, token);
  //     // } else {
  //     //     this.props.fetchMeeting(id, "loggedout", null);
  //     // }
  //   } catch (error) {
  //       // Error retrieving data
  //   }
  // }


  renderTitle() {
    const { user } = this.props;
    const meeting = user.profile.meetings[0];
    // console.log(">>>>>>>>>>>>> ito", user.profile.meetings[0]);
    return (
      <Card>
        {this.renderMeetingPicture(meeting.venues)}
        <View style={PageStyle.info}>
          <Text style={PageStyle.description}>{meeting.title}</Text>
          <Text style={PageStyle.date}>{meeting.date}</Text>
          <Text style={PageStyle.area}> { this.renderVenue(meeting.venues) }</Text>
        </View>
      </Card>
    );
  }

  renderVenue(venues) {
    const venue = venues.map(({ id, title }) => {
      return <Text key={id}> {title} </Text>;
    });

    return venue;
  }

  renderMeetingPicture(venues) {
    const venue = venues.map(({ image, id }) => {
      return <Image key={id} style={PageStyle.image} source={image} />;
    });

    return venue;
  }

  renderVideo() {
    const { user } = this.props;
    const meeting  = user.profile.meetings[0];

    return (
      <Card>
        <Video videoSource={meeting.video} />
      </Card>
    );
  }

  renderDescription() {
    const { user } = this.props;
    const meeting  = user.profile.meetings[0];
    return (
      <Card>
        <View style={PageStyle.textArea}>
          <Text style={PageStyle.text}>{meeting.description}</Text>
        </View>
      </Card>
    );
  }

  renderExpectations() {
    const { user } = this.props;
    const meeting  = user.profile.meetings[0];
    const expectation = meeting.expectations.map(
      ({ id, image, title, description }) => {
        return (
          <View key={id} style={PageStyle.expectationContainer}>
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

  toggleModal() {
    this.setState({ modalVisible: true });
  }

  renderFacilitators() {
    const { user } = this.props;
    const meeting  = user.profile.meetings[0];

    const facilitator = meeting.facilitators.map(
      ({ id, first_name, last_name, position }, index, facilitators) => {
        return (
          <View key={id} style={PageStyle.expectationContainer}>
            <ListItem
              onPress={() => {
                this.setState(
                  {
                    selectedIndex: index
                  },
                  () => {
                    this.toggleModal();
                  }
                );
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
              facilitator={facilitators[this.state.selectedIndex]}
              modalVisible={this.state.modalVisible}
            />
          </View>
        );
      }
    );

      return facilitator;

  }

  renderMap(venues) {
    const venue = venues.map(({ title, latitude, longitude, id }) => {
      return (
        <Map key={id} latitude={latitude} longitude={longitude} title={title} />
      );
    });

    return venue;
  }

  renderDetails() {
    const { user } = this.props;
    const meeting  = user.profile.meetings[0];
    if (this.state.status !== "loggedin")
      return (
        <View>
          <Text style={PageStyle.header}> FACILITATORS </Text>
          {this.renderFacilitators()}
          <Text style={[PageStyle.header, PageStyle.mapContainer]}>VENUE</Text>
          {/* For refactoring, must be inside Card */}
          <View style={PageStyle.mapContainer} />
          <Card>{this.renderMap(meeting.venues)}</Card>
        </View>
      );
  }

  render() {
    const { navigation, user} = this.props;
    const status = (user.profile.token !=null ? "loggedin" : "loggedout");
    // if(user.profile!=undefined){
    //   console.log("==========rendering Meeting Profile", user.profile);
    // }

    return (
      <View style={PageStyle.container}>
        <Header
          label="MEETING DETAILS"
          status={status}
          settings={() =>
            navigation.navigate("SettingsPage", {
              content: "settings",
              previousRoute: "MeetingLoginPage"
            })
          }
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        {user.hasProfileLoaded ?
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
          </ScrollView> :
          <View style={PageStyle.loading}>
            <ActivityIndicator loaded={user.hasProfileLoaded} size="large" />
          </View>
        }

        <TabbedMenu status={status} user={user} navigation={navigation}/>
      </View >
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
  { fetchProfile }
)(MeetingPage);

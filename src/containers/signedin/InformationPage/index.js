import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Header, TabbedMenu, Card, ListItem } from "../../../components";
import PageStyle from "./styles";
import { DrawerActions } from "react-navigation";
import { connect } from 'react-redux';
import * as actions from "../../../actions";

class InformationPage extends Component {
  state = {
    menu: [
      {
        id: 0,
        image: require("../../../assets/facilitators_icon.png"),
        label: "Facilitators",
        name: "FACILITATORS"
      },
      {
        id: 1,
        image: require("../../../assets/participators_icon.png"),
        label: "Participants",
        name: "PARTICIPANTS"
      },
      {
        id: 2,
        image: require("../../../assets/sponsors_icon.png"),
        label: "Sponsor",
        name: "SPONSORS"
      },
      {
        id: 3,
        image: require("../../../assets/schedule_button.png"),
        label: "Schedule",
        name: "SCHEDULE"
      },
      {
        id: 4,
        image: require("../../../assets/feedback_icon.png"),
        label: "Feedback",
        name: "FEEDBACK"
      }
    ]
  };


  renderMenu(menu) {
    const { navigation, user, status } = this.props;
    const meeting = {id: null}
    if(user !== undefined && user.hasProfileLoaded) {
      meeting.id = user.profile.meetings[0].id
    }

    const menuItem = menu.map(({ id, image, label, name }) => {
      return (
        <View key={id} style={PageStyle.menuContainer}>
          <ListItem
            onPress={() => {
              if (name !== 'SCHEDULE') {
                navigation.navigate("InformationDetailsPage", {
                  content: name,
                  status: status,
                  previousRoute: 'InformationPage'
                })
              } else {
                navigation.navigate("SchedulePage", {
                  meetingId: meeting.id,
                  status: "loggedin"
                })
              }
            }}
          >
            <View style={PageStyle.menuList}>
              <View style={{ width: "25%" }}>
                <Image style={PageStyle.menuIcon} source={image} />
              </View>
              <View style={{ width: "75%" }}>
                <Text style={PageStyle.menuTitle}>{label}</Text>
              </View>
            </View>
            <View style={PageStyle.menuBorder} />
          </ListItem>
        </View >
      );
    });

    return menuItem;
  }



  render() {
    const { navigation, user } = this.props;
    return (
      <View style={PageStyle.container}>
        <Header
          label="INFORMATION"
          status="loggedin"
          settings={() =>
            navigation.navigate("SettingsPage", {
              content: "settings",
              previousRoute: "InformationPage"
            })
          }
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        <Card>{this.renderMenu(this.state.menu)}</Card>
        <TabbedMenu navigation={navigation} user={user} status="loggedin" />
      </View>
    );
  }
}
const mapStateToProps = ({ meetingsState, auth, userState }) => {

  const { meetings } = meetingsState;
  const { user } = userState;
  const { status, token } = auth;
  return {
    meetings, status, user, token
  };
};
export default connect(
  mapStateToProps,
  { actions }
)(InformationPage);
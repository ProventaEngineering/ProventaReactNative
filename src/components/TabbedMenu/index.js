import React, { Component } from "react";
import { View, ActivityIndicator} from "react-native";
import ComponentStyle from "./styles";
import { MenuButton } from "../MenuButton";
import PageStyle from "../../containers/shared/MeetingPage/styles";

class TabbedMenu extends Component {
  renderAnonymous() {
    const { navigation } = this.props;
    return (
      <View style={ComponentStyle.container}>
        <MenuButton
          image={require("../../assets/search_button.png")}
          label="Menu"
          onPress={() => navigation.navigate("SearchPage")}
        />
        <MenuButton
          image={require("../../assets/home_button.png")}
          label="Menu"
          onPress={() => navigation.navigate("HomePage")}
        />
        <MenuButton
          image={require("../../assets/login_button.png")}
          label="Menu"
          onPress={() => navigation.navigate("LoginPage")}
        />
      </View>
    );
  }

  renderSignedIn() {
    const { navigation, user } = this.props;

    if(user !== undefined && user.hasProfileLoaded) {
      const meeting = user.profile.meetings[0]
      return (
        <View style={ComponentStyle.container}>
          <MenuButton
            status="SI"
            image={require("../../assets/proventa_logo_gray.png")}
            label="Menu"
            onPress={() =>
              navigation.navigate("MeetingLoginPage", {
                meetingId: meeting.id,
                status: "loggedin",
                content: "settings"
              })
            }
          />
          <MenuButton
            status="SI"
            image={require("../../assets/info_button.png")}
            label="Menu"
            onPress={() =>
              navigation.navigate("InformationPage", {
                status: "loggedin"
              })
            }
          />
          <MenuButton
            status="SI"
            image={require("../../assets/schedule_button.png")}
            label="Menu"
            onPress={() =>
              navigation.navigate("InformationDetailsPage", {
                content: 'PERSONAL SCHEDULE',
                status: "loggedin"
              })
            }
          />
          <MenuButton
            status="SI"
            image={require("../../assets/inbox_button.png")}
            label="Menu"
            onPress={() => navigation.navigate("InboxPage")}
          />
          <MenuButton
            status="SI"
            image={require("../../assets/checkin_button.png")}
            label="Menu"
            onPress={() => navigation.navigate("CheckInPage")}
          />
        </View>
      );
    }else{
      return (
        <View style={ComponentStyle.container}>
          <View style={PageStyle.loading}>
            <ActivityIndicator loaded={user.hasProfileLoaded} size="large" />
          </View>
        </View>
      );
    }


  }

  render() {
    const { status } = this.props;
    if (status == "loggedin") {
      return this.renderSignedIn();
    } else return this.renderAnonymous();
  }
}

export { TabbedMenu };

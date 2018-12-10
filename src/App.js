import React, { Component } from "react";
import { Dimensions } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  StackNavigator
} from "react-navigation";

// shared routes
import SplashPage from "./containers/shared/SplashPage";
import HomePage from "./containers/shared/HomePage";
import MeetingPage from "./containers/shared/MeetingPage";

//anonymous routes
import SearchPage from "./containers/anonymous/SearchPage";
import LoginPage from "./containers/anonymous/LoginPage";
import SignUpPage from "./containers/anonymous/SignUpPage";

//signedinroutes

import SettingsPage from "./containers/signedin/SettingsPage";
import UserPage from "./containers/signedin/SettingsPage/UserPage";
import CalendarPage from "./containers/signedin/SettingsPage/CalendarPage";
import NotificationPage from "./containers/signedin/SettingsPage/NotificationPage";
import InformationPage from "./containers/signedin/InformationPage";
import InformationDetailsPage from "./containers/signedin/InformationPage/InformationDetailsPage";
import SchedulePage from "./containers/signedin/SchedulePage";
import ScheduleDetailsPage from "./containers/signedin//SchedulePage/ScheduleDetailsPage";
import InboxPage from "./containers/signedin/InboxPage";
import InboxDetailsPage from "./containers/signedin/InboxPage/InboxDetailsPage";
import CheckInPage from "./containers/signedin/CheckInPage";
import { SideMenu } from "../src/components";

const SCREEN_WIDTH = Dimensions.get("window").width;

class App extends Component {
  render() {
    return <AppStack />;
  }
}

const SignedInStack = createStackNavigator(
  {
    // SplashPage: props => <SplashPage {...props} />,
    // HomePage: props => <HomePage {...props} />,
    // MeetingPage: props => <MeetingPage {...props} />,
    SettingsPage: props => <SettingsPage {...props} />,
    // insert user, calendar and notification if in use
    NotificationPage: props => <SettingPage {...props} />,
    InformationPage: props => <InformationPage {...props} />,
    InformationDetailsPage: props => <InformationDetailsPage {...props} />,
    SchedulePage: props => <SchedulePage {...props} />,
    ScheduleDetailsPage: props => <ScheduleDetailsPage {...props} />,
    InboxPage: props => <InboxPage {...props} />,
    CheckInPage: props => <CheckInPage {...props} />
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AnonymousStack = createStackNavigator(
  {
    SplashPage: props => <SplashPage {...props} />,
    HomePage: props => <HomePage {...props} />,
    SearchPage: props => <SearchPage {...props} />,
    LoginPage: props => <LoginPage {...props} />,
    SignUpPage: props => <SignUpPage {...props} />,
    MeetingPage: props => <MeetingPage {...props} />
  },
  {
    intialRouteName: "SplashPage",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const RootStack = createDrawerNavigator(
  {
    AnonymousStack: { screen: AnonymousStack },
    SignedInStack: { screen: SignedInStack }
  },
  {
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: SideMenu
  }
);

const AppStack = StackNavigator(
  {
    RootStack: { screen: RootStack }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
export default App;

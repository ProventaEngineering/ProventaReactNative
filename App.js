if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}
import React, { Component } from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator, createStackNavigator, StackNavigator } from "react-navigation";

// shared routes
import SplashPage from "./src/containers/shared/SplashPage";
import HomePage from "./src/containers/shared/HomePage";
import MeetingPage from "./src/containers/shared/MeetingPage";

//anonymous routes
import SearchPage from "./src/containers/anonymous/SearchPage";
import LoginPage from "./src/containers/anonymous/LoginPage";
import SignUpPage from "./src/containers/anonymous/SignUpPage";

//signedinroutes

import SettingsPage from "./src/containers/signedin/SettingsPage";
import UserPage from "./src/containers/signedin/SettingsPage/UserPage";
import CalendarPage from "./src/containers/signedin/SettingsPage/CalendarPage";
import NotificationPage from "./src/containers/signedin/SettingsPage/NotificationPage";
import InformationPage from "./src/containers/signedin/InformationPage";
import InformationDetailsPage from "./src/containers/signedin/InformationPage/InformationDetailsPage";
import FacilitatorDetailsPage from "./src/containers/signedin/InformationPage/FacilitatorDetailsPage";
import SchedulePage from "./src/containers/signedin/SchedulePage";
import ScheduleDetailsPage from "./src/containers/signedin//SchedulePage/ScheduleDetailsPage";
import InboxPage from "./src/containers/signedin/InboxPage";
import InboxDetailsPage from "./src/containers/signedin/InboxPage/InboxDetailsPage";
import CheckInPage from "./src/containers/signedin/CheckInPage";
import { SideMenu } from "./src/components";

//Middleware
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./src/reducers";
import reduxThunk from "redux-thunk";
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const SCREEN_WIDTH = Dimensions.get("window").width;

class App extends Component {
  componentDidMount() {
    console.log("from root app");
  }

  render() {
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    );
  }
}

const SignedInStack = createStackNavigator(
  {
    // SplashPage: props => <SplashPage {...props} />,
    // HomePage: props => <HomePage {...props} />,
    MeetingLoginPage: props => <MeetingPage {...props} />,
    SettingsPage: props => <SettingsPage {...props} />,
    // insert user, calendar and notification if in use
    CalendarPage: props => <CalendarPage {...props} />,
    InformationPage: props => <InformationPage {...props} />,
    NotificationPage: props => <NotificationPage {...props} />,
    UserPage: props => <UserPage {...props} />,
    InformationDetailsPage: props => <InformationDetailsPage {...props} />,
    FacilitatorDetailsPage: props => <FacilitatorDetailsPage {...props} />,
    SchedulePage: props => <SchedulePage {...props} />,
    ScheduleDetailsPage: props => <ScheduleDetailsPage {...props} />,
    InboxPage: props => <InboxPage {...props} />,
    InboxDetailsPage: props => <InboxDetailsPage {...props} />,
    CheckInPage: props => <CheckInPage {...props} />,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AnonymousStack = createStackNavigator(
  {
    SplashPage: props => <SplashPage {...props} />,
    HomePage: props => <HomePage {...props} />,
    SearchPage: props => <SearchPage {...props} />,
    LoginPage: props => <LoginPage {...props} />,
    SignUpPage: props => <SignUpPage {...props} />,
    MeetingPage: props => <MeetingPage {...props} />,
  },
  {
    intialRouteName: "SplashPage",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const RootStack = createDrawerNavigator(
  {
    AnonymousStack: { screen: AnonymousStack },
    SignedInStack: { screen: SignedInStack },
  },
  {
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: SideMenu,
  },
);

const AppStack = createStackNavigator(
  {
    RootStack: { screen: RootStack },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  },
);
export default App;

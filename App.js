import Reactotron from "./ReactotronConfig";
import React, { Component } from "react";
import {
  Dimensions,
  AsyncStorage,
  Image,
  ActivityIndicator
} from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

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
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./src/reducers";
import reduxThunk from "redux-thunk";
import { useScreens } from "react-native-screens";
useScreens();

import { BLUE } from "./src/styles/common";
const searchIcon = require("./src/assets/search_button.png");
const homeIcon = require("./src/assets/home_button.png");
const loginIcon = require("./src/assets/login_button.png");

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    Reactotron.createEnhancer()
  )
);

const SCREEN_WIDTH = Dimensions.get("window").width;

const SignedInStack = createStackNavigator(
  {
    MeetingPage: props => <MeetingPage {...props} />,
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
    CheckInPage: props => <CheckInPage {...props} />
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const LoginTabStackNavigator = createStackNavigator(
  {
    LoginPage,
    SignUpPage
  },
  {
    headerMode: "none"
  }
);
const AnonymousTabNavigator = createBottomTabNavigator(
  {
    SearchPage: {
      screen: SearchPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ tintColor }} source={searchIcon} />
        )
      }
    },
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ tintColor }} source={homeIcon} />
        )
      }
    },
    LoginPage: {
      screen: LoginTabStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ tintColor }} source={loginIcon} />
        )
      }
    }
  },
  {
    initialRouteName: "HomePage",
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: BLUE,
        inactiveTintColor: "#C3C3C3",
        showLabel: false
      }
    }
  }
);

const AnonymousStackNavigator = createStackNavigator(
  {
    HomePage: AnonymousTabNavigator,
    MeetingPage
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const SignedInTabNavigator = createBottomTabNavigator(
  {
    MeetingLoginPage: {
      screen: MeetingPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ tintColor }} source={homeIcon} />
        )
      }
    },
    InformationPage: {
      screen: InformationPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ tintColor }}
            source={require("./src/assets/info_button.png")}
          />
        )
      }
    },
    InformationDetailsPage: {
      screen: InformationDetailsPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ tintColor }}
            source={require("./src/assets/schedule_button.png")}
          />
        )
      }
    },
    InboxPage: {
      screen: InboxPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ tintColor }}
            source={require("./src/assets/inbox_button.png")}
          />
        )
      }
    },
    CheckInPage: {
      screen: CheckInPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ tintColor }}
            source={require("./src/assets/checkin_button.png")}
          />
        )
      }
    }
  },
  {
    initialRouteName: "MeetingLoginPage",
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: BLUE,
        inactiveTintColor: "#C3C3C3",
        showLabel: false
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        const {
          state: { routeName }
        } = navigation;
        const meetingId = navigation.getParam("meetingId");
        let params = {
          meetingId,
          status: "loggedin"
        };
        if (routeName === "MeetingLoginPage") {
          params = { ...params, content: "settings" };
        } else if (routeName === "InformationPage") {
          params = { ...params };
        } else if (routeName === "InformationDetailsPage") {
          params = {
            ...params,
            status: "loggedin",
            content: "PERSONAL SCHEDULE"
          };
        } else if (routeName === "InboxPage") {
          params = {};
        }
        navigation.setParams(params);
        defaultHandler();
      }
    }
  }
);

const SignedInStackNavigator = createStackNavigator(
  {
    MeetingLoginPage: SignedInTabNavigator,
    SchedulePage,
    SettingsPage,
    UserPage,
    CalendarPage,
    NotificationPage,
    ScheduleDetailsPage,
    InboxDetailsPage
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AnonymousDrawerNavigator = createDrawerNavigator(
  {
    AnonymousTab: { screen: AnonymousStackNavigator }
  },
  {
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: SideMenu,
    headerMode: "none"
  }
);

const SignedInDrawerNavigator = createDrawerNavigator(
  {
    SignedInStack: { screen: SignedInStackNavigator }
  },
  {
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: SideMenu,
    headerMode: "none"
  }
);

const AppStack = createAppContainer(
  createSwitchNavigator(
    {
      Anonymous: AnonymousDrawerNavigator,
      Signed: SignedInDrawerNavigator,
      Splash: SplashPage
    },
    {
      initialRouteName: "Splash",
      headerMode: "none",
      defaultNavigationOptions: {
        headerMode: "none"
      }
    }
  )
);
class App extends Component {
  componentDidMount() {
    // AsyncStorage.clear();
  }

  render() {
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    );
  }
}
export default App;

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import {
  Header,
  TabbedMenu,
  Card,
  StyledInput,
  MainButton,
  SocialButton,
} from "../../../components";
import PageStyle from "./styles";
import { DrawerActions } from "react-navigation";
import { connect } from "react-redux";
import { updateAuth, login, fetchProfile, fetchMeetings } from "../../../actions";
import { Google, AuthSession } from "expo";
import { AuthAPI } from "../../../services";
// import Expo from 'expo';
const LINKEDIN_CLIENT_ID = "81opzafzg88o93";
class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };
  componentDidMount() {
    // this.syncUserWithStateAsync();
  }
  componentDidUpdate() {
    const { token, user, status, meetings, navigation } = this.props;
    console.log("props", this.props);
    const { hasProfileLoaded, profile } = user;
    const { hasMeetingsLoaded } = meetings;
    if (token) {
      this.storeToken(token);
      if (status === "loggedin" && hasProfileLoaded && hasMeetingsLoaded) {
        const meetingId = profile.meetingIds.count > 0 ? profile.meetingIds[0] : meetings.ids[0];
        navigation.navigate("MeetingLoginPage", { status: "loggedin", meetingId: meetingId });
      }
    }
  }
  onChangeText = type => value => this.setState({ [type]: value });
  syncUserWithStateAsync = async () => {
    const user = await Google.signInSilentlyAsync();
    this.setState({ user });
  };

  loginWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        clientId: "6966997513-s5mroeevftu0i8l0a8rmm35c5cv9v12p.apps.googleusercontent.com",
      });
      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
      return { error: true };
    }
  };
  cacheAuthAsync(authState) {
    return AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  }
  storeToken = async token => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {}
  };
  loginWithLinkedIn = async () => {
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      console.log({ redirectUrl });
      const result = await AuthSession.startAsync({
        authUrl:
          `https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
          `&client_id=${LINKEDIN_CLIENT_ID}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
          `&scope=r_liteprofile%20r_emailaddress%20w_member_social`,
      });
      const {
        params: { code },
      } = result;

      this.doLogin({
        code,
        client_id: LINKEDIN_CLIENT_ID,
        redirect_uri: redirectUrl,
        type: "linkedin",
      });
    } catch (error) {
      console.log("loginWithLinkedIn error", error);
    }
  };
  loginUser = () => {
    const { email, password } = this.state;
    this.doLogin({ email, password, type: "email" });
  };
  doLogin = data => {
    const { login } = this.props;
    login(data);
  };
  renderSocialLinks() {
    return (
      <View style={PageStyle.socialContainer}>
        <SocialButton
          type="linkedin"
          label="Log in with LinkedIn"
          icon={require("../../../assets/linkedin_button.png")}
          // onPress={this.signIn.bind(this)}
          onPress={this.loginWithLinkedIn}
        />
        <SocialButton
          type="google"
          label="Log in with Google"
          icon={require("../../../assets/google.png")}
          // onPress={this.signIn.bind(this)}
          onPress={() => {
            this.loginWithGoogle();
          }}
        />
      </View>
    );
  }
  renderLoginForm() {
    return (
      <View>
        <StyledInput
          type="email"
          placeholder="Email Address"
          onChangeText={this.onChangeText("email")}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          onChangeText={this.onChangeText("password")}
        />
      </View>
    );
  }
  render() {
    const { navigation, meetings, message, loading } = this.props;
    return (
      <View style={PageStyle.container}>
        <Header
          label="LOGIN"
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        <ScrollView>
          <View style={ComponentStyle.container}>
            {loading ? (
              <View style={PageStyle.loading}>
                <ActivityIndicator loaded={meetings.hasMeetingsLoaded} size="large" />
              </View>
            ) : (
              <View style={PageStyle.card}>
                {this.renderLoginForm()}
                <MainButton onPress={this.loginUser} label="LOGIN" />
                <View style={PageStyle.errorContainer}>
                  <Text style={PageStyle.errorText}>{message}</Text>
                </View>
                <View style={PageStyle.sectionLine} />
                {this.renderSocialLinks()}
                <Text style={PageStyle.signUpLabel}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
                  <Text style={PageStyle.signUpLink}> Sign up now </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        <TabbedMenu navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = ({ auth, userState, meetingsState }) => {
  const { status, message, emailAddress, password, token, loading } = auth;
  const { user } = userState;
  const { meetings } = meetingsState;
  return { status, message, emailAddress, password, token, user, meetings, loading };
};

const mapDispatchToProps = { login, updateAuth, fetchProfile, fetchMeetings };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

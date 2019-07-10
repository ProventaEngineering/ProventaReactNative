import React, { Component } from "react";
import { Image, View, AsyncStorage } from "react-native";
import PageStyle from "./styles";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { setDefaultHeaders } from "../../../services/client";
class SplashPage extends Component {
  async componentDidMount() {
    try {
      const { navigation } = this.props;
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        setDefaultHeaders({ Authorization: token });
        this.props.updateStatus(token).then(() => {
          const { status } = this.props;
          navigation.navigate("Signed", { meetingId: 35, status });
        });
      } else {
        this.props.navigation.navigate("Anonymous", { meetingId: 35, status: "loggedout" });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    return (
      <View style={PageStyle.container}>
        <Image
          style={PageStyle.splashScreen}
          source={require("../../../assets/splash_image.png")}
        />
      </View>
    );
  }
}

const mapStatetoProps = ({ auth }) => {
  const { status, token } = auth;
  return {
    status,
    token,
  };
};

export default connect(
  mapStatetoProps,
  actions,
)(SplashPage);

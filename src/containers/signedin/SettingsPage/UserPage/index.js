import React, { Component } from "react";
import { View, Text, ScrollView, AsyncStorage } from "react-native";
import { Header, InputBox, TabbedMenu, Card, MainButton } from "../../../../components";
import PageStyle from "./styles";
import { connect } from "react-redux";
import { fetchProfile } from "../../../../actions";

class UserPage extends Component {
  // state = {
  //   userProfile: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     position: "",
  //     company: "",
  //     contactNumber: ""
  //   }
  // }

  // componentDidMount() {
  //   const { token } = this.props;
  //   this.props.fetchProfile(token).then(() => {
  //     this.loadInitialData()
  //   });
  // }

  // componentDidMount() {
  //   const { token } = this.props;
  //   this.props.fetchProfile(token).then(() => {
  //     this.loadInitialData();
  //   })
  // }

  // loadInitialData() {
  //   console.log(this.props.profile);
  // }

  render() {
    const { navigation, user } = this.props;
    console.log(">>>>>>>>>>>>>>>user", user)
    console.log(">>>>>>>>>>>>>>>user", navigation)
    return (
      <View style={PageStyle.container}>
        <Header
          label="USER"
          status="details"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <Card>
            <View style={PageStyle.inputContainer}>
              <InputBox
                label="First Name"
                placeholder={user.profile.firstName}
                value={user.profile.firstName}
                onChangeText={() => console.log("first name")}
              />
              <InputBox
                label="Last Name"
                placeholder={user.profile.lastName}
                value={user.profile.lastName}
                onChangeText={() => console.log("last name")}
              />
              <InputBox
                label="Email Address"
                placeholder={user.profile.email}
                value={user.profile.email}
                onChangeText={() => console.log("email address")}
              />
              <InputBox
                label="Position"
                placeholder={user.profile.position}
                value={user.profile.position}
                onChangeText={() => console.log("Position")}
              />
              <InputBox
                label="Company"
                placeholder={user.profile.company}
                value={user.profile.company}
                onChangeText={() => console.log("Company")}
              />
              <InputBox
                label="Contact Number"
                placeholder={user.profile.contactNumber}
                value={user.profile.contactNumber}
                onChangeText={() => console.log("Contact Number")}
              />
              <MainButton label="UPDATE" />
            </View>
          </Card>
        </ScrollView>
        <TabbedMenu navigation={navigation} status="loggedin" />
      </View>
    );
  }
}

const mapStatetoProps = ({ userState, auth }) => {
  const { user } = userState;
  const { token } = auth;
  return { token, user }
}

export default connect(mapStatetoProps, { fetchProfile })(UserPage);

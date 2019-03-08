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

  componentDidMount() {
    const { token } = this.props;
    console.log('dsadddsa', token)
    this.props.fetchProfile(token).then(() => {
      this.loadInitialData();
    })
  }

  loadInitialData() {
    console.log('dsdsdas');
    console.log(this.props.profile);
  }

  render() {
    const { navigation, profile } = this.props;
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
                placeholder="John"
                value={profile.firstName}
                onChangeText={() => console.log("first name")}
              />
              <InputBox
                label="Last Name"
                placeholder="Smith"
                value={profile.lastName}
                onChangeText={() => console.log("last name")}
              />
              <InputBox
                label="Email Address"
                placeholder="proventa@proventa.com"
                value={profile.email}
                onChangeText={() => console.log("email address")}
              />
              <InputBox
                label="Position"
                placeholder="CEO"
                value={profile.position}
                onChangeText={() => console.log("Position")}
              />
              <InputBox
                label="Company"
                placeholder="Proventa International"
                value={profile.company}
                onChangeText={() => console.log("Company")}
              />
              <InputBox
                label="Contact Number"
                placeholder="+63998 217 5566"
                value={profile.contactNumber}
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

const mapStatetoProps = ({ user, auth }) => {
  const { profile } = user;
  const { token } = auth;
  return { token, profile }
}

export default connect(mapStatetoProps, { fetchProfile })(UserPage);

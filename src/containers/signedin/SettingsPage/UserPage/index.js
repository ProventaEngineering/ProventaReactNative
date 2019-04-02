import React, { Component } from "react";
import { View, Text, ScrollView, AsyncStorage } from "react-native";
import { Header, InputBox, TabbedMenu, Card, MainButton } from "../../../../components";
import PageStyle from "./styles";
import { connect } from "react-redux";
import { fetchProfile, updateProfile } from "../../../../actions";

class UserPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      company: "",
      contactNumber: ""
    }

  }

  componentWillMount() {
    const { navigation, user } = this.props;
    this.setState({
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      email: user.profile.email,
      position: user.profile.position,
      company: user.profile.company,
      contactNumber: user.profile.contactNumber
    })
  }

  render() {
    const { navigation, user } = this.props;
    console.log("dsdsdsd", user.profile);
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
                value={this.state.firstName}
                onChangeText={(input) => this.setState({ firstName: input })}
              />
              <InputBox
                label="Last Name"
                value={this.state.lastName}
                onChangeText={(input) => this.setState({ lastName: input })}
              />
              <InputBox
                label="Email Address"
                value={this.state.email}
                onChangeText={(input) => this.setState({ email: input })}
              />
              <InputBox
                label="Position"
                value={this.state.position}
                onChangeText={(position) => this.setState({ position: input })}
              />
              <InputBox
                label="Company"
                value={this.state.company}
                onChangeText={(input) => this.setState({ company: input })}
              />
              <InputBox
                label="Contact Number"
                value={this.state.contactNumber}
                onChangeText={(input) => this.setState({ contactNumber: input })}
              />
              <MainButton label="UPDATE" onPress={(() => {
                this.props.updateProfile(this.state, user.profile.token).then(() => {
                  alert("Profile Successfully Updated");
                });

              })} />
            </View>
          </Card>
        </ScrollView>
        <TabbedMenu navigation={navigation} status="loggedin" />
      </View>
    );
  }
}

const mapStatetoProps = ({ userState, auth }) => {
  const { user, hasProfileUpdated } = userState;
  const { token } = auth;
  return { token, user, hasProfileUpdated }
}

export default connect(mapStatetoProps, { fetchProfile, updateProfile })(UserPage);

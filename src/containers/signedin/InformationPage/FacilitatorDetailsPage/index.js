import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import { Header, TabbedMenu, Card } from "../../../../components";
import PageStyle from "./styles";
import ComponentStyle from "../../../../components/TabbedMenu/styles";
import {connect} from "react-redux";
import * as actions from "../../../../actions";

class FacilitatorDetailsPage extends Component {
  state = {
    description:
      "Metrics ownership infrastructure alpha. IPhone validation user experience ecosystem paradigm shift first mover advantage business model canvas analytics investor advisor. Prototype channels value proposition research & development sales. Leverage business-to-business social proof infrastructure graphical user interface supply chain vesting period freemium crowdfunding startup bandwidth entrepreneur first mover advantage interaction design. Advisor network effects venture hackathon freemium customer success termsheet creative growth hacking traction. Crowdsource user experience growth hacking beta virality disruptive founders venture pitch first mover advantage. Sales beta assets low hanging fruit growth hacking conversion android. Metrics release pivot venture user experience analytics conversion rockstar lean startup strategy infographic stealth stock low hanging fruit. Social proof series A financing advisor. Gen-z stock iPhone first mover advantage incubator low hanging fruit vesting period buzz value proposition buyer release."
  };

  renderSocialButton(website, linkedin) {
    console.log(`https://www.${linkedin}`);
    return (
      <View style={PageStyle.socialContainer}>
        <TouchableOpacity onPress={() => Linking.openURL(linkedin)}>
          <Image
            source={require("../../../../assets/linkedin.png")}
            style={PageStyle.socialButton}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`https://www.${linkedin}`)}>
          <Image
            source={require("../../../../assets/website_icon.png")}
            style={PageStyle.socialButton}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderContent() {
    const { navigation } = this.props;
    const facilitator = navigation.getParam("facilitator");
    const { first_name, last_name, company, position, website, linkedin, description } = facilitator;


    return (
      <ScrollView>
        <Card>
          <View style={PageStyle.profileContainer}>
            <Image source={{ uri: "https://cdn5.vectorstock.com/i/thumb-large/13/04/male-profile-picture-vector-2041304.jpg" }} style={PageStyle.icon} />
            <Text style={PageStyle.name}> {first_name} {last_name} </Text>
            <Text style={PageStyle.title}> {company} {position} </Text>
            {this.renderSocialButton(website, linkedin)}
            <View style={PageStyle.border} />
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={PageStyle.description}>{description}</Text>
            </View>
            <Text />
          </View>
        </Card>
      </ScrollView>
    );
  }

  render() {
    const { navigation, meetings } = this.props;
    if(meetings.hasMeetingsLoaded) {
      return (
        <View style={PageStyle.container}>
          <Header
            label="FACILITATOR DETAILS"
            status="details"
            onPress={() => {
              navigation.goBack();
            }}
          />
          {this.renderContent()}
          <TabbedMenu navigation={navigation} status="loggedin"/>
        </View>
      );
    }else{
      return (
        <View style={ComponentStyle.container}>
          <View style={PageStyle.loading}>
            <ActivityIndicator loaded="false" size="large" />
          </View>
        </View>
      );
    }
  }
}

const mapStatetoProps = ({ meetingsState, auth, userState }) => {
  const { meeting,
    hasLoadedMeeting
  } = meetingsState;
  const { meetings } = meetingsState;
  const { user } = userState;
  const { status, token } = auth;
  return {
    meetings, meeting, hasLoadedMeeting, status, user, token
  };
};
export default connect(
  mapStatetoProps,
  { actions }
)(FacilitatorDetailsPage);
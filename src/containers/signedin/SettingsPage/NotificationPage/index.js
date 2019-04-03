import React, { Component } from "react";
import { View, Text, Switch } from "react-native";
import { Header, Card, ListItem, TabbedMenu } from "../../../../components";
import PageStyle from "./styles";
import { connect } from "react-redux";
import { fetchNotificationSettings, updateNotificationSettings } from "../../../../actions";

class NotificationPage extends Component {
  state = {
    notifItems: [
      {
        id: 0,
        label: "Push Notifications",
        toggleStatus: null
      },
      {
        id: 1,
        label: "SMS Notifications",
        toggleStatus: false
      },
      {
        id: 2,
        label: "Email Notifications",
        toggleStatus: null
      }
    ]
  };

  componentDidMount() {
    const { user } = this.props;
    this.props.fetchNotificationSettings(user.profile.token)
      .then(() => { this.loadInitialData(); }
      );
  }

  loadInitialData() {
    const { notification } = this.props;
    console.log(notification)
    const options = [...this.state.notifItems];
    options[0].toggleStatus = notification.notificationPush;
    options[1].toggleStatus = notification.notificationSms;
    options[2].toggleStatus = notification.notificationEmail;
    this.setState({ options });
  }

  toggle(i) {
    const { notification, user } = this.props;
    const options = [...this.state.notifItems];

    this.setState({ options });

    if (i === 0) {
      options[i].toggleStatus = !options[i].toggleStatus;
      this.setState(
        { options }, () => {
          const options = [...this.state.notifItems];
          const data = { "notificationPush": this.state.notifItems[0].toggleStatus };
          this.props.updateNotificationSettings(data, user.profile.token, "push");
        }
      );
    } else if (i === 1) {
      options[i].toggleStatus = !options[i].toggleStatus;
      this.setState(
        { options }, () => {
          const options = [...this.state.notifItems];
          const data = { "notificationSms": this.state.notifItems[1].toggleStatus };
          this.props.updateNotificationSettings(data, user.profile.token, "sms");
        }
      );
    } else if (i === 2) {
      options[i].toggleStatus = !options[i].toggleStatus;
      this.setState(
        { options }, () => {
          const options = [...this.state.notifItems];
          const data = { "notificationEmail": this.state.notifItems[2].toggleStatus };
          this.props.updateNotificationSettings(data, user.profile.token, "email");
        }
      );
    }

    if (
      options[i].label === "Push Notifications" &&
      options[i].toggleStatus === true
    ) {
      alert("Push Notifications Enabled");
    } else if (
      options[i].label === "SMS Notifications" &&
      options[i].toggleStatus === true
    ) {
      alert("SMS Notifications Enabled");
    } else if (
      options[i].label === "Email Notifications" &&
      options[i].toggleStatus === true
    ) {
      alert("Email Notifications Enabled");
    }
  }

  renderNotifItems(options) {
    const notifItem = options.map(({ id, label }) => {
      return (
        <View key={id}>
          <ListItem>
            <View style={PageStyle.menuList}>
              <View style={{ width: "82%" }}>
                <Text style={PageStyle.menuTitle}>{label}</Text>
              </View>
              <View style={{ width: "18%" }}>
                <Switch
                  value={this.state.notifItems[id].toggleStatus}
                  onValueChange={this.toggle.bind(this, id)}
                />
              </View>
            </View>
            <View style={PageStyle.menuBorder} />
          </ListItem>
        </View>
      );
    });
    return notifItem;
  }

  render() {
    const { navigation, notification } = this.props;
    notification.notification_push;
    notification.notification_sms;
    notification.notification_email;
    return (
      <View style={PageStyle.container}>
        <Header
          label="NOTIFICATIONS"
          status="details"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Card>{this.renderNotifItems(this.state.notifItems)}</Card>
        <TabbedMenu navigation={navigation} status="loggedin" />
      </View>
    );
  }
}


const mapStatetoProps = ({ userState, auth, settingsState }) => {
  const { user, hasProfileUpdated } = userState;
  const { token } = auth;
  const { notification } = settingsState;
  return { token, user, hasProfileUpdated, notification }
}

export default connect(
  mapStatetoProps,
  { fetchNotificationSettings, updateNotificationSettings }
)(NotificationPage);

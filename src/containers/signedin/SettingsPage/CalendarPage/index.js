import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Switch } from "react-native";
// import RNCalendarEvents from "react-native-calendar-events";
import { Header, Card, ListItem, TabbedMenu } from "../../../../components";
import PageStyle from "./styles";
import {
  fetchCalendarSettings,
  updateCalendarSettings
} from "../../../../actions";
import { Permissions, Calendar } from "expo";

class CalendarPage extends Component {
  state = {
    calendarItems: [
      {
        id: 0,
        label: "Sync to Google Calendar",
        toggleStatus: null
      },
      {
        id: 1,
        label: "Sync to Phone Calendar",
        toggleStatus: null
      }
    ],
    meetings: [
      {
        id: 0,
        time: {
          startingHour: "7",
          startingMinute: "00",
          meridian: "am",
          endingHour: "8",
          endingMinute: "00"
        },
        startDate: new Date("03/16/2019 08:30:00"),
        endDate: new Date("03/16/2019 12:30:00"),
        title: "Pearl Pay Discussion",
        floorplan: {
          location: "Grand Ballroom"
          // image: require("../../../assets/floor_map.png")
        },
        events: []
      },
      {
        id: 1,
        time: {
          startingHour: "7",
          startingMinute: "00",
          meridian: "am",
          endingHour: "8",
          endingMinute: "00"
        },
        startDate: new Date("03/17/2019 10:30:00"),
        endDate: new Date("03/17/2019 14:00:00"),
        title: "Skylabs Introduction",
        floorplan: {
          location: "Concert Hall"
          // image: require("../../../assets/floor_map.png")
        },
        events: []
      },
      {
        id: 2,
        time: {
          startingHour: "7",
          startingMinute: "00",
          meridian: "am",
          endingHour: "8",
          endingMinute: "00"
        },
        startDate: new Date("03/14/2019 8:30:00"),
        endDate: new Date("03/14/2019 11:00:00"),
        title: "Skylabs Introduction",
        floorplan: {
          location: "Concert Hall"
          // image: require("../../../assets/floor_map.png")
        },
        events: []
      }
    ],
    syncPhone: "",
    hasCalendarPermission: null
  };

  resolvePromises(promise, meetingItems, i) {
    return promise
      .then(function() {
        return new Promise(function(r) {
          return setTimeout(r, 300);
        });
      })
      .then(function() {
        RNCalendarEvents.saveEvent(meetingItems[i].title, {
          location: meetingItems[i].floorplan.location,
          startDate: meetingItems[i].startDate.toISOString(),
          endDate: meetingItems[i].endDate.toISOString()
        });
      });
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.fetchCalendarSettings().then(() => {
      this.loadInitialData();
    });
  }

  loadInitialData() {
    const { calendar } = this.props;
    console.log("dsdsd", calendar);

    const options = [...this.state.calendarItems];
    options[0].toggleStatus = calendar.calendarGoogle;
    options[1].toggleStatus = calendar.calendarIcalendar;
    this.setState({
      options
    });
  }

  toggle(i) {
    const { calendar, token } = this.props;
    const options = [...this.state.calendarItems];

    if (i === 0) {
      options[i].toggleStatus = !options[i].toggleStatus;
      this.setState(
        {
          options
        },
        () => {
          const options = [...this.state.calendarItems];
          const data = {
            calendarGoogle: this.state.calendarItems[0].toggleStatus
          };
          this.props.updateCalendarSettings(data, "google");
        }
      );
    } else if (i === 1) {
      options[i].toggleStatus = !options[i].toggleStatus;
      this.setState(
        {
          options
        },
        () => {
          const options = [...this.state.calendarItems];
          const data = {
            calendarIcalendar: this.state.calendarItems[1].toggleStatus
          };
          this.props.updateCalendarSettings(data, token, "calendar");
        }
      );
    }

    if (
      options[i].label === "Sync to Google Calendar" &&
      options[i].toggleStatus === true
    ) {
      alert("Synced to Google Calendar");
    } else if (
      options[i].label === "Sync to Phone Calendar" &&
      options[i].toggleStatus === true
    ) {
      alert("Synced to Phone Calendar");
    }
  }

  renderCalendarItems(items) {
    const { calendar } = this.props;

    const calendarItem = items.map(({ id, label }) => {
      return (
        <View key={id}>
          <ListItem>
            <View style={PageStyle.menuList}>
              <View style={{ width: "82%" }}>
                <Text style={PageStyle.menuTitle}>{label}</Text>
              </View>
              <View style={{ width: "18%" }}>
                <Switch
                  value={
                    id === 0
                      ? this.state.calendarItems[0].toggleStatus
                      : this.state.calendarItems[1].toggleStatus
                  }
                  onValueChange={() => {
                    this.toggle(id);
                  }}
                />
              </View>
            </View>
            <View style={PageStyle.menuBorder} />
          </ListItem>
        </View>
      );
    });
    return calendarItem;
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={PageStyle.container}>
        <Header
          label="CALENDAR"
          status="details"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Card>{this.renderCalendarItems(this.state.calendarItems)}</Card>
        <View style={PageStyle.menuBorder} />
        <TabbedMenu navigation={navigation} status="loggedin" />
      </View>
    );
  }
}

const mapStatetoProps = ({ userState, auth, settingsState }) => {
  const { user, hasProfileUpdated } = userState;
  const { token } = auth;
  const { calendar } = settingsState;
  return { token, user, hasProfileUpdated, calendar };
};

export default connect(
  mapStatetoProps,
  { fetchCalendarSettings, updateCalendarSettings }
)(CalendarPage);

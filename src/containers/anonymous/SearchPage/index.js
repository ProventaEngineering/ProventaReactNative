import React, { Component } from "react";
import { Text, View, Image, ScrollView, TextInput } from "react-native";
import { Header, TabbedMenu, ListItem } from "../../../components";
import PageStyle from "./styles";
import { DrawerActions } from "react-navigation";

class SearchPage extends Component {
  state = {
    searches: [
      {
        id: "apac1",
        title: "https://i.ibb.co/QYRP3H7/event-description-1.png",
        description: "HR Leaders Strategy Meeting APAC",
        event: "Singapore 2018"
      },
      {
        id: "apac2",
        title: "https://i.ibb.co/QYRP3H7/event-description-1.png",
        description: "HR Leaders Strategy Meeting APAC",
        event: "Malaysia 2018"
      },
      {
        id: "apac3",
        title: "https://i.ibb.co/QYRP3H7/event-description-1.png",
        description: "HR Leaders Strategy Meeting APAC",
        event: "Hongkong 2018"
      }
    ],
    searchText: ""
  };
  onChangeTextSearch = searchText => this.setState({ searchText });
  renderSearches(searches) {
    const { navigation } = this.props;
    const search = searches.map(({ id, title, description, event }) => {
      return (
        <View key={id} style={PageStyle.eventList}>
          <ListItem onPress={() => navigation.navigate("MeetingPage")}>
            <View style={PageStyle.eventContainer}>
              <Image style={PageStyle.eventTitle} source={{ uri: title }} />
              <Text style={PageStyle.eventDescription}> {description}</Text>
              <Text style={PageStyle.eventDate}> {event}</Text>
              <View style={PageStyle.eventBorder} />
            </View>
          </ListItem>
        </View>
      );
    });

    return search;
  }

  render() {
    const { navigation } = this.props;
    const { searchText } = this.state;
    return (
      <View style={PageStyle.container}>
        <Header
          label="SEARCH"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <View style={PageStyle.searchContainer}>
          <View style={PageStyle.searchBox}>
            <View style={PageStyle.textInputContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Search"
                onChangeText={this.onChangeTextSearch}
                value={searchText}
              />
            </View>
            <View style={PageStyle.searchButtonContainer}>
              <Image
                style={PageStyle.searchButton}
                source={require("../../../assets/search_button.png")}
              />
            </View>
          </View>
        </View>
        <ScrollView>{this.renderSearches(this.state.searches)}</ScrollView>

        <TabbedMenu navigation={navigation} />
      </View>
    );
  }
}

export default SearchPage;

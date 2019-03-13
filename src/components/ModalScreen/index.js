import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import ComponentStyle from "./styles";

class ModalScreen extends Component {
  state = {
    open: false
  };

  componentWillReceiveProps() {
    // const { first_name, last_name, position, company, description } = this.props.facilitator;
    const { modalVisible } = this.props;
    console.log("ModalVisible: >>>>>>>>>>>", modalVisible);
    this.setState({ open: modalVisible });
  }

  toggleMenu() {
    super.setState({
      open: false
    });
  }

  renderFacilitator(first_name, last_name, position, company, description) {

    return (
      <View style={ComponentStyle.container}>
        <TouchableOpacity
          style={ComponentStyle.closeButton}
          onPress={() => this.toggleMenu()}
        >
          <Image
            style={ComponentStyle.closeButton}
            source={require("../../assets/close_button.png")}
          />
        </TouchableOpacity>
        <ScrollView style={ComponentStyle.facilitatorContainer}>
          <View style={ComponentStyle.facilitatorList}>
            <View style={{ width: "25%" }}>
              <Image
                style={[
                  ComponentStyle.facilitatorIcon,
                  ComponentStyle.profileIcon
                ]}
                source={{ uri: "https://cdn5.vectorstock.com/i/thumb-large/13/04/male-profile-picture-vector-2041304.jpg" }}
              />
            </View>
            <View style={{ width: "75%" }}>
              <Text style={ComponentStyle.facilitatorTitle}>{first_name} {last_name}</Text>
              <Text style={ComponentStyle.facilitatorDescription}>{position} {company} </Text>
            </View>
          </View>
          <View style={ComponentStyle.facilitatorBorder} />
          <Text style={ComponentStyle.description}>
            {description}
          </Text>
        </ScrollView>
      </View>
    );
  }

  render() {
    const { facilitator } = this.props;
    const { first_name, last_name, position, company, description } = facilitator;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.open}
        onRequestClose={() => {
          closeModal();
        }}
      >
     <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.7)"}}>
          {this.renderFacilitator(first_name, last_name, position, company, description)}
        </View>
      </Modal>
    );
  }
}

export { ModalScreen };

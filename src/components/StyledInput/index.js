import React, { Component } from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import ComponentStyle from "./styles";

const images = {
  visibilityIcon: require("../../assets/login_eye.png"),
  userIcon: require("../../assets/login_user.png"),
  passwordIcon: require("../../assets/login_password.png")
};

class StyledInput extends Component {
  renderRightIcon(type, onPress) {
    if (type === "email") {
      return (
        <View style={ComponentStyle.rightIcon}>
          <Image
            style={[ComponentStyle.icon, { opacity: 0 }]}
            source={images.userIcon}
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={ComponentStyle.rightIcon} onPress={onPress}>
          <Image style={[ComponentStyle.icon]} source={images.visibilityIcon} />
        </TouchableOpacity>
      );
    }
  }
  render() {
    const {
      type,
      onChangeText,
      placeholder,
      onPressRightIcon,
      secureTextEntry
    } = this.props;
    return (
      <View style={ComponentStyle.searchSection}>
        <View style={ComponentStyle.leftIcon}>
          <Image
            style={ComponentStyle.icon}
            source={type === "email" ? images.userIcon : images.passwordIcon}
          />
        </View>
        <View style={ComponentStyle.centerBorder}>
          <TextInput
            style={ComponentStyle.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={type === "password" && secureTextEntry}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
          />
        </View>
        {this.renderRightIcon(type, onPressRightIcon)}
      </View>
    );
  }
}

export { StyledInput };

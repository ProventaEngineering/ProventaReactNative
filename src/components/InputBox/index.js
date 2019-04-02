import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import ComponentStyle from "./styles";

class InputBox extends Component {
  render() {
    const { label, placeholder, value, onChangeText } = this.props;
    return (
      <View style={ComponentStyle.container}>
        <Text style={ComponentStyle.label}> {label}</Text>
        <TextInput
          style={ComponentStyle.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
}

export { InputBox };

import React, { Component } from "react";

import { StyleSheet, View, Text } from "react-native";

export default class Card extends Component {
  constructor() {
    super();
  }

  render() {
    const { image, title, brand, tags, onPress } = this.props;

    return (
      <View>
        <Text onPress={onPress} style={styles.title}>
          {title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 30,
  },
});

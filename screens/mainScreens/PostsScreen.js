// import React, { createFactory } from "react";
import { View, Text, StyleSheet } from "react-native";

export const PostsScreen = () => {
  return (
    <View style={styles.containerP}>
      <Text>PostsScreen on "HOME" button #1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerP: {
    // flex: 1, //all space of screen
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#fff",
  },
});

// import React, { createFactory } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PostsScreen } from "./PostsScreen";

export const Home = () => {
  return (
    <View style={styles.containerP}>
      <PostsScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  containerP: {
    flex: 1, //all space of screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

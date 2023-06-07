import { View, Text, StyleSheet } from "react-native";

export const CommentsScreen = () => {
  return (
    <View style={styles.containerP}>
      <Text>CommentsScreen</Text>
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

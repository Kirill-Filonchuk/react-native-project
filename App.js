import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { RegistrationScreen } from "./Screens/RegistrationScreen";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
// width: screenWidth,
// height: screenHeight,

const bgImage = require("./assets/images/photoBg.jpg");
require("./assets/images/photoBg.jpg");
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={styles.bgImage}
      >
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        > */}
        <RegistrationScreen />
        {/* </KeyboardAvoidingView> */}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //all space of screen
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

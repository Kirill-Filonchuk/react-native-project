import { StatusBar } from "expo-status-bar";
import { useState, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useRoute } from "./router";
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function App() {
  const routing = useRoute({});

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1, //all space of screen
//   //   backgroundColor: "#fff",
//   // },
//   // bgImage: {
//   //   flex: 1,
//   //   justifyContent: "flex-end",
//   // },
// });

// import AppLoading from "expo-app-loading";

// const loadApplication = async () => {
//   await Font.loadAsync({
// "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
// "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
// "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
//   });
// };

// if (!iasReady) {
//   return (
//     <AppLoading
//       startAsync={loadApplication}
//       onFinish={() => setIasReady(true)}
//       onError={console.warn}
//     />
//   );
// }
// const togleScreen = (screenName) => {
//   console.log("togle");
//   if (screenName === "register") {
//     setShowScreen("login");
//     console.log("setShowScreen(login");
//     return;
//   } else {
//     setShowScreen("register");
//     console.log("setShowScreen(register");
//   }
//   return;
// };

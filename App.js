import { StatusBar } from "expo-status-bar";
import { useState, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
// width: screenWidth,
// height: screenHeight,

const bgImage = require("./assets/images/photoBg.jpg");

const initialStateReg = {
  login: "",
  email: "",
  password: "",
};
const initialStateLogin = {
  email: "",
  password: "",
};

export default function App() {
  // const [dimensionM, setDimension] = useState(Dimensions.get("window").width);
  const [showScreen, setShowScreen] = useState("register");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [stateRegister, setStateRegister] = useState(initialStateReg);
  const [stateLogin, setStateLogin] = useState(initialStateLogin);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  // console.log(isShowKeyboard);
  // useEffect(() => {}, [setShowScreen, showScreen]);

  // useEffect(() => {
  //   const onChenge = () => {
  //     const width = Dimensions.get("window").width;
  //     setDimension(width);
  //     console.log("width ->", width);
  //   };
  //   Dimensions.addEventListener("change", onChenge);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChenge);
  //   };
  // }, []);

  // console.log("dimensionM ->>", dimensionM);

  const keyBoardHiden = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(stateRegister);
    console.log(stateLogin);
    setStateRegister(initialStateReg);
    setStateLogin(initialStateLogin);
  };
  console.log(showScreen);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyBoardHiden}>
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}
        >
          {/* <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        > */}
          {/* </KeyboardAvoidingView> */}
          {showScreen === "register" ? (
            <RegistrationScreen
              // dimensionM={dimensionM}
              keyBoardHiden={keyBoardHiden}
              isShowKeyboard={isShowKeyboard}
              setIsShowKeyboard={setIsShowKeyboard}
              setStateRegister={setStateRegister}
              stateRegister={stateRegister}
              onLayout={onLayoutRootView}
              setShowScreen={setShowScreen}
            />
          ) : null}
          {showScreen === "login" ? (
            <LoginScreen
              // dimensionM={dimensionM}
              keyBoardHiden={keyBoardHiden}
              isShowKeyboard={isShowKeyboard}
              setIsShowKeyboard={setIsShowKeyboard}
              setStateLogin={setStateLogin}
              stateLogin={stateLogin}
              onLayout={onLayoutRootView}
              setShowScreen={setShowScreen}
            />
          ) : null}
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  },
});

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

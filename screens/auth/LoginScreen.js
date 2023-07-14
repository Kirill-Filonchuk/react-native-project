import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperation";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
// import Icon from "react-native-vector-icons/AntDesign";
// closecircleo;
// const screenHeight = Dimensions.get("window").height;
// const screenWidth = Dimensions.get("window").width;
// const initialDimension = Dimensions.get("window").width;
const bgImage = require("../../assets/images/photoBg.jpg");

const initialStateLogin = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [dimensionL, setDimensionL] = useState(Dimensions.get("window").width);
  const [showPassword, setShowPassword] = useState(true);
  const [stateLogin, setStateLogin] = useState(initialStateLogin);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // console.log("dimensionL -Login>>", dimensionL);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChenge = () => {
      const width = Dimensions.get("window").width;
      setDimensionL(width);
      // console.log("width ->", width);
    };
    dimensionsHandler = Dimensions.addEventListener("change", onChenge);
    return () => dimensionsHandler.remove();
  }, []);
  // console.log(stateLogin);

  const keyBoardHiden = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    // console.log(stateRegister);
    // console.log(stateLogin);
    // setStateRegister(initialStateReg);
    // setStateLogin(initialStateLogin);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    // console.log(stateRegister);
    console.log("stateLogin", stateLogin);
    dispatch(authSignInUser(stateLogin));
    // setStateRegister(initialStateReg);
    setStateLogin(initialStateLogin);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={keyBoardHiden}>
        <View style={styles.containerP}>
          <ImageBackground
            source={bgImage}
            resizeMode="cover"
            style={styles.bgImage}
          >
            <KeyboardAvoidingView
              style={{
                ...styles.container,
                width: dimensionL,
                marginBottom: isShowKeyboard ? -110 : null,
              }}
              behavior={Platform.OS == "ios" ? "padding" : null}
            >
              <Text style={styles.registerText}>Войти</Text>

              <TextInput
                style={{ ...styles.inputFild, width: dimensionL - 32 }}
                textAlign={"left"}
                inputContainerStyle={{ alignItems: "left" }}
                placeholder="Адрес электронной почты"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={stateLogin.email}
                onChangeText={(value) =>
                  setStateLogin((prevState) => ({
                    ...prevState,
                    email: value.toLowerCase(),
                  }))
                }
              />
              <TextInput
                style={{
                  ...styles.inputFild,
                  marginBottom: isShowKeyboard ? 32 : 16,
                  width: dimensionL - 32,
                }}
                textAlign={"left"}
                inputContainerStyle={{ alignItems: "left" }}
                secureTextEntry={showPassword}
                placeholder="Пароль"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={stateLogin.password}
                onChangeText={(value) =>
                  setStateLogin((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity
                style={styles.btnPassInput}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <Text
                  style={{ ...styles.btnPassInputText, left: dimensionL - 270 }}
                  width="100%"
                >
                  {showPassword ? "Показать" : "Скрыть"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.btnRegister,
                  marginTop: isShowKeyboard ? 0 : 27,
                  width: dimensionL - 32,
                }}
                activeOpacity={0.8}
                onPress={handleSubmit}
              >
                <Text style={styles.btnRegisterText} width="100%">
                  Войти
                </Text>
              </TouchableOpacity>
              <View style={styles.textFooterWraper}>
                <Text style={styles.textMessage}>Нет аккаунта?</Text>
                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.btnLoginText}> Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  containerP: {
    flex: 1, //all space of screen
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    alignItems: "center",
    paddingBottom: 78,
    marginBottom: 0,
    backgroundColor: "#fff",
    // width: screenWidth,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  registerText: {
    marginTop: 32,
    marginBottom: 33,
    color: "#212121",
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    letterSpacing: 1.16,
  },
  inputFild: {
    marginBottom: 16,
    padding: 16,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    letterSpacing: 1.16,
  },
  btnPassInput: {
    position: "absolute",
  },
  btnPassInputText: {
    position: "relative",
    bottom: -186,
    color: "#1B4371",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
    letterSpacing: 1.16,
  },
  btnRegister: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    // marginTop: 27,
    borderRadius: 100,
    height: 51,
  },
  btnRegisterText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
    letterSpacing: 1.167,
  },
  textFooterWraper: {
    marginTop: 16,
    justifyContent: "center",
    flexDirection: "row",
    color: "#1B4371",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
    letterSpacing: 1.16,
  },
  textMessage: {
    color: "#1B4371",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
    letterSpacing: 1.16,
  },
  btnLoginText: {
    color: "#1B4371",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
    letterSpacing: 1.16,
  },
});

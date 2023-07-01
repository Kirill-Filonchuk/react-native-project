import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
const bgImage = require("../../assets/images/photoBg.jpg");

const initialStateReg = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  console.log(navigation);
  const [image, setImage] = useState(null);
  const [dimensionR, setDimensionR] = useState(Dimensions.get("window").width);
  const [showPassword, setShowPassword] = useState(true);
  const [stateRegister, setStateRegister] = useState(initialStateReg);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  console.log("dimensionR -Register>>", dimensionR);
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensionR(width);
      // console.log("width ->", width);
    };
    dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  const keyBoardHiden = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(stateRegister);
    // console.log(stateLogin);
    setStateRegister(initialStateReg);
    // setStateLogin(initialStateLogin);
  };

  const delPickImage = () => {
    setImage(null);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
                width: dimensionR,
                marginBottom: isShowKeyboard ? -110 : null,
              }}
              behavior={Platform.OS == "ios" ? "padding" : null}
            >
              <View style={styles.fotoField}>
                {image && (
                  <Image source={{ uri: image }} style={styles.imgInput} />
                )}
              </View>

              <Text style={styles.registerText}>Регистрация</Text>

              {!image ? (
                <TouchableOpacity
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                  style={styles.btnFotoInput}
                >
                  <Icon name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  title="Pick an image from camera roll"
                  onPress={delPickImage}
                  style={styles.btnFotoInput}
                >
                  <Icon name="closecircleo" size={25} color="#BDBDBD" />
                </TouchableOpacity>
              )}

              <TextInput
                style={{ ...styles.inputFild, width: dimensionR - 32 }}
                textAlign={"left"}
                inputContainerStyle={{ alignItems: "left" }}
                placeholder="Логин"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={stateRegister.login}
                onChangeText={(value) =>
                  setStateRegister((prevState) => ({
                    ...prevState,
                    login: value,
                  }))
                }
              />
              <TextInput
                style={{ ...styles.inputFild, width: dimensionR - 32 }}
                textAlign={"left"}
                inputContainerStyle={{ alignItems: "left" }}
                placeholder="Адрес электронной почты"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={stateRegister.email}
                onChangeText={(value) =>
                  setStateRegister((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <TextInput
                style={{ ...styles.inputFild, width: dimensionR - 32 }}
                textAlign={"left"}
                inputContainerStyle={{ alignItems: "left" }}
                secureTextEntry={showPassword}
                placeholder="Пароль"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={stateRegister.password}
                onChangeText={(value) =>
                  setStateRegister((prevState) => ({
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
                <Text style={styles.btnPassInputText} width="100%">
                  {showPassword ? "Показать" : "Скрыть"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.btnRegister,
                  marginTop: isShowKeyboard ? 0 : 27,
                  width: dimensionR - 32,
                }}
                activeOpacity={0.8}
                onPress={keyBoardHiden}
              >
                <Text style={styles.btnRegisterText} width="100%">
                  Зарегистрироваться
                </Text>
              </TouchableOpacity>
              <View style={styles.textFooterWraper}>
                <Text style={styles.textMessage}>Уже есть аккаунт? </Text>
                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.btnLoginText}>Войти</Text>
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
    // position: "absolute",
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
  },
  container: {
    alignItems: "center",
    paddingBottom: 78,
    marginBottom: 0,
    backgroundColor: "#fff",
    // width: dimensionR,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  fotoField: {
    position: "absolute",
    top: -55,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  imgInput: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnFotoInput: {
    position: "relative",
    right: -60,
    top: -140,
    backgroundColor: "#fff",
    // borderColor: "#FF6C00",
    // borderStyle: "solid",
    // borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  registerText: {
    marginTop: 92,
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
    fontFamily: "Roboto-Regular",
    letterSpacing: 1.16,
  },
  btnPassInput: {
    position: "absolute",
  },
  btnPassInputText: {
    position: "relative",
    bottom: -335,
    left: 150,
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

// import * as Svg from "react-native-svg";
// import * as React from "react";
// import Svg, { Circle, Rect } from "react-native-svg";
// import IconXmark from "@/icons/IconXmark";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Ionicons from "@expo/vector-icons/Ionicons";
{
  /* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */
}
// console.log("dimensionR -Register>>", dimensionR);
// useEffect(() => {
//   const onChange = () => {
//     const width = Dimensions.get("window").width;
//     setDimensionR(width);
//     // console.log("width ->", width);
//   };
//   Dimensions.addEventListener("change", onChange);
//   return () => {
//     Dimensions.removeEventListener("change", onChange);
//   };
// }, []);

// closecircleo;
// const screenHeight = Dimensions.get("window").height;
// const screenWidth = Dimensions.get("window").width;

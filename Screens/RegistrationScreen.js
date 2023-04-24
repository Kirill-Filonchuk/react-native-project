import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  console.log(isShowKeyboard);
  const keyBoardHiden = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, marginBottom: isShowKeyboard ? -110 : 0 }}
      behavior={Platform.OS == "ios" ? "padding" : null}
    >
      {/* <View style={styles.container}> */}
      <View style={styles.fotoField}></View>

      <Text style={styles.registerText}>Регистрация</Text>
      <TouchableOpacity style={styles.btnFotoInput}>
        <Text style={styles.btnFotoInputText} width="100%">
          +
        </Text>
      </TouchableOpacity>
      <TextInput
        style={{ ...styles.inputFild, width: screenWidth - 32 }}
        textAlign={"left"}
        inputContainerStyle={{ alignItems: "left" }}
        placeholder="Логин"
        onFocus={() => {
          setIsShowKeyboard(true);
        }}
      />
      <TextInput
        style={{ ...styles.inputFild, width: screenWidth - 32 }}
        textAlign={"left"}
        inputContainerStyle={{ alignItems: "left" }}
        placeholder="Адрес электронной почты"
        onFocus={() => {
          setIsShowKeyboard(true);
        }}
      />
      <TextInput
        style={{ ...styles.inputFild, width: screenWidth - 32 }}
        textAlign={"left"}
        inputContainerStyle={{ alignItems: "left" }}
        secureTextEntry={showPassword}
        placeholder="Пароль"
        onFocus={() => {
          setIsShowKeyboard(true);
        }}
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
          width: screenWidth - 32,
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
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.btnLoginText}>Войти</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    position: "relative",
    alignItems: "center",
    paddingBottom: 78,
    // marginBottom: 0,
    backgroundColor: "#fff",
    width: screenWidth,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  fotoField: {
    position: "absolute",
    top: -50,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btnFotoInput: {
    position: "relative",
    right: -60,
    top: -150,
    backgroundColor: "#fff",
    borderColor: "#FF6C00",
    borderStyle: "solid",
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnFotoInputText: {
    textAlign: "center",
    color: "#FF6C00",
    backgroundColor: "transparent",
    fontSize: 16,
  },
  registerText: {
    marginTop: 92,
    marginBottom: 33,
    color: "#212121",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputFild: {
    marginBottom: 16,
    padding: 16,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  btnPassInput: {
    position: "absolute",
  },
  btnPassInputText: {
    position: "relative",
    bottom: -353,
    left: 150,
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
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
    fontWeight: 400,
  },
  textFooterWraper: {
    marginTop: 16,
    justifyContent: "center",
    flexDirection: "row",
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
  },
  textMessage: {
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
  },
  btnLoginText: {
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
  },
});
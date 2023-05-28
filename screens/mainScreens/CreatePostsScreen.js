import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome, Feather } from "@expo/vector-icons";

const dim = Dimensions.get("window").width;

const initialStateForm = {
  namePlace: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null); //in video ->setSnap
  const [photo, setPhoto] = useState(null);
  const [namePlace, setNamePlace] = useState(initialStateForm.namePlace);
  const [toggle, setToggle] = useState(false);

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    console.log("cameraRef URI ->", photo.uri); //takePictureAsync() - take ref to our photo
    setPhoto(photo.uri);
    setToggle(!toggle);
    console.log("navigation", navigation);
  };

  const toPublish = () => {
    console.log("toPublish->navigation", navigation);
    navigation.navigate("Home -> PostsScreen", { photo, namePlace });
    console.log("{ photo, namePlace }", { photo, namePlace });
    setNamePlace("");
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.containerP}>
        <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
          {photo && (
            <View style={styles.cameraContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          )}
          <TouchableOpacity
            // style={styles.btnLogin}
            onPress={takePhoto}
          >
            <View style={styles.snapContainer}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </View>
          </TouchableOpacity>
        </Camera>
      </View>
      <View style={styles.editPhoto}>
        <Text style={{ color: "#BDBDBD" }}>
          {toggle ? "Редактировать фото" : "Загрузите фото"}
        </Text>
      </View>
      <View style={{ ...styles.nameWrap, width: dim - 16 }}>
        <TextInput
          style={styles.inputFild}
          textAlign="left"
          placeholder="Название..."
          value={namePlace}
          onChangeText={(value) => {
            setNamePlace(value);
          }}
        />
      </View>
      {/* text-align: center; */}
      <View style={{ ...styles.geoPositWrap, width: dim - 16 }}>
        <Feather name="map-pin" size={24} color="#BDBDBD" />
        <TextInput
          style={styles.inputFildGeo}
          textAlign="left"
          placeholder="Местность..."
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.btnUpLoad,
          // marginTop: isShowKeyboard ? 0 : 27,
          width: dim - 32,
        }}
        activeOpacity={0.8}
        onPress={toPublish}
      >
        <Text style={styles.btnUpLoadText} width="100%">
          Опубликовать
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    //all space of screen
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerP: {
    overflow: "hidden",
    height: 240,
    width: 343,

    marginTop: 32,
    justifyContent: "center",

    borderRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
  },
  camera: {
    height: 240,
    width: 343,

    justifyContent: "center",
    alignItems: "center",
  },
  snapContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 120,
    // backgroundColor: "transparent",
    backgroundColor: "#fff",
  },
  cameraContainer: {
    position: "absolute",
    height: 240,
    width: 343,
    // top: 200,
    // left: 10,
    borderColor: "#fda",
    borderWidth: 1,
    borderRadius: 18,
  },
  editPhoto: {
    paddingHorizontal: 8,
    marginRight: "auto",
    marginTop: 8,
  },
  btnUpLoad: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    marginTop: 32,
    borderRadius: 100,
    height: 51,
  },
  btnUpLoadText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
    letterSpacing: 1.167,
  },
  nameWrap: {
    marginTop: 33,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
  },
  inputFild: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    // marginTop: 33,
    paddingBottom: 15,
    paddingTop: 15,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
  inputFildGeo: {
    flex: 1,
    height: 66,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 8,
    // marginTop: 33,
    // paddingBottom: 15,
    // paddingTop: 15,
  },
  geoPositWrap: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
  },
});

// camera: {
//   flex: 2,
//   overflow: "hidden",
//   background: "transparent",
//   height: "90%",
//   width: "90%",
//   // marginTop: 32,
//   // marginHorizontal: 16,
//   justifyContent: "center",
//   alignItems: "center",
//   // backgroundColor: "#F6F6F6",
//   borderRadius: "20%",
//   borderColor: "#E8E8E8",
//   borderStyle: "solid",
//   borderWidth: 1,
// },
// cameraWraper: {
//   height: 240,
//   width: 343,
//   // backgroundColor: "#F6F6F6",
//   // borderRadius: 18,
//   // borderColor: "#E8E8E8",
//   // borderStyle: "solid",
//   // borderWidth: 1,
// },

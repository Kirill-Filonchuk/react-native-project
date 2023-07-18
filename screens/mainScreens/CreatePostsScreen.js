import React, { useState, useEffect, useRef } from "react";
import { ref } from "firebase/storage";
import auth, { storage } from "../../firebase/config";
// import { getHeaderTitle } from "@react-navigation/elements";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
// import { randomUUID } from "expo-crypto";

import {
  View,
  TouchableOpacity,
  Pressable,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { uploadBytes } from "firebase/storage";

// const dim = Dimensions.get("window").width;

const initialStateForm = {
  photo: null,
  namePlace: "",
  locationPlace: null,
  location: null,
  cameraRef: null,
};

export const CreatePostsScreen = ({ navigation }) => {
  const [dimensionR, setDimensionR] = useState(Dimensions.get("window").width);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [cameraRef, setCameraRef] = useState(initialStateForm.cameraRef); //in video ->setSnap
  const [location, setLocation] = useState(initialStateForm.location);
  const [locationPlace, setLocationPlace] = useState(
    initialStateForm.locationPlace
  );
  const [errorMsg, setErrorMsg] = useState(null);

  const [photo, setPhoto] = useState(initialStateForm.photo);

  const [namePlace, setNamePlace] = useState(initialStateForm.namePlace);
  const [toggle, setToggle] = useState(false);

  // console.log("dimensionR -CreatePostsScreen>>", dimensionR);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log("Permission to access location was denied");
        setLocation(errorMsg);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log("location ->>>>", location);
    })();
  }, [photo]);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensionR(width);
    };
    dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  // const UUID = randomUUID();
  console.log(
    "Your UUID: ",
    Math.floor((Date.now() + Math.random() * 100).toString())
  );
  // Upload foto to Server
  const uploadPhotoToServer = async (photo) => {
    const response = await fetch(photo);
    const file = await response.blob();
    const randomStr = Math.floor((Date.now() + Math.random() * 100).toString());
    // await db.storage().ref(`postImg/${randomStr}`).put(file);
    const refImg = await ref(storage, `postImg/${randomStr}`);
    const data = await uploadBytes(refImg, file);
    console.log("data", data);
  };

  const keyBoardHiden = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  // console.log("location EseEff", location);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setToggle(!toggle);
    }
  };

  const takePhoto = async () => {
    // await Permissions.askAsync(Permissions.LOCATION);
    const photo = await cameraRef.takePictureAsync();
    console.log("cameraRef URI ->", photo.uri); //takePictureAsync() - take ref to our photo
    setPhoto(photo.uri);
    setToggle(!toggle);
  };

  const toPublish = () => {
    uploadPhotoToServer(photo);
    navigation.navigate("PostsScreen", {
      screen: "DefaultScreen",
      params: {
        photo: photo,
        namePlace: namePlace,
        location: location,
        locationPlace: locationPlace,
      },
    });
    // console.log("!!!----{ photo, namePlace }", { photo, namePlace, location });
    resetState();
    // setNamePlace("");
    // setLocationPlace("");
  };

  function resetState() {
    const { photo, namePlace, locationPlace, location, cameraRef } =
      initialStateForm;
    setPhoto(photo);
    setNamePlace(namePlace);
    setLocationPlace(locationPlace);
    setLocation(location);
    setCameraRef(cameraRef);
  }

  return (
    // <View style={styles.screenContainer}>
    <TouchableWithoutFeedback onPress={keyBoardHiden}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          ...styles.screenContainer,
          // marginBottom: isShowKeyboard ? -80 : null,
        }}
      >
        <View
          style={{ ...styles.containerP, marginTop: isShowKeyboard ? -50 : 32 }}
        >
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
        {toggle ? (
          <TouchableOpacity onPress={takePhoto} style={styles.editPhoto}>
            <Text style={{ color: "#BDBDBD" }}>"Редактировать фото"</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.editPhoto}>
            <Text style={{ color: "#BDBDBD" }}>"Загрузите фото"</Text>
          </TouchableOpacity>
        )}
        <View style={{ ...styles.nameWrap, width: dimensionR - 16 }}>
          <TextInput
            style={styles.inputFild}
            textAlign="left"
            placeholder="Название..."
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            value={namePlace}
            onChangeText={(value) => {
              setNamePlace(value);
            }}
          />
        </View>
        {/* text-align: center; */}
        <View style={{ ...styles.geoPositWrap, width: dimensionR - 16 }}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <TextInput
            style={styles.inputFildGeo}
            textAlign="left"
            placeholder="Местность..."
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            value={locationPlace}
            onChangeText={(value) => setLocationPlace(value)}
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.btnUpLoad,
            // marginTop: isShowKeyboard ? 0 : 27,
            width: dimensionR - 32,
          }}
          activeOpacity={0.8}
          onPress={toPublish}
        >
          <Text style={styles.btnUpLoadText} width="100%">
            Опубликовать
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={resetState}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#FF6C00" : "#F6F6F6" },
            styles.trashBask,
          ]}
        >
          {({ pressed }) => (
            <Feather
              name="trash-2"
              size={24}
              color={pressed ? "white" : "#BDBDBD"}
            />
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    // </View>
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
  trashBask: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 34,
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

// const { status } = await Location.requestBackgroundPermissionsAsync();
// if (status === "granted") {
//   const startLoc = await Location.startLocationUpdatesAsync(
//     LOCATION_TASK_NAME,
//     {
//       accuracy: Location.Accuracy.BestForNavigation,
//       timeInterval: 3000,
//       foregroundService: {
//         notificationTitle: "BackgroundLocation Is On",
//         notificationBody: "We are tracking your location",
//         notificationColor: "#ffce52",
//       },
//     }
//   );
//   console.log("status", startLoc);
// }
// Location.getForegroundPermission;
// const location = await Location.getLastKnownPositionAsync();
// console.log("location", location);

import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ref } from "firebase/storage";
import auth, { storage } from "../../firebase/config";
import { displayCameraActivityFailedAlert } from "../../patch/cameraPatch";
// import { getHeaderTitle } from "@react-navigation/elements";
import {
  Camera,
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
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
  fotoRef: null,
  cameraRef: null,
};

export const CreatePostsScreen = ({ navigation }) => {
  const [dimensionR, setDimensionR] = useState(Dimensions.get("window").width);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  ///////////
  const [cameraRef, setCameraRef] = useState(initialStateForm.cameraRef); //in video ->setSnap

  // const [isCameraReady, setIsCameraReady] = useState(false);

  // const onCameraReady = () => {
  //   setIsCameraReady(true);
  // };

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [errorCameraPermission, setErrorCameraPermission] = useState("");
  ///////////
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [errorMediaLibraryPermission, setErrorMediaLibraryPermission] =
    useState("");
  const [photo, setPhoto] = useState(initialStateForm.photo);
  /////
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [errorLocationPermission, setErrorLocationPermission] = useState("");
  const [location, setLocation] = useState(initialStateForm.location);
  const [locationPlace, setLocationPlace] = useState(
    initialStateForm.locationPlace
  );
  //Erroro message Location
  const [errorMsg, setErrorMsg] = useState(null);

  const [namePlace, setNamePlace] = useState(initialStateForm.namePlace);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const mediaLibraryPermission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasMediaLibraryPermission(
          mediaLibraryPermission.status === "granted"
        );
      } catch (error) {
        setErrorMediaLibraryPermission(error.message);
        alert(errorMediaLibraryPermission);
      }
      try {
        const cameraStatusPermission =
          await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatusPermission.status === "granted");
      } catch (error) {
        setErrorCameraPermission(error.message);
        alert(errorCameraPermission);
      }
      try {
        const locationPermission =
          await Location.requestForegroundPermissionsAsync();
        setHasLocationPermission(locationPermission.status === "granted");
      } catch (error) {
        setErrorLocationPermission(error.message);
        alert(errorLocationPermission);
      }
    })();
  }, []);
  console.log("hasCameraPermission", hasCameraPermission);
  console.log("hasMediaLibraryPermission", hasMediaLibraryPermission);
  console.log("hasLocationPermission", hasLocationPermission);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensionR(width);
    };
    dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  ///////// Upload foto to Server
  const uploadPhotoToServer = async (photo) => {
    const response = await fetch(photo);
    const file = await response.blob();
    const randomStr = Math.floor((Date.now() + Math.random() * 100).toString());
    // await db.storage().ref(`postImg/${randomStr}`).put(file);
    const refImg = await ref(storage, `postImg/${randomStr}`);
    const data = await uploadBytes(refImg, file);
    console.log("uploadPhotoToServer-data", data);
  };
  ///////////ChatGpt advice - don't working but does not interfere

  // const activateCamera = async () => {
  //   if (cameraRef && hasCameraPermission) {
  //     // Проверяем, если камера готова
  //     if (cameraRef.isAvailable()) {
  //       const { status } = await Camera.requestCameraPermissionsAsync();
  //       if (status === "granted") {
  //         // Убедимся, что камера была остановлена перед повторным запуском
  //         if (cameraRef.isPreviewing) {
  //           cameraRef.stopPreview();
  //         }
  //         cameraRef.resumePreview();
  //       }
  //     } else {
  //       alert("Ошибка: Камера не готова.");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     // Вызываем функцию активации камеры при возврате на экран с камерой
  //     activateCamera();
  //   });

  //   return () => {
  //     // При выходе с экрана останавливаем камеру, чтобы освободить ресурсы
  //     if (cameraRef) {
  //       cameraRef.pausePreview();
  //     }
  //     // Удаляем listener
  //     unsubscribe();
  //   };
  // }, [navigation]);

  ////
  const keyBoardHiden = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  // console.log("location EseEff", location);

  const pickImage = async () => {
    if (hasMediaLibraryPermission) {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      };
      let result = await ImagePicker.launchImageLibraryAsync(options);

      console.log(result);

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
        setToggle(!toggle);
      }
    }
  };

  const takePhoto = async () => {
    const isCameraPerm = await getCameraPermissionsAsync();
    // await getCurrentPositionAsync();
    console.log("isCameraPerm -!!!!--->", isCameraPerm);
    if (cameraRef && hasCameraPermission && hasLocationPermission) {
      // if (!isCameraReady) {
      //   await activateCamera(); // Вызываем функцию активации камеры, если она еще не готова
      // }
      try {
        const options = { quality: 0.7 };
        const photo = await cameraRef.takePictureAsync(options);
        console.log("CameraRef->", cameraRef);

        console.log("cameraRef URI ->", photo.uri); //takePictureAsync() - take ref to our photo
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setPhoto(photo.uri);
        setToggle(!toggle);
      } catch (error) {
        // alert(error.message);
        console.error(error.message);
        setErrorMsg(error.message);
      }
    } else {
      alert(
        "Ошибка: Камера не запущена или нет разрешения на использование камеры и местоположения."
      );
    }
  };

  const toPublish = async () => {
    try {
      console.log("cameraRef URI ->", photo);
      await uploadPhotoToServer(photo);
      navigation.navigate("PostsScreen", {
        screen: "DefaultScreen",
        params: {
          photo: photo,
          namePlace: namePlace,
          location: location,
          locationPlace: locationPlace,
        },
      });
      resetState();
    } catch (error) {
      console.error(error.message);
    }
  };

  function resetState() {
    const { photo, namePlace, locationPlace, location } = initialStateForm;
    setPhoto(photo);
    setNamePlace(namePlace);
    setLocationPlace(locationPlace);
    setLocation(location);
  }
  // console.log("Camera==>>", Camera);
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
          {/* <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}> cameraRef */}
          <Camera
            style={styles.camera}
            ref={setCameraRef}
            type={type}
            flashMode={flash}
            // onCameraReady={onCameraReady}
            // useCamera2Api={false}
          >
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
        {!hasCameraPermission && <Text>No camere Permission</Text>}
        {!cameraRef && <Text>No cameraUseRef - {errorMsg}</Text>}
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

//restart App
// try {
//   result = await ImagePicker.launchCameraAsync();
// } catch (e) {
//   if (
//     e.message.includes(
//       "Call to function 'ExponentImagePicker.launchCameraAsync' has been rejected"
//     )
//   ) {
//     displayCameraActivityFailedAlert();
//   } else {
//     throw e;
//   }
// }

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

// const activateCamera = async () => {
//   if (cameraUseRef.current) {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status === "granted") {
//       // Включаем камеру
//       cameraUseRef.current.resumePreview();
//     }
//   }
// };

// useEffect(() => {
//   const unsubscribe = navigation.addListener("focus", () => {
//     // Вызываем функцию активации камеры при возврате на экран с камерой
//     activateCamera();
//   });

//   return () => {
//     // При выходе с экрана останавливаем камеру, чтобы освободить ресурсы
//     if (cameraUseRef.current) {
//       cameraUseRef.current.pausePreview();
//     }
//     // Удаляем listener
//     unsubscribe();
//   };
// }, [navigation]);

// const activateCamera = async () => {
//   if (cameraUseRef.current) {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status === "granted") {
//       cameraUseRef.current.resumePreview();
//     } else {
//       const { status: newStatus } =
//         await Camera.requestCameraPermissionsAsync();
//       if (newStatus === "granted") {
//         cameraUseRef.current.resumePreview();
//       } else {
//         setErrorCameraPermission(
//           "Ошибка: Нет разрешения на использование камеры."
//         );
//       }
//     }
//   }
// };

// useEffect(() => {
//   const unsubscribe = navigation.addListener("focus", () => {
//     // Вызываем функцию активации камеры при возврате на экран с камерой
//     activateCamera();
//   });

//   return () => {
//     // При выходе с экрана останавливаем камеру, чтобы освободить ресурсы
//     if (cameraUseRef.current) {
//       cameraUseRef.current.pausePreview();
//     }
//     // Удаляем listener
//     unsubscribe();
//   };
// }, [navigation]);
// useFocusEffect(
//   React.useCallback(() => {
//     activateCamera();
//     return () => {
//       if (cameraUseRef.current) {
//         cameraUseRef.current.pausePreview();
//       }
//     };
//   }, [])
// );
// useFocusEffect(
//   React.useCallback(() => {
//     activateCamera();
//     return () => {
//       // При выходе с экрана останавливаем камеру, чтобы освободить ресурсы
//       if (cameraUseRef.current) {
//         cameraUseRef.current.pausePreview();
//       }
//     };
//   }, [])
// );
// useEffect(() => {
//   if (navigation.isFocused()) {
//     activateCamera(); // replace with your function
//   }
// }, []);

// useEffect(() => {
//   const unsubscribe = navigation.addListener("focus", () => {
//     // Вызываем функцию активации камеры при возврате на экран с камерой
//     activateCamera();
//   });
//   // console.log("unsubscribe", unsubscribe);

//   return unsubscribe;
// }, [navigation]);

// const activateCamera = async () => {
//   console.log("CameraRef->", cameraUseRef.current);
//   console.log("hasCameraPermission->", hasCameraPermission);

//   if (cameraUseRef.current) {
//     const { status } =
//       await cameraUseRef.current.requestCameraPermissionsAsync();

//     if (status !== "granted") {
//       const { status } =
//         await cameraUseRef.current.requestCameraPermissionsAsync();
//       setHasCameraPermission(status === "granted");
//     }
//   }
//   console.log("hasCameraPermission->2", hasCameraPermission);
//   // const cameraStatusPermission = await Camera.requestCameraPermissionsAsync();
//   // setHasCameraPermission(cameraStatusPermission.status === "granted");
// };

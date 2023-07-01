import MapView, { Marker } from "react-native-maps";

import { View, Text, StyleSheet } from "react-native";

export const MapScreen = ({ route }) => {
  console.log("coords->MapScreen", { route });
  const { latitude, longitude } = route.params.coords;
  return (
    <View style={styles.containerP}>
      <MapView
        style={styles.mapV}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title="I'm here"
          coordinate={{ latitude: latitude, longitude: longitude }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerP: {
    flex: 1, //all space of screen
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  mapV: {
    width: "100%",
    height: "100%",
  },
});

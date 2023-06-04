// import React, { createFactory } from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
// route catch all data that come in to the Component

const Item = ({ photo, title, loc }) => (
  <View style={styles.item}>
    <Image source={{ uri: photo }} style={{ width: 350, height: 200 }} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>
      {loc.coords.latitude} * and * {loc.coords.longitude}
    </Text>
  </View>
);
export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route) {
      setPosts((prevState) => [...prevState, route]);
    }
  }, [route]);
  // console.log("route.params", { route });
  const renderItem = ({ item }) => (
    <Item title={item.namePlace} photo={item.photo} loc={item.location} />
  );
  return (
    <View style={styles.containerP}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, indx) => indx.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerP: {
    flex: 1, //all space of screen
    justifyContent: "center",
    // width: 300,
    // alignItems: "center",
    backgroundColor: "#fdf",
    paddingBottom: 80,
  },
  item: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "blue",
    // backgroundColor: "#f9c2ff",
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

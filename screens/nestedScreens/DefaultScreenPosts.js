import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
// route catch all data that come in to the Component
import { Feather } from "@expo/vector-icons";

const Item = ({
  photo,
  title,
  loc,
  locPlace,
  toMap,
  toCom,
  countCommets = 0,
}) => {
  if (photo) {
    const titleUnderPhoto = title ? title : "No Name";
    return (
      <View style={styles.item}>
        <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
        <Text style={styles.title}>{titleUnderPhoto}</Text>
        {/* <Text style={styles.title}>
      {loc.coords.latitude} * and * {loc.coords.longitude}
    </Text> */}
        <View style={styles.bottomImgLinks}>
          <TouchableOpacity
            onPress={() => toCom()}
            style={{ flexDirection: "row" }}
          >
            <Feather name="message-circle" size={24} color="#BDBDBD" />
            <Text style={{ ...styles.countCommets, marginLeft: 6 }}>
              {countCommets ? `${countCommets}` : "0"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toMap(loc)}
            style={{ flexDirection: "row" }}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text style={{ ...styles.locPlace, marginLeft: 4 }}>
              {locPlace ? `${locPlace}` : `Satelite Error`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
// console.log("route.params -DefaultScreenPosts", route.params);
// console.log("route.params", { route });
// DefaultScreenPosts
export const DefaultScreenPosts = ({ route, navigation }) => {
  // Whithout on-time listenen
  // const [posts, setPosts] = useState([]);
  // console.log("posts --->", posts);

  // const getAllPost = async () => {
  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   // setPosts(querySnapshot.forEach((doc) => ({ ...doc.data(), id: doc.id })));
  //   querySnapshot.forEach((doc) => {
  //     setPosts((prev) => [...prev, { ...doc.data(), id: doc.id }]);
  //     // console.log((doc.id, "=>", doc.data()));
  //   });
  // };

  // useEffect(() => {
  //   getAllPost();
  // }, []);
  //   setPosts(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  const [posts, setPosts] = useState([]);
  console.log("posts --->", posts);

  // const getAllPost = async () => {
  //   const arrayOfPosts = [];
  //   onSnapshot(collection(db, "posts"), (docsSnap) => {
  //     // console.log("docsSnap.docs ->", docsSnap.docs);
  //     // setPosts[docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))];
  //     docsSnap.forEach((doc) => {
  //       arrayOfPosts.push({ ...doc.data(), id: doc.id });
  //       // setPosts((prev) => [...prev, { ...doc.data(), id: doc.id }]);
  //       // console.log("Current data: ", doc.data());
  //       setPosts[arrayOfPosts];
  //       console.log("arrayOfPosts =>>", arrayOfPosts);
  //       console.log("Posts =>>", posts);
  //     });
  //   });
  // };

  // useEffect(() => {
  //  getAllPost();
  // }, []);

  useEffect(() => {
    const dataOfPosts = onSnapshot(collection(db, "posts"), (docsSnap) => {
      setPosts(docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => {
      dataOfPosts();
    };
  }, []);

  const toMap = ({ coords }) => {
    navigation.navigate("Map", { coords: coords });
  };

  const toCom = () => {
    navigation.navigate("Comments", {});
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        title={item.namePlace}
        photo={item.photo}
        loc={item.location}
        locPlace={item.locationPlace}
        toMap={toMap}
        toCom={toCom}
      />
    );
  };

  // console.log("posts", posts);
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
  // containerP: {
  //   flex: 1, //all space of screen
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  // },
  containerP: {
    flex: 1, //all space of screen
    justifyContent: "center",
    // marginHorizontal: 16,
    paddingHorizontal: 16,
    // width: 300,
    // alignItems: "center",
    // backgroundColor: "#fdf",
    backgroundColor: "#fff",
    paddingBottom: 80,
  },
  item: {
    // marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 5,
    backgroundColor: "white",
    // backgroundColor: "#f9c2ff",
    // padding: 20,
    marginVertical: 32,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginVertical: 8,
    marginRight: "auto",
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Bold",

    fontWeight: "500",
  },
  countCommets: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
  },
  locPlace: {
    color: "#212121",
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
  },
  bottomImgLinks: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

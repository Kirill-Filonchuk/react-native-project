import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { Feather, AntDesign } from "@expo/vector-icons";

import { View, StyleSheet, TouchableOpacity } from "react-native";

// import { useNavigation } from "@react-navigation/native";
import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { PostsScreen } from "./screens/mainScreens/PostsScreen";
import { ProfileScreen } from "./screens/mainScreens/ProfileScreen";
import { CreatePostsScreen } from "./screens/mainScreens/CreatePostsScreen";

const screenOptions = {
  tabBarShowLabel: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 83,
    backgroundColor: "#fff",
  },
  headerTitleAlign: "center",
};

const postScreenOptions = {
  tabBarIcon: ({ focused }) => {
    return (
      <View
        style={{
          ...styles.profile,
          backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
        }}
      >
        <AntDesign
          name="appstore-o"
          size={24}
          color={focused ? "#FFFFFF" : "#212121"}
        />
      </View>
    );
  },

  // box-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.3);
  headerStyle: {
    height: 88,
    // backgroundColor: "#f4511e",
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    // shadowRadius: 2,
  },
  headerTitleStyle: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
    fontWeight: "500",
    fontSize: 17,
    color: "#212121",
    lineHeight: 22,
  },
  headerRight: () => (
    // onPress={() => navigation.navigate({routeName: "Login"})}
    <TouchableOpacity
      onPress={() => alert("This is a LogOut!")}
      style={{
        marginRight: 16,
      }}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  ),
};

const createPostsOptions = ({ navigation }) => ({
  tabBarIcon: ({ focused }) => {
    return (
      <View
        style={{
          ...styles.profile,
          backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
        }}
      >
        <AntDesign
          name="plus"
          size={24}
          color={focused ? "#FFFFFF" : "#212121"}
        />
      </View>
    );
  },
  headerStyle: {
    height: 88,
    // backgroundColor: "#f4511e",
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    // shadowRadius: 2,
  },
  headerTitleStyle: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
    fontWeight: "500",
    fontSize: 17,
    color: "#212121",
    lineHeight: 22,
  },
  tabBarStyle: { display: "none" },

  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostsScreen")}
      // onPress={() => alert("navigate to PostScreen!")}
      style={{
        marginLeft: 16,
      }}
    >
      <Feather name="arrow-left" size={24} color="#212121CC" />
    </TouchableOpacity>
  ),
});

const profileScreenOptions = {
  tabBarIcon: ({ focused }) => {
    return (
      <View
        style={{
          ...styles.profile,
          backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
        }}
      >
        <AntDesign
          name="user"
          size={24}
          color={focused ? "#FFFFFF" : "#212121"}
        />
      </View>
    );
  },
  headerStyle: {
    height: 88,
    // backgroundColor: "#f4511e",
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    // shadowRadius: 2,
  },
  headerTitleStyle: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
    fontWeight: "500",
    fontSize: 17,
    color: "#212121",
    lineHeight: 22,
  },
};

export const useRoute = (isAuth, navigation) => {
  // const navigation = useNavigation();

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Registration">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: true,
            title: "Registration screen",
          }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: true, title: "Login screen" }}
        />
        {/* <MainStack.Screen name="Home" component={Home} /> */}
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={screenOptions}
      initialRouteName="CreatePosts"
    >
      <MainTab.Screen
        name="PostsScreen"
        // PostsScreen
        // В хедере на экране PostsScreen добавить иконку для logout
        // component={Home}
        component={PostsScreen}
        options={postScreenOptions}
      />

      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={createPostsOptions}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: 70,
    height: 40,
    borderRadius: 20,
    padding: 0,

    justifyContent: "center",
    alignItems: "center",
  },
  // button: {
  //   width: 70,
  //   height: 40,
  //   borderRadius: 35,
  //   backgroundColor: "blue",
  // },
});

// options={{
//           tabBarButton: (props) => <CustomButton {...props} />,
//         }}

// const screenOptions = ({ route }) => ({
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName;

//     if (route.name === "CreatePosts") {
//       iconName = focused ? "user" : "user";
//       size = 24;
//     } else if (route.name === "Posts") {
//       iconName = focused ? "appstore-o" : "appstore1";
//       size = 24;
//     } else if (route.name === "Profile") {
//       iconName = focused ? "pluscircleo" : "pluscircle";
//       size = 28;
//       color = "black";
//     }

//     // You can return any component that you like here!
//     return <AntDesign name={iconName} size={size} color={color} />;
//   },
//   tabBarShowLabel: false,
//   tabBarStyle: {
//     backgroundColor: "#fdf",
//   },
//   tabBarActiveTintColor: "tomato",
//   tabBarInactiveTintColor: "gray",
// });

import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nestedScreens/DefaultScreenPosts";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
const NestedScreen = createStackNavigator();

export const PostsScreen = ({ navigation, route }) => {
  // console.log("route.state ->PostsScreen", route.state);
  // if (route.state && route.state.index > 0) {
  //   navigation.setOptions({ tabBarStyle: { display: "none" } });
  // } else {
  //   navigation.setOptions({ tabBarStyle: true });
  // }
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        initialParams={{
          photo: null,
          namePlace: "",
          location: "",
          locationPlace: "",
        }}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nestedScreens/DefaultScreenPosts";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

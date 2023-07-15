// import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { authStateChangeUser } from "../redux/auth/authOperation";
import { useRoute } from "../router";

function Main({ onLayoutRootView }) {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  const routing = useRoute(stateChange);

  //   return <>{routing}</>;
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
}

export { Main };

// import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { Main } from "./components/Main";

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  console.log("fontsLoaded", fontsLoaded);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/* <NavigationContainer onReady={onLayoutRootView}>
        <Main />
      </NavigationContainer> */}
        <Main onLayoutRootView={onLayoutRootView} />
      </Provider>
    </SafeAreaProvider>
  );
}

// Use useSafeAreaInsets hook from react-native-safe-area-context instead of SafeAreaView component
// Don't wrap your whole app in SafeAreaView, instead apply the styles to content inside your screens
// Apply only specific insets using the useSafeAreaInsets hook for more control

// If you don't want to use the useFonts hook (for example, maybe you prefer class components), you can use Font.loadAsync directly. Under the hood, the hook uses Font.loadAsync from the expo-font library. You can use it directly if you prefer, or if you want to have more fine-grained control over when your fonts are loaded before rendering.

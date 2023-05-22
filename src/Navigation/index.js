import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import TabNavigation from "./TabNavigation";
import ViewCourseScreen from "../Screens/ViewCourseScreen";
import MainSplashScreen from "../Screens/SplashScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={MainSplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="View Course" component={ViewCourseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;

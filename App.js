import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/Screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/Screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

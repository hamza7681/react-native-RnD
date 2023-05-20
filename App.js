import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/Redux/Store/Store";
import Navigation from "./src/Navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
        <Navigation />
      </Provider>
    </>
  );
}

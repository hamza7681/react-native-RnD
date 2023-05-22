import React, { useEffect } from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import logo from "../../../assets/shopping.png";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainSplash = () => {
  const navigation = useNavigation();
  const getToken = async () => {
    const res = await AsyncStorage.getItem("token");
    if (res) {
      navigation.navigate("Tabs");
    } else {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.text}>Welcome to SmartShop</Text>
        </View>
      </View>
    </>
  );
};

export default MainSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a2f5b",
  },
  logoContainer: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});

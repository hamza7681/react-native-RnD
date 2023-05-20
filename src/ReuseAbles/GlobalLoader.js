import React from "react";
import { Dimensions, View } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";

const GlobalLoader = () => {
  return (
    <>
      <View style={styles.container}>
        <ActivityIndicator color="#ffffff" size={34} />
      </View>
    </>
  );
};

export default GlobalLoader;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    opacity: 0.7,
    position: "absolute",
    top: 0,
    width: width,
    height: height,
    zIndex: 2,
  },
});

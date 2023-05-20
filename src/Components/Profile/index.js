import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import { baseUrl } from "../../axios/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(baseUrl + "/auth/get-profile", {
          method: "GET",
          headers: { Authorization: token },
        });
        const data = await res.json();
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "cartItem"]);
    navigation.navigate("Login");
  };

  return (
    <>
      {loading ? (
        <>
          <View style={styles.loading}>
            <ActivityIndicator color="#2a2f5b" size={32} />
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <View>
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={{ uri: user?.dp }}
            />
          </View>
          <View
            style={{
              paddingVertical: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", letterSpacing: 3 }}
            >
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={{ color: "gray" }}>{user?.email}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#2a2f5b",
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginVertical: 10,
                borderRadius: 3,
              }}
              onPress={logout}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import logo from "../../../assets/shopping.png";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Register = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.titleContainer}>
            <Image source={logo} style={styles.image} />
            <Text style={styles.screenHeading}>Register</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={firstName}
              onChangeText={(e) => setFirstName(e)}
              style={styles.input}
              placeholder="Enter your first name"
            />
            <TextInput
              value={lastName}
              onChangeText={(e) => setLastName(e)}
              style={styles.input}
              placeholder="Enter your last name"
            />
            <TextInput
              value={email}
              onChangeText={(e) => setEmail(e)}
              style={styles.input}
              placeholder="Enter your email"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              placeholder="Enter your password"
              onChangeText={(e) => setPassword(e)}
              style={styles.input}
            />
            <View style={styles.showPassword}>
              <BouncyCheckbox onPress={(isChecked) => {}} fillColor="#2a2f5b" />
              <Text>Show Password</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.bottomLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Register;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    width: width - 70,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 100,
    height: 100,
  },
  screenHeading: {
    fontSize: 22,
    fontWeight: "bold",
  },
  inputContainer: {
    gap: 12,
    width: width - 70,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
  },
  button: {
    backgroundColor: "#2a2f5b",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    marginVertical: 10,
    borderRadius: 3,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  bottomTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  bottomText: {
    fontSize: 16,
    color: "gray",
  },
  bottomLink: {
    fontSize: 16,
    color: "#2a2f5b",
    fontWeight: "bold",
  },
  showPassword: {
    flexDirection: "row",
    alignItems: "center",
  },
});

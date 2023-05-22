import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { baseUrl } from "../../axios/config";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import FormatPrice from "../../ReuseAbles/FormatPrice";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewCourse = () => {
  const { params } = useRoute();
  const id = params.id;
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCourse = async () => {
      try {
        const res = await fetch(baseUrl + "/course/course-by-id/" + id);
        const data = await res.json();
        setCourse(data);
        const cart = await AsyncStorage.getItem("cartItem");
        const parseCart = JSON.parse(cart);
        const findItem = parseCart.find((item) => {
          return item._id === data._id;
        });
        if (findItem) {
          setToggle(false);
        }
        setLoading(false);
        setFetchAgain(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCourse();
  }, [fetchAgain]);

  const UpdateDate = ({ newDate }) => {
    const date = new Date(newDate);
    const options = {
      year: "numeric",
      month: "2-digit",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };
  const addToCart = async (item) => {
    const findCart = await AsyncStorage.getItem("cartItem");
    const parseCart = JSON.parse(findCart);
    if (parseCart) {
      await AsyncStorage.setItem(
        "cartItem",
        JSON.stringify([...parseCart, item])
      );
      setFetchAgain(true);
    } else {
      await AsyncStorage.setItem("cartItem", JSON.stringify([item]));
      setFetchAgain(true);
    }
  };

  const deleteProduct = async (newItem) => {
    const cartItem = await AsyncStorage.getItem("cartItem");
    const parseCart = JSON.parse(cartItem);
    const filterProducts = parseCart.filter((item) => item._id !== newItem._id);
    await AsyncStorage.setItem("cartItem", JSON.stringify(filterProducts));
    setFetchAgain(true);
  };

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#2a2f5b" size={32} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: course.image,
              }}
            />
          </View>
          <ScrollView style={{ flexGrow: 1 }}>
            <View style={styles.detailContainer}>
              <View>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.title_desc}>{course.title_desc}</Text>
                <Text style={styles.price}>
                  <FormatPrice price={course.price} />
                </Text>
                <Text style={{ fontSize: 22, color: "gray" }}>
                  Created by{" "}
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: "#8803fc",
                    }}
                  >
                    {course.created_by?.firstName} {course.created_by?.lastName}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <AntDesign name="exclamationcircle" size={20} color="black" />
                  <Text>
                    Last Updated <UpdateDate newDate={course.updatedAt} />
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Ionicons name="ios-globe-outline" size={24} color="black" />
                  <Text>{course.language}</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Description
                </Text>
                <Text style={{ textAlign: "justify" }}>
                  {course.description}
                </Text>
              </View>
              {toggle ? (
                <TouchableOpacity
                  style={styles.cartBtn}
                  onPress={() => addToCart(course)}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.cartBtn1}
                  onPress={() => deleteProduct(course)}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Remove From Cart
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ViewCourse;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: 200,
  },
  detailContainer: {
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingVertical: 5,
    letterSpacing: 2,
  },
  title_desc: {
    fontSize: 16,
    color: "gray",
  },
  price: {
    color: "#CD2047",
    fontSize: 24,
    paddingVertical: 10,
    fontWeight: "700",
  },
  cartBtn: {
    backgroundColor: "#2a2f5b",
    height: 60,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  cartBtn1: {
    backgroundColor: "#f52525",
    height: 60,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

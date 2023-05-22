import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import FormatPrice from "../../ReuseAbles/FormatPrice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const Cart = () => {
  const insets = useSafeAreaInsets();
  const [cartItems, setCartItems] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const getCartItems = async () => {
      const cartItem = await AsyncStorage.getItem("cartItem");
      const parseCart = JSON.parse(cartItem);
      setCartItems(parseCart);
      setFetchAgain(false);
    };
    getCartItems();
  }, [fetchAgain]);

  const TotalPrice = () => {
    if (cartItems) {
      const totalPrice = cartItems.reduce((acc, course) => {
        return acc + course.price;
      }, 0);
      return <FormatPrice price={totalPrice} />;
    } else {
      return <Text>0</Text>;
    }
  };

  const deleteProduct = async (newItem) => {
    const cartItem = await AsyncStorage.getItem("cartItem");
    const parseCart = JSON.parse(cartItem);
    const filterProducts = parseCart.filter((item) => item._id !== newItem._id);
    await AsyncStorage.setItem("cartItem", JSON.stringify(filterProducts));
    setFetchAgain(true);
  };

  const refresh = () => {
    setFetchAgain(true);
  };

  const CartItem = ({ item }) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            width: "100%",
          }}
        >
          <View style={{ width: "30%" }}>
            <Image
              source={{ uri: item?.image }}
              style={{ width: 100, height: 100, borderRadius: 5 }}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text style={{ color: "gray" }}>{item?.title_desc}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={() => deleteProduct(item)}>
            <FontAwesome name="trash" size={24} color="#f52525" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: "green",
            }}
          >
            <FormatPrice price={item?.price} />
          </Text>
        </View>
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#f2f2f2",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
          backgroundColor: "#2a2f5b",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
          Cart
        </Text>
      </View>
      {cartItems?.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 22 }}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.courseList}
              renderItem={({ item }) => <CartItem item={item} />}
            />

            {cartItems && (
              <>
                <View
                  style={{
                    borderWidth: 1,
                    marginVertical: 20,
                  }}
                ></View>
                <View style={{ paddingHorizontal: 25, gap: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      Total Items
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      {cartItems ? cartItems.length : 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      Total Price
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      <TotalPrice />
                    </Text>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </>
      )}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.btnRefresh} onPress={refresh}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Refresh Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  courseList: {
    paddingHorizontal: 10,
    gap: 5,
    paddingVertical: 10,
  },
  btnRefresh: {
    backgroundColor: "#2a2f5b",
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    width: width - 50,
  },
});

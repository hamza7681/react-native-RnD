import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import FormatPrice from "../../ReuseAbles/FormatPrice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = () => {
  const insets = useSafeAreaInsets();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      const cartItem = await AsyncStorage.getItem("cartItem");
      const parseCart = JSON.parse(cartItem);
      console.log(parseCart);
      setCartItems(parseCart);
    };
    getCartItems();
  }, []);

  const TotalPrice = () => {
    const totalPrice = cartItems.reduce((acc, course) => {
      return acc + course.price;
    }, 0);
    return <FormatPrice price={totalPrice} />;
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
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              textAlign: "right",
              color: "#f52525",
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
      <ScrollView>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.courseList}
          renderItem={({ item }) => <CartItem item={item} />}
        />
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
              {cartItems?.length}
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
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  courseList: {
    paddingHorizontal: 10,
    gap: 5,
    paddingVertical: 10,
  },
});

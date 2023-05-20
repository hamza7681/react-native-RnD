import React from "react";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import FormatPrice from "../../ReuseAbles/FormatPrice";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const CourseItem = ({ item }) => {
  const navigation = useNavigation();

  const FormatTitle = ({ title }) => {
    if (title.length > 20) {
      let newTitle = title.substring(0, 19);
      return <Text style={styles.title}>{newTitle}...</Text>;
    } else {
      return <Text style={styles.title}>{title}</Text>;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("View Course", { id: item._id })}
      style={styles.cardContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.cardImage}
          resizeMode="cover"
          source={{
            uri: item.image,
          }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <FormatTitle title={item.title} />
        <Text style={styles.price}>
          <FormatPrice price={item.price} />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    width: "50%",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    gap: 7,
    height: 50,
  },
  title: {
    fontWeight: "bold",
  },
  price: {
    color: "gray",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    alignItems: "center",
    gap: 15,
    paddingBottom: 10,
  },
  icon: {
    borderWidth: 1,
    padding: 9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderColor: "#2a2f5b",
  },
});

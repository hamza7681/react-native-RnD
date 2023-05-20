import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { baseUrl } from "../../axios/config";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { FlatList } from "react-native";
import CourseItem from "./CourseItem";
import { ScrollView } from "react-native";

const Home = () => {
  const insets = useSafeAreaInsets();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(baseUrl + "/course/get-course");
        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  return (
    <>
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
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color="#2a2f5b" size={32} />
          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={courses && courses}
              renderItem={({ item }) => <CourseItem item={item} />}
              keyExtractor={(item) => item._id}
              numColumns={2}
              contentContainerStyle={styles.courseList}
            />
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  courseList: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 5,
    paddingVertical: 10,
  },
});

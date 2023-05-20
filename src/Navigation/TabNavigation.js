import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#2a2f5b",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => {
              return <FontAwesome5 name="home" size={16} color="white" />;
            },
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "orange",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: () => {
              return (
                <FontAwesome name="shopping-bag" size={16} color="white" />
              );
            },
            tabBarActiveBackgroundColor: "orange",
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => {
              return <FontAwesome name="user-circle" size={16} color="white" />;
            },
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "orange",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;

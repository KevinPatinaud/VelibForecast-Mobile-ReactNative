import React, { FC, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "./screens/Menu/MenuScreen";
import LogInScreen from "./screens/Login/LoginScreen";
import SignUpScreen from "./screens/SignUp/SignUpScreen";
import { getValueFromSecureStore } from "./helper/Utils";
import { useDispatch } from "react-redux";
import { connection, refreshUserInfo } from "./helper/Connection";

const Stack = createStackNavigator();

const Main: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    refreshUserInfo(dispatch);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

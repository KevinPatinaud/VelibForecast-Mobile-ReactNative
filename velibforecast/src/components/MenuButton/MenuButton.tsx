import React from "react";
import { TouchableHighlight, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface MenuButtonProps {
  left: number;
  top: number;
  size?: number | undefined;
  navigation: any;
}

const MenuButton = (props: MenuButtonProps) => {
  return (
    <View style={{ ...styles.container, left: props.left, top: props.top }}>
      <TouchableHighlight
        style={styles.container}
        onPress={() => {
          props.navigation.navigate("Menu");
        }}
      >
        <Ionicons
          name="home"
          size={props.size ? props.size : 24}
          color="#1574AD"
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});

export default MenuButton;

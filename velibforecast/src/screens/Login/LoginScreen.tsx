import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

const LogInScreen = ({ navigation }: any) => {
  return (
    <View style={styles.mainView}>
      <Text>Log-in Screen</Text>
      <Button
        title="Go to menu"
        onPress={() => {
          navigation.navigate("Menu");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogInScreen;

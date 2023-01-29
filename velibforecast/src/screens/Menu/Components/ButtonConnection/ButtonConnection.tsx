import React, { useState } from "react";
import { View, Button, TouchableHighlight, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  disconnectAccount,
  selectAccount,
} from "../../../../store/AccountSlice";

export interface ButtonConnectionProps {
  navigation: any;
}

const ButtonConnection = (props: ButtonConnectionProps) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const account = useSelector(selectAccount);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => {
          setDisplayMenu(!displayMenu);
        }}
      >
        <View>
          <Ionicons
            name={
              account.isConnected
                ? "md-person-circle"
                : "md-person-circle-outline"
            }
            size={40}
            color="#1574AD"
          />
        </View>
      </TouchableHighlight>
      {displayMenu && !account.isConnected && (
        <View style={styles.menu}>
          <Button
            color="#1574AD"
            title="Créer un compte"
            onPress={() => {
              setDisplayMenu(false);
              props.navigation.navigate("LogIn");
            }}
          />
          <Button
            color="#1574AD"
            title="Me connecter"
            onPress={() => {
              setDisplayMenu(false);
              props.navigation.navigate("LogIn");
            }}
          />
        </View>
      )}
      {displayMenu && account.isConnected && (
        <View style={styles.menu}>
          <Button
            color="#1574AD"
            title="Me déconnecter"
            onPress={() => {
              setDisplayMenu(false);
              dispatch(disconnectAccount());
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 10,
    right: 50,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  touchable: {
    height: 40,
  },
  menu: {
    marginTop: 5,
  },
});

export default ButtonConnection;

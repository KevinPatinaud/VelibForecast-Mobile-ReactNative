import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { Account } from "../../model/Account";
import AccountService from "../../services/Account/Account.service";
import MenuButton from "../../components/MenuButton/MenuButton";
import { useDispatch } from "react-redux";
import { recordAccount } from "../../store/AccountSlice";
import { getValueFromSecureStore, saveInSecureStore } from "../../helper/Utils";
import { connection } from "../../helper/Connection";

const LogInScreen = ({ navigation }: any) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setMail(await getValueFromSecureStore("MAIL"));
      setPassword(await getValueFromSecureStore("PASSWORD"));
    })();
  }, []);

  const connect = async () => {
    try {
      connection(mail, password, dispatch);
      saveInSecureStore("MAIL", mail);
      saveInSecureStore("PASSWORD", password);
      navigation.navigate("Menu");
    } catch ({ message }) {
      alert("Error : " + message);
    }
  };

  return (
    <View style={styles.mainView}>
      <MenuButton
        left={Dimensions.get("window").width - 90}
        top={-40}
        size={32}
        navigation={navigation}
      />
      <Text style={styles.text}>Adresse mail :</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text: string) => {
          setMail(text);
        }}
        value={mail}
      />
      <Text style={styles.text}>Mot de passe :</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text: string) => {
          setPassword(text);
        }}
        value={password}
      />

      <View style={styles.button}>
        <Button color="#1574AD" title="Se connecter" onPress={connect} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    left: 30,
    width: Dimensions.get("window").width - 60,
    alignItems: "center",
    marginTop: 100,
  },
  input: {
    backgroundColor: "white",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#1574AD",
    paddingLeft: 10,
    height: 30,
    marginHorizontal: 0,
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default LogInScreen;

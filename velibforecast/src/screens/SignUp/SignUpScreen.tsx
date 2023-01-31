import React, { useRef, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import Recaptcha from "react-native-recaptcha-that-works";
import { useDispatch } from "react-redux";
import MenuButton from "../../components/MenuButton/MenuButton";
import { refreshUserInfo } from "../../helper/Connection";
import { saveInSecureStore } from "../../helper/Utils";
import { Account } from "../../model/Account";
import AccountService from "../../services/Account/Account.service";

const SignUpScreen = ({ navigation }: any) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const recaptcha = useRef({} as any);
  const dispatch = useDispatch();

  const send = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      alert("Merci de vérifier votre adresse mail !");
      return false;
    }
    if (password === "") {
      alert("Merci de saisir un mot de passe !");
      return false;
    }
    if (password !== passwordConfirm) {
      alert("Les deux mots de passe ne sont pas identiques !");
      return false;
    }

    if (recaptcha.current) recaptcha.current.open();
  };

  const onVerify = async (token: string) => {
    await AccountService.createMailAccount(
      { email: mail, password: password } as Account,
      token
    );
    saveInSecureStore("MAIL", mail);
    saveInSecureStore("PASSWORD", password);
    refreshUserInfo(dispatch);
    navigation.navigate("Menu");
  };

  const onExpire = () => {
    console.warn("expired!");
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
      <Text style={styles.text}>Confirmez le mot de passe :</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text: string) => {
          setPasswordConfirm(text);
        }}
        value={passwordConfirm}
      />

      <View style={styles.button}>
        <Recaptcha
          ref={recaptcha}
          siteKey="6LewM1UjAAAAAOzLGTAHjdNyf9XNlZ5bgcSUVetq"
          baseUrl="https://velib-forecast.com"
          onVerify={onVerify}
          onExpire={onExpire}
          size="normal"
        />
        <Button title="Créer mon compte" onPress={send} />
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

export default SignUpScreen;

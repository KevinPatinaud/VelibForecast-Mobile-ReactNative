import React, { useRef } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Recaptcha from "react-native-recaptcha-that-works";

const SignUpScreen = ({ navigation }: any) => {
  const recaptcha = useRef({} as any);

  const send = () => {
    console.log("send!");
    if (recaptcha.current) recaptcha.current.open();
  };

  const onVerify = (token: string) => {};

  const onExpire = () => {
    console.warn("expired!");
  };

  return (
    <View style={styles.mainView}>
      <Text>Sign-Up Screen</Text>
      <Recaptcha
        ref={recaptcha}
        siteKey="6LewM1UjAAAAAOzLGTAHjdNyf9XNlZ5bgcSUVetq"
        baseUrl="https://velib-forecast.com"
        onVerify={onVerify}
        onExpire={onExpire}
        size="normal"
      />
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

export default SignUpScreen;

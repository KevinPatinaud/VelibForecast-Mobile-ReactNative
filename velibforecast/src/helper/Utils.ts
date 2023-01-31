import * as SecureStore from "expo-secure-store";

export const getServerURL = () => {
  return "https://velib-forecast.com";
};

export const saveInSecureStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getValueFromSecureStore = async (key: string) => {
  let result = await SecureStore.getItemAsync(key);
  return result ? result : "";
};

export const deleteValueFromSecureStore = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

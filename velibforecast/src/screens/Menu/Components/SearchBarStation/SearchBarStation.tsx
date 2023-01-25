import { Dispatch, SetStateAction, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Station } from "../../../../model/Station";

export interface SearchBarStationProps {
  style: StyleProp<ViewStyle>;
  onStationSelected?: Dispatch<SetStateAction<Station>>;
}

const SearchBarStation = (props: SearchBarStationProps) => {
  const [text, setText] = useState("");

  return (
    <View style={props.style}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Entrez le nom d'une station"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: "white",
    alignSelf: "stretch",
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchBarStation;

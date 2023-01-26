import { Dispatch, SetStateAction, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import { Station } from "../../../../model/Station";

export interface SearchBarStationProps {
  stations: Station[];
  onStationSelected?: Dispatch<SetStateAction<Station>>;
}

const SearchBarStation = (props: SearchBarStationProps) => {
  const [text, setText] = useState("");
  const [correspondingStations, setCorrespondingStations] = useState(
    props.stations
  );
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onBlur={() => setDisplaySuggestions(false)}
        onFocus={() => setDisplaySuggestions(true)}
        onChangeText={(text: string) => {
          setText(text);
          setCorrespondingStations(
            props.stations
              .filter((station) =>
                station.name.toUpperCase().includes(text.toUpperCase())
              )
              .sort((a, b) => a.name.localeCompare(b.name))
          );
        }}
        value={text}
        placeholder="Entrez le nom d'une station"
      />
      <ScrollView
        style={{
          ...styles.scrollView,
          height: displaySuggestions
            ? Math.min(
                correspondingStations.length * 30,
                Dimensions.get("window").height * 0.33
              )
            : 0,
        }}
      >
        {correspondingStations.map((station, index) => (
          <Button
            key={index}
            onPress={() => {
              if (props.onStationSelected) props.onStationSelected(station);
            }}
            title={station.name}
            color="#1574AD"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 60,
  },
  input: {
    height: 40,
    backgroundColor: "white",
    alignSelf: "stretch",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 0,
  },
  scrollView: {
    backgroundColor: "#eeeeee",
    marginTop: 0,
    marginHorizontal: 0,
  },
  text: {
    fontSize: 42,
  },
});

export default SearchBarStation;

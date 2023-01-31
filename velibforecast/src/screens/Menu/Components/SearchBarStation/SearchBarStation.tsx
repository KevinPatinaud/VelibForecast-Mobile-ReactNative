import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
  Text,
  ColorValue,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Station } from "../../../../model/Station";
import { selectAccount } from "../../../../store/AccountSlice";

export interface SearchBarStationProps {
  stations: Station[];
  onStationSelected?: Dispatch<SetStateAction<Station | undefined>>;
}

const SearchBarStation = (props: SearchBarStationProps) => {
  const [text, setText] = useState("");
  const [correspondingStations, setCorrespondingStations] = useState(
    [] as Station[]
  );
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const account = useSelector(selectAccount);
  const OptionList = (props: {
    station: Station;
    index: number;
    onStationSelected?: Dispatch<SetStateAction<Station | undefined>>;
    backgroundColor?: ColorValue;
  }) => {
    return (
      <TouchableHighlight
        key={props.index}
        style={
          props.backgroundColor
            ? { ...styles.touchable, backgroundColor: props.backgroundColor }
            : styles.touchable
        }
        onPress={() => {
          if (props.onStationSelected) {
            props.onStationSelected(props.station);
          }
        }}
      >
        <View>
          <Text style={styles.touchableText}>
            <Text>{props.station.name}</Text>
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onBlur={() => setDisplaySuggestions(false)}
        onFocus={() => setDisplaySuggestions(true)}
        onChangeText={(text: string) => {
          setText(text);
          if (text.length > 3) {
            setCorrespondingStations(
              props.stations
                .filter((station) =>
                  station.name.toUpperCase().includes(text.toUpperCase())
                )
                .filter((station) => {
                  if (account.favoriteStations === undefined) return true;

                  let result = true;
                  account.favoriteStations.forEach((favStation) => {
                    if (favStation.id === station.id) result = false;
                  });
                  return result;
                })
                .sort((a, b) => a.name.localeCompare(b.name))
            );
          } else {
            setCorrespondingStations([]);
          }
        }}
        value={text}
        placeholder="Entrez le nom d'une station"
      />
      {displaySuggestions && (
        <ScrollView style={styles.scrollView}>
          {account.favoriteStations &&
            account.favoriteStations.map((station, index) => (
              <OptionList
                station={station}
                index={index}
                onStationSelected={props.onStationSelected}
                backgroundColor={"#aaaaaa"}
              />
            ))}
          {correspondingStations.map((station, index) => (
            <OptionList
              station={station}
              index={index}
              onStationSelected={props.onStationSelected}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 90,
  },
  input: {
    height: 40,
    backgroundColor: "white",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#1574AD",
    padding: 10,
    marginHorizontal: 0,
  },
  scrollView: {
    marginTop: 0,
    marginHorizontal: 0,
    height: Dimensions.get("window").height * 0.33,
  },
  touchable: {
    backgroundColor: "#1574AD",
    border: 1,
    borderColor: "black",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableText: {
    color: "white",
    size: 18,
  },
  text: {
    fontSize: 42,
  },
});

export default SearchBarStation;

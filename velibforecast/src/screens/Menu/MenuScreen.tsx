import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Station } from "../../model/Station";
import DetailsStation from "./Components/DetailsStation/DetailsStation";
import MapStation from "./Components/MapStation/MapStation";
import SearchBar from "./Components/SearchBarStation/SearchBarStation";

const MenuScreen = () => {
  const [stationSelected, setStationSelected] = useState({} as Station);

  return (
    <View style={styles.mainView}>
      <MapStation />
      <SearchBar
        style={styles.searchBar}
        onStationSelected={setStationSelected}
      />
      <DetailsStation stationSelected={stationSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBar: {
    marginTop: 50,
    height: 40,
    alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default MenuScreen;

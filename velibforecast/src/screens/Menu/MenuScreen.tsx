import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Station } from "../../model/Station";
import DetailsStation from "./Components/DetailsStation/DetailsStation";
import MapStation from "./Components/MapStation/MapStation";
import SearchBar from "./Components/SearchBarStation/SearchBarStation";
import Constants from "expo-constants";
import StationService from "../../services/Station/Station.service";

const MenuScreen = () => {
  const [stations, setStations] = useState([] as Station[]);

  const [stationSelected, setStationSelected] = useState(
    undefined as unknown as Station
  );

  useEffect(() => {
    (async () => {
      setStations(await StationService.getStations());
    })();
  }, []);

  return (
    <View style={styles.mainView}>
      <MapStation
        stations={stations}
        onStationSelected={setStationSelected}
        stationSelected={stationSelected}
      />
      <SearchBar stations={stations} onStationSelected={setStationSelected} />
      <DetailsStation stationSelected={stationSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default MenuScreen;

import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Station } from "../../model/Station";
import DetailsStation from "./Components/DetailsStation/DetailsStation";
import MapStation from "./Components/MapStation/MapStation";
import SearchBar from "./Components/SearchBarStation/SearchBarStation";
import Constants from "expo-constants";
import StationService from "../../services/Station/Station.service";
import { StationState } from "../../model/StationState";
import ButtonConnection from "./Components/ButtonConnection/ButtonConnection";

const MenuScreen = ({ navigation }: any) => {
  const [stations, setStations] = useState([] as Station[]);
  const [stationsStatus, setStationsStatus] = useState([] as StationState[]);
  const needUpdate = useRef(false);
  const [stationSelected, setStationSelected] = useState(
    undefined as unknown as Station | undefined
  );

  useEffect(() => {
    (async () => {
      setStations(await StationService.getStations());
    })();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      setStationsStatus(await StationService.getStatus());
      needUpdate.current = true;
    };
    loadStates();
    const interval = setInterval(loadStates, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (needUpdate.current) {
      const stationsWithStates = [] as Station[];

      stations.forEach((station) => {
        stationsStatus.forEach((state: StationState) => {
          if (state.idStation === station.id) {
            station.state = {} as StationState;
            station.state.nmbBikeAvailable = state.nmbBikeAvailable;
            station.state.nmbPlaceAvailable = state.nmbPlaceAvailable;
          }
        });
        stationsWithStates.push(station);
      });
      setStations(stationsWithStates);
    }
    needUpdate.current = false;
  }, [stationsStatus, stations]);

  return (
    <View style={styles.mainView}>
      <MapStation
        stations={stations}
        onStationSelected={setStationSelected}
        stationSelected={stationSelected}
      />
      <SearchBar stations={stations} onStationSelected={setStationSelected} />
      <ButtonConnection navigation={navigation} />
      {stationSelected && <DetailsStation stationSelected={stationSelected} />}
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

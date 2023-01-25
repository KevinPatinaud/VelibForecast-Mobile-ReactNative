import { LocationObject } from "expo-location";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Station } from "../../../../model/Station";
import StationService from "../../../../services/Station/Station.service";

export interface MapStationProps {
  onStationSelected?: Dispatch<SetStateAction<Station>>;
}

const MapStation = (props: MapStationProps) => {
  const [location, setLocation] = useState(
    undefined as unknown as LocationObject
  );
  const [stations, setStations] = useState([] as Station[]);

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setStations(await StationService.getStations());
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: location ? location.coords.latitude : 48.864716,
          longitude: location ? location.coords.longitude : 2.349014,
          latitudeDelta: location ? 0.015 : 0.15,
          longitudeDelta: location ? 0.0121 : 0.121,
        }}
      >
        {stations.map((station, index) => (
          <Marker
            key={index}
            coordinate={
              { latitude: station.lat, longitude: station.lng } as LatLng
            }
            title={station.name}
            description={
              station.state?.nmbBikeAvailable + " / " + station.capacity
            }
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  map: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
});

export default MapStation;
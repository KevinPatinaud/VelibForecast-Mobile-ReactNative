import { LocationObject } from "expo-location";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import { Station } from "../../../../model/Station";
const selectedMarker = require("../../../../../assets/selected_marker.png");

export interface MapStationProps {
  onStationSelected: Dispatch<SetStateAction<Station | undefined>>;
  stations: Station[];
  stationSelected: Station | undefined;
}

const MapStation = (props: MapStationProps) => {
  const [displayMarker, setDisplayMarker] = useState(true);
  const region = useRef({
    latitude: 48.864716,
    longitude: 2.349014,
    latitudeDelta: 0.15,
    longitudeDelta: 0.121,
  } as Region);
  const _mapView = useRef({} as MapView);

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({});
      region.current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
    })();
  }, []);

  useEffect(() => {
    _mapView.current.animateToRegion({
      latitude: props.stationSelected
        ? props.stationSelected.lat
        : region.current.latitude,
      longitude: props.stationSelected
        ? props.stationSelected.lng
        : region.current.longitude,
      latitudeDelta: region.current.latitudeDelta,
      longitudeDelta: region.current.longitudeDelta,
    });
  }, [props.stationSelected]);

  return (
    <View style={styles.container}>
      <MapView
        ref={(mapView) => {
          if (mapView !== null) _mapView.current = mapView;
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        region={region.current}
        onRegionChange={(region) => {
          if (displayMarker && region.latitudeDelta > 0.03) {
            props.onStationSelected(undefined);
            setDisplayMarker(false);
          }
          if (!displayMarker && region.latitudeDelta < 0.03)
            setDisplayMarker(true);
        }}
      >
        {displayMarker &&
          props.stations.map((station, index) => (
            <Marker
              key={index}
              onPress={() => props.onStationSelected(station)}
              coordinate={
                { latitude: station.lat, longitude: station.lng } as LatLng
              }
              icon={
                props.stationSelected && station.id === props.stationSelected.id
                  ? selectedMarker
                  : undefined
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

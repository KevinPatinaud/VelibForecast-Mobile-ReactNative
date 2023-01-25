import { View, StyleSheet } from "react-native";
import { Station } from "../../../../model/Station";

export interface DetailsStationProps {
  stationSelected?: Station;
}

const DetailsStation = (props: DetailsStationProps) => {
  return <View style={styles.container}></View>;
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
  table: {},
});

export default DetailsStation;

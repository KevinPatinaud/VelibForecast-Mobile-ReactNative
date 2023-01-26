import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { Station } from "../../../../model/Station";
import { Table, Row, Rows } from "react-native-table-component";
import RowTableDetails from "./RowTableDetails";

export interface DetailsStationProps {
  stationSelected?: Station;
}

const DetailsStation = (props: DetailsStationProps) => {
  if (props.stationSelected === undefined) return <></>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.stationSelected.name}</Text>
      </View>
      <Table style={styles.table} borderStyle={styles.tableBorder}>
        <Row
          style={styles.thead}
          textStyle={styles.theadText}
          data={["", "Vélo(s)", "Place(s)"]}
        />
        <RowTableDetails
          title={"Maintenant"}
          minutesInFutur={0}
          stationSelected={props.stationSelected}
        />
        <RowTableDetails
          title={"Dans 1 heure"}
          minutesInFutur={60}
          stationSelected={props.stationSelected}
          hightLight
        />
        <RowTableDetails
          title={"Dans 2 heures"}
          minutesInFutur={120}
          stationSelected={props.stationSelected}
        />
        <RowTableDetails
          title={"Dans 3 heures"}
          minutesInFutur={180}
          stationSelected={props.stationSelected}
          hightLight
        />
      </Table>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    Height: 180,
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1574AD",
  },
  table: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "black",
  },
  thead: {
    backgroundColor: "#1574AD",
    height: 30,
  },
  row: {
    backgroundColor: "white",
    height: 30,
  },
  theadText: {
    color: "white",
    textAlign: "center",
  },
});

export default DetailsStation;

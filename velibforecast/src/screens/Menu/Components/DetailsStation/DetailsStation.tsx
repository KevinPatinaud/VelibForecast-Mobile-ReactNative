import React from "react";
import { View, StyleSheet, Dimensions, SafeAreaView, Text } from "react-native";
import { Station } from "../../../../model/Station";
import { Table, Row, Rows } from "react-native-table-component";

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
          data={["", "Available", "Place"]}
        />
        <Row
          style={styles.row}
          data={[
            "Maintenant",
            props.stationSelected.state?.nmbBikeAvailable,
            props.stationSelected.state?.nmbPlaceAvailable,
          ]}
        />
        <Row
          style={styles.row}
          data={[
            "Dans 1 heure",
            props.stationSelected.state?.nmbBikeAvailable,
            props.stationSelected.state?.nmbPlaceAvailable,
          ]}
        />
        <Row
          style={styles.row}
          data={[
            "Dans 2 heures",
            props.stationSelected.state?.nmbBikeAvailable,
            props.stationSelected.state?.nmbPlaceAvailable,
          ]}
        />
        <Row
          style={styles.row}
          data={[
            "Dans 3 heures",
            props.stationSelected.state?.nmbBikeAvailable,
            props.stationSelected.state?.nmbPlaceAvailable,
          ]}
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

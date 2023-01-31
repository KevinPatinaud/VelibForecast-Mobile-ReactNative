import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableHighlight,
} from "react-native";
import { Station } from "../../../../model/Station";
import { Table, Row } from "react-native-table-component";
import RowTableDetails from "./RowTableDetails";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount } from "../../../../store/AccountSlice";
import AccountService from "../../../../services/Account/Account.service";
import { refreshUserInfo } from "../../../../helper/Connection";

export interface DetailsStationProps {
  stationSelected: Station;
}

const DetailsStation = (props: DetailsStationProps) => {
  const [display, setDisplay] = useState(true);

  useEffect(() => setDisplay(true), [props.stationSelected]);

  const account = useSelector(selectAccount);
  const isAFavoriteStation =
    account.favoriteStations?.filter(
      (station) => station.id === props.stationSelected?.id
    ).length === 1;
  const dispatch = useDispatch();

  if (!display) return <></>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.btnHidde}>
          <TouchableHighlight
            onPress={() => {
              setDisplay(false);
            }}
          >
            <Ionicons name={"close-circle"} size={30} color="#1574AD" />
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>{props.stationSelected.name}</Text>
        {account.isConnected && (
          <View style={styles.btnFavorite}>
            <TouchableHighlight
              onPress={async () => {
                if (isAFavoriteStation)
                  await AccountService.removeFavoriteStation(
                    props.stationSelected
                  );
                else
                  await AccountService.addFavoriteStation(
                    props.stationSelected
                  );
                refreshUserInfo(dispatch);
              }}
            >
              <Ionicons
                name={isAFavoriteStation ? "heart-dislike" : "heart"}
                size={30}
                color={isAFavoriteStation ? "#AAAAAA" : "#1574AD"}
              />
            </TouchableHighlight>
          </View>
        )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1574AD",
    alignItems: "center",
    justifyContent: "center",
  },
  btnHidde: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: 10,
  },
  btnFavorite: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginLeft: 10,
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

import { Row } from "react-native-table-component";
import { Station } from "../../../../model/Station";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { StationState } from "../../../../model/StationState";
import StationService from "../../../../services/Station/Station.service";

export interface RowTableDetailsProps {
  stationSelected: Station;
  minutesInFutur: number;
  title: string;
  hightLight?: boolean;
}

const RowTableDetails = (props: RowTableDetailsProps) => {
  const [statusInXMinutes, setStatusInXMinutes] = useState(
    undefined as unknown as StationState
  );

  useEffect(() => {
    (async () => {
      setStatusInXMinutes(
        await StationService.getStatusInFutur(
          props.stationSelected.id,
          props.minutesInFutur
        )
      );
    })();
  }, [props.stationSelected.id, props.minutesInFutur]);

  return (
    <Row
      textStyle={styles.rowText}
      style={
        props.hightLight
          ? { ...styles.row, backgroundColor: "#eeeeee" }
          : styles.row
      }
      data={
        statusInXMinutes
          ? [
              props.title,
              statusInXMinutes.nmbBikeAvailable,
              statusInXMinutes.nmbPlaceAvailable,
            ]
          : [props.title, "", ""]
      }
    />
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
  rowText: {
    color: "black",
    textAlign: "center",
  },
});

export default RowTableDetails;

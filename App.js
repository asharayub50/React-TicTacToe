import update from "immutability-helper";

import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";

const x = "x";
const o = "o";

const gameMatrix = [
  ["x", null, null],
  [null, null, null],
  [null, null, null],
];

const generateMap = (mapData, whenPressed) => {
  // console.log(mapData);
  const mapJsx = [];
  for (let i = 0; i < mapData.length; i++) {
    const row = mapData[i];
    const rowJsx = [];
    for (let j = 0; j < row.length; j++) {
      rowJsx.push(
        <TouchableOpacity
          onPress={() => whenPressed(i, j)}
          style={styles.cell}
          key={`cell_${i}_${j}`}
        >
          <Text style={styles.cellText}>{mapData[i][j]}</Text>
        </TouchableOpacity>
      );
    }
    mapJsx.push(
      <View style={styles.row} key={`row_${i}`}>
        {rowJsx}
      </View>
    );
  }
  // console.log(mapJsx);
  return mapJsx;
};

export default function App() {
  const [gameStage, setGameStage] = useState(gameMatrix);
  const [turn, setTurn] = useState(x);
  const whenPressed = (i, j) => {
    console.log("clicked", i, j);
    const updateStage = update(gameStage, {
      [i]: {
        [j]: { $set: turn },
      },
    });
    setGameStage(updateStage);
  };

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text>Player info goes here</Text>
      </View>

      <View style={styles.grid}>{generateMap(gameStage, whenPressed)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    top: 40,
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 50,
  },
  grid: {
    flex: 6,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },

  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  cellText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

// const styles = {
//   header: {
//     top: 50,
//   },
//   row: {
//     flexDirection: "row",
//   },

//   cell: {
//     width: 100,
//     height: 100,
//     borderWidth: 1,
//     borderColor: "black",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   cellText: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// };

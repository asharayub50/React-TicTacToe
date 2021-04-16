import update from "immutability-helper";

import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";

const x = "X";
const o = "O";

const gameMatrix = [
  [null, null, null],
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
        <Pressable
          onPress={() => whenPressed(i, j)}
          style={styles.cell}
          key={`cell_${i}_${j}`}
        >
          <Text style={styles.cellText}>{mapData[i][j]}</Text>
        </Pressable>
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

//The algorithm
const getWinner = (gameStage) => {
  let transposed = [[], [], []];
  let diagonals = [[], []];
  for (let i = 0; i < gameStage.length; i++) {
    const row = gameStage[i];
    for (let j = 0; j < row.length; j++) {
      transposed[i][j] = gameStage[j][i];
      if (i === j) {
        diagonals[0][i] = gameStage[i][j];
      }
      if (i === Math.abs(j - (row.length - 1))) {
        diagonals[1][i] = gameStage[i][j];
      }
    }
  }

  const allLines = gameStage.concat(transposed).concat(diagonals);
  for (let i = 0; i < allLines.length; i++) {
    const line = allLines[i];
    const isEqual = line.every((item) => item === line[0]);
    if (isEqual) {
      return line[0];
    }
  }

  return null;
};

export default function App() {
  const [gameStage, setGameStage] = useState(gameMatrix);
  //
  const [turn, setTurn] = useState(x);
  //
  const [winnerSymbol, setWinnerSymbol] = useState();
  //
  const whenPressed = (i, j) => {
    if (winnerSymbol || gameStage[i][j]) {
      return;
    }
    console.log("clicked", i, j);
    const updateStage = update(gameStage, {
      [i]: {
        [j]: { $set: turn },
      },
    });
    changeSymbol();
    setGameStage(updateStage);
    const winner = getWinner(updateStage);
    // // console.log(winner);
    if (winner) {
      setWinnerSymbol(`${winner} Won!`);
    }
  };
  //
  const changeSymbol = () => {
    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {!winnerSymbol && `it's ${turn}'s turn`}
        </Text>
        <Text style={styles.headerText}>{winnerSymbol}</Text>
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
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
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

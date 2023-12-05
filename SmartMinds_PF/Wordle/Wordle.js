import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Cell } from "./Cell";

const WORDS = ["PERRO"]; // Lista de palabras a adivinar

export default function App() {
  const [word, setWord] = useState();
  const [wordGuessed, setWordGuessed] = useState(false);

  const restartGame = () => {
    setWordGuessed(false);
    setWord(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Wordle</Text>
      <ScrollView contentContainerStyle={styles.gridContainer} horizontal>
        {word === WORDS ? (
          <Cell wordGuessed={setWordGuessed} />
        ) : (
          <View style={styles.grid}>
            <Cell addWord={setWord} />
          </View>
        )}
      </ScrollView>
      {word !== WORDS && (
        <Text style={styles.wordOfDay}>Word of the day is: {WORDS}</Text>
        
      )}
      {wordGuessed && (
        <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
          <Text style={styles.restartButtonText}>Reiniciar</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    color: "white",
    fontWeight: "900",
    marginBottom: 20,
  },
  gridContainer: {
    justifyContent: "flex-start",
    marginTop: 20,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "center",
  },
  wordOfDay: {
    marginTop: 20,
    fontSize: 18,
    color: "white",
  },
  restartButton: {
    position: "absolute",
    backgroundColor: '#5dc3ec',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  restartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
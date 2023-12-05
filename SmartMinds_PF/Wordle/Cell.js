import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";

const WORDS = ["PERRO"]; // Lista de palabras a adivinar
const MAX_ATTEMPTS = 6;

const TextInputBox = React.forwardRef(({ value, onChange, status, onFocus, disabled }, ref) => {
  let boxStyle = [styles.textBox];
  let textStyle = [styles.text];

  if (value !== "" && status === "correct") {
    boxStyle.push(styles.green);
  } else if (value !== "" && status === "inWord") {
    boxStyle.push(styles.yellow);
  } else if (value !== "" && status === "incorrect") {
    boxStyle.push(styles.red);
    textStyle.push(styles.boldText); // Estilo más grueso para letras incorrectas
  } else if (status === "disabled") {
    boxStyle.push(styles.gray);
    textStyle.push(styles.boldText); // Estilo más grueso para letras deshabilitadas
  }

  return (
    <TextInput
      style={boxStyle}
      value={value}
      onChangeText={onChange}
      maxLength={1}
      autoCapitalize="characters"
      onFocus={onFocus}
      ref={ref}
      editable={!disabled}
    />
  );
});

export const Cell = () => {
  const [rows, setRows] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [attempts, setAttempts] = useState(0);
  const [wordGuessed, setWordGuessed] = useState(false);
  const [enableRestart, setEnableRestart] = useState(false); // Nuevo estado para habilitar/deshabilitar el reinicio
  const refs = useRef(Array.from({ length: 30 }));

  const handleChange = (rowIndex, index, value) => {
    // Verificar si la palabra ya fue adivinada o se agotaron los intentos
    if (wordGuessed || (attempts >= MAX_ATTEMPTS && !enableRestart)) {
      return;
    }

    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIndex][index] = value;
      return newRows;
    });

    // Avanzar automáticamente al siguiente cuadro
    if (index < 4 && value !== "") {
      const nextIndex = index + 1;
      if (nextIndex < 5) {
        // Avanzar al siguiente cuadro en la misma fila
        refs.current[rowIndex][nextIndex].focus();
      } else {
        // Avanzar a la primera caja de la siguiente fila
        if (refs.current[rowIndex + 1]) {
          refs.current[rowIndex + 1][0].focus();
        }
      }
    } else if (index === 4 && value !== "") {
      // La fila está completa, verificar si la palabra es incorrecta y avanzar a la siguiente fila
      checkWord(rowIndex);
    }
  };

  const checkWord = (rowIndex) => {
    const isWordIncorrect = rows[rowIndex].join("") !== WORDS[0];

    if (isWordIncorrect) {
      setAttempts((prevAttempts) => prevAttempts + 1);
      if (attempts + 1 === MAX_ATTEMPTS) {
        // El usuario ha alcanzado el máximo de intentos permitidos, mostrar la palabra correcta
        setWordGuessed(true);
        setEnableRestart(true); // Habilitar el reinicio al mostrar la palabra correcta
      } else {
        // Avanzar a la siguiente fila
        if (refs.current[rowIndex + 1]) {
          refs.current[rowIndex + 1][0].focus();
        }
      }
    } else {
      // La palabra es correcta, el juego ha sido ganado
      setWordGuessed(true);
      setEnableRestart(true); // Habilitar el reinicio al adivinar la palabra
    }
  };

  const restartGame = () => {
    setAttempts(0);
    setWordGuessed(false);
    setEnableRestart(false); // Deshabilitar el reinicio al iniciar un nuevo juego
    setRows([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    if (refs.current[0]) {
      refs.current[0][0].focus();
    }
  };

  useEffect(() => {
    if (refs.current[0]) {
      refs.current[0][0].focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter, index) => (
            <TextInputBox
              key={index}
              value={letter}
              onChange={(value) => handleChange(rowIndex, index, value)}
              status={getLetterStatus(letter, index)}
              onFocus={() => {
                // Avanzar al siguiente cuadro cuando se escribe la primera letra
                if (letter === "" && index < 4) {
                  handleChange(rowIndex, index, "");
                }
              }}
              disabled={wordGuessed || (attempts >= MAX_ATTEMPTS && !enableRestart)} // Deshabilitar la edición después de adivinar la palabra o agotar los intentos
              ref={(input) => {
                refs.current[rowIndex] = refs.current[rowIndex] || [];
                refs.current[rowIndex][index] = input;
              }}
            />
          ))}
        </View>
      ))}
      <TouchableOpacity
        style={[styles.restartButton, { backgroundColor: wordGuessed ? "#5dc3ec" : "gray" }]}
        onPress={restartGame}
        disabled={!enableRestart} // Deshabilitar el reinicio si no está habilitado
      >
        <Text style={styles.restartButtonText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const getLetterStatus = (letter, index) => {
  if (letter === WORDS[0].charAt(index)) {
    return "correct";
  } else if (WORDS[0].includes(letter)) {
    return "inWord";
  } else if (letter === "") {
    return "empty";
  } else {
    return "incorrect";
  }
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    alignItems: "center",
    backgroundColor: "FFFFFA",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBox: {
    height: 60,
    margin: 8,
    width: 60,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20, // Ajusta el tamaño de la letra según tus preferencias
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  green: {
    backgroundColor: "green",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  red: {
    backgroundColor: "red",
  },
  gray: {
    backgroundColor: "gray",
  },
  restartButton: {
    marginTop: 20,
    padding: 10,
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

export default TextInputBox;
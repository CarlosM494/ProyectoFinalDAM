import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, } from 'react-native';
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }
  //El siguiente método se llama cada que la app se inicia
  componentDidMount() {
    this.initializeGame();
  }
  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    });
  }

  //Retornará 1 si el jugador 1 gana, -1 si el jugador 2 gana y 0 si nadie gana.
  getWinner = () => {
    const NUM_TILES = 3;
    let arr = this.state.gameState;
    let sum;

    //Iteramos en las filas
    for(let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3) {return 1; }
      else if(sum == -3) {return -1;}
    }
    //Iteramos en las columnas
    for(let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3) {return 1; }
      else if(sum == -3) {return -1;}
    }
    //Verificamos las diagonales
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3) {return 1; }
      else if(sum == -3) {return -1;}

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if(sum == 3) {return 1; }
      else if(sum == -3) {return -1;}

    //Si no hay ganadores
    return 0;
  } 

  onTilePress = (row, col) => {
    //Variable para que no pueda cambiar el valor de x u o
    let value = this.state.gameState[row][col];
    if(value !== 0) {
      return;
    }
    //Que siga igual...
    let currentPlayer = this.state.currentPlayer;

    //Establece el jugador correcto
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer; //Aquí llamamos al jugador actual
    this.setState({gameState: arr}); //Actualizamos el estado

    //Cambia de jugador
    let otherPlayer = (currentPlayer == 1) ? -1 : 1; //Condiciona al siguiente jugador dependiendo si es -1 o 1
    this.setState({currentPlayer: otherPlayer}); //Cambia el estado del jugador

    //Revisamos si hay ganadores
    let winner = this.getWinner();
    if(winner == 1) {
      Alert.alert('El jugador 1 ganó');
      this.initializeGame();
    } else if(winner == -1) {
      Alert.alert('El jugador 2 ganó');
      this.initializeGame();
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch(value) {
      case 1: return <Icon name="cat" style={styles.tileX}/>;
      case -1: return <Icon name="dog" style={styles.tileO}/>;
      default: return <View />;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={{paddingBottom:80, fontSize: 40, color: "white", fontWeight: "900",}}>Catdog</Text>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0 }]}>
          {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, {borderTopWidth: 0 }]}>
          {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0 }]}>
          {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, {borderLeftWidth: 0 }]}>
          {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, {} ]}>
          {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, {borderRightWidth: 0 }]}>
          {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0 }]}>
          {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, {borderBottomWidth: 0 }]}>
          {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0 }]}>
          {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 50, width: '100%', alignItems: 'center' }}>
          <TouchableOpacity style={styles.newGameButton} onPress={this.onNewGamePress}>
          <Text style={styles.buttonText}>Nuevo juego</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'blue',
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 5,
    borderColor: '#5dc3ec',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: '#FF6B6B',
    fontSize: 60,
  },
  tileO: {
    color: '#E0B396',
    fontSize: 50,
  },
  newGameButton: {
      backgroundColor: '#5dc3ec',
      borderRadius: 25,
      paddingVertical: 10,
     paddingHorizontal: 20,
     marginVertical: 10,    // Espaciado horizontal dentro del botón
    },
    buttonText: {
      color: 'white',             // Color del texto dentro del botón
      fontSize: 18,               // Tamaño de fuente del texto
      fontWeight: 'bold',         // Peso de la fuente (negrita)
    },
  });

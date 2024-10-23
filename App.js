import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { create, all } from 'mathjs';

const math = create(all);

export default function App() {
  const [input, setInput] = useState('');

  const handleButtonPress = (value) => {
    setInput((prev) => prev + value);
  };

  const handleCalculate = () => {
    try {
      const result = math.evaluate(input);
      setInput(String(result));
    } catch (error) {
      setInput('Error');
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const renderButton = (value, style, onPress) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.displayText}>{input || '0'}</Text>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {renderButton('C', styles.clearButton, handleClear)}
          {renderButton('(', {}, () => handleButtonPress('('))}
          {renderButton(')', {}, () => handleButtonPress(')'))}
          {renderButton('/', {}, () => handleButtonPress('/'))}
        </View>
        <View style={styles.row}>
          {renderButton('7', {}, () => handleButtonPress('7'))}
          {renderButton('8', {}, () => handleButtonPress('8'))}
          {renderButton('9', {}, () => handleButtonPress('9'))}
          {renderButton('*', {}, () => handleButtonPress('*'))}
        </View>
        <View style={styles.row}>
          {renderButton('4', {}, () => handleButtonPress('4'))}
          {renderButton('5', {}, () => handleButtonPress('5'))}
          {renderButton('6', {}, () => handleButtonPress('6'))}
          {renderButton('-', {}, () => handleButtonPress('-'))}
        </View>
        <View style={styles.row}>
          {renderButton('1', {}, () => handleButtonPress('1'))}
          {renderButton('2', {}, () => handleButtonPress('2'))}
          {renderButton('3', {}, () => handleButtonPress('3'))}
          {renderButton('+', {}, () => handleButtonPress('+'))}
        </View>
        <View style={styles.row}>
          {renderButton('0', { flex: 2 }, () => handleButtonPress('0'))}
          {renderButton('.', {}, () => handleButtonPress('.'))}
          {renderButton('=', {}, handleCalculate)}
        </View>
        <View style={styles.row}>
          {renderButton('sin', styles.trigButton, () => handleButtonPress('sin('))}
          {renderButton('cos', styles.trigButton, () => handleButtonPress('cos('))}
          {renderButton('tan', styles.trigButton, () => handleButtonPress('tan('))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo oscuro
    justifyContent: 'flex-end',
    padding: 20,
  },
  display: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-end',
    maxHeight: 80,
  },
  scrollContainer: {
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 36,
    color: '#fff', // Texto blanco
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: '#333', // Fondo oscuro para el contenedor de botones
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 40, // Botones circulares
    backgroundColor: '#555', // Color oscuro para botones
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  trigButton: {
    backgroundColor: '#888', // Color más claro para los botones trigonométricos
  },
  clearButton: {
    backgroundColor: '#ff3b30', // Botón de limpiar rojo oscuro
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});

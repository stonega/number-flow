import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NumberFlow from 'number-flow-react-native';

export default function App() {
  const [value, setValue] = React.useState(100);
  const [increment, setIncrement] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setValue(prev => prev + increment);
    }, 2000);
    return () => clearInterval(timer);
  }, [increment]);

  const handleIncrease = () => {
    setValue(prev => prev + 50);
  };

  const handleDecrease = () => {
    setValue(prev => prev - 50);
  };

  const toggleIncrement = () => {
    setIncrement(prev => (prev === 10 ? 25 : 10));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NumberFlow Expo Example</Text>

      <View style={styles.showcase}>
        <Text style={styles.label}>Basic Value:</Text>
        <NumberFlow value={value} />
      </View>

      <View style={styles.showcase}>
        <Text style={styles.label}>Formatted Value (Currency):</Text>
        <NumberFlow
          value={value}
          locales="en-US"
          format={{ style: 'currency', currency: 'USD' }}
          textStyle={styles.currencyText}
        />
      </View>

      <View style={styles.showcase}>
        <Text style={styles.label}>With Prefix & Suffix:</Text>
        <NumberFlow
          value={value / 10}
          prefix="~"
          suffix=" units"
          format={{ maximumFractionDigits: 1 }}
        />
      </View>

      <View style={styles.controls}>
        <Button title="Increase by 50" onPress={handleIncrease} />
        <View style={styles.buttonSpacer} />
        <Button title="Decrease by 50" onPress={handleDecrease} />
        <View style={styles.buttonSpacer} />
        <Button title={`Toggle Auto-Increment (Currently ${increment})`} onPress={toggleIncrement} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  showcase: {
    marginBottom: 25,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  currencyText: {
    fontSize: 20,
    color: 'green',
  },
  controls: {
    marginTop: 30,
    alignItems: 'center',
  },
  buttonSpacer: {
    height: 10,
  }
});

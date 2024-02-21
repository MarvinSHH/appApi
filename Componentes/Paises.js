import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const Paises = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((countries) => {
        setData(countries);
        setLoad(true);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const CountryCard = ({ country }) => (
    <View style={styles.card}>
      <Text style={styles.countryName}>{country.name.common}</Text>
      <Text style={styles.capital}>Capital: {country.capital[0]}</Text>
      <Text style={styles.population}>Población: {country.population}</Text>
      <Text style={styles.region}>Región: {country.region}</Text>
      <Image style={styles.flag} source={{ uri: country.flags.png }} />
    </View>
  );

  const LoadedScreen = () => (
    <FlatList
      data={data}
      renderItem={({ item }) => <CountryCard country={item} />}
      keyExtractor={(item) => item.name.common}
    />
  );

  return (
    <View>{load ? <LoadedScreen /> : <Text>Cargando Datos...</Text>}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 3,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  countryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  capital: {
    fontSize: 16,
    marginBottom: 8,
  },
  population: {
    fontSize: 16,
    marginBottom: 8,
  },
  region: {
    fontSize: 16,
    marginBottom: 8,
  },
  flag: {
    width: 100,
    height: 70,
    resizeMode: "cover",
    borderRadius: 4,
  },
});

export default Paises;

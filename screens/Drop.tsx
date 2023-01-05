import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import Constants from "expo-constants";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { useTypeEvents1 } from "../hooks/useTypeEvents1";

const App = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(" ");
  const [isFocus, setIsFocus] = useState(false);
  const { typeEvents1 } = useTypeEvents1(); //
  console.log(typeEvents1);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      // handle error
      alert("Oh no", "...");
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        data={typeEvents1}
        search
        maxHeight={300}
        labelField="label"
        valueField="aisle"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      <TextInput label="quantity" variant="standard" />
      <Text>value: {value}</Text>
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

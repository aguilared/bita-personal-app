import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Dropdown from "../components/Dropdown";
import { useTypeEvents1 } from "../hooks/useTypeEvents1";

const App: FC = () => {
  const { typeEvents1 } = useTypeEvents1(); //

  const [selected, setSelected] = useState(undefined);
  const data = [
    { label: "One", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
  ];

  return (
    <View style={styles.container}>
      {!!selected && (
        <Text>
          Selected: label = {selected.label} and value = {selected.value}
        </Text>
      )}
      <Dropdown label="Select Item" data={typeEvents1} onSelect={setSelected} />
      <Text>This is the rest of the form.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default App;

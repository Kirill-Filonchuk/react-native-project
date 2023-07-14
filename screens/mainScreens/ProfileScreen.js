import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { counterSlice, initialState } from "../../redux/counter/counterSlice";
import { REACT_APP_MY_KEY } from "@env";

export const ProfileScreen = () => {
  const counter = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();
  const [customeValue, setCuctomeValue] = useState(null);
  console.log(customeValue);
  return (
    <View style={styles.containerP}>
      <Text>ProfileScreen button #3</Text>
      <Text>Counter section - {`${REACT_APP_MY_KEY}`}</Text>
      <Text>Quantity: {counter}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Button
          onPress={() => dispatch(counterSlice.actions.increment())}
          title="Increment"
          color="#cda"
        />
        <Button
          onPress={() => dispatch(counterSlice.actions.decrement())}
          title="Decrement"
          color="#fac"
        />
        <TextInput
          value={customeValue}
          onChangeText={(value) => {
            setCuctomeValue(value);
            console.log(customeValue);
            dispatch(counterSlice.actions.initValue(value));
          }}
          placeholder="init"
          keyboardType="numeric"
          style={{
            height: "100%",
            width: 80,
            padding: 3,
            color: "#ccc",
            borderColor: "#cda",
            borderWidth: 2,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerP: {
    flex: 1, //all space of screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

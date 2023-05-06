import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { StackParamsList } from "../../routes/app.routes";
import { orderService } from "../../services/order";

const Dashboard = () => {
  const [table, setTable] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const openOrder = async () => {
    if (table === "") return;

    const res = await orderService.openTable({ table: Number(table) });

    if (res) {
      navigation.navigate("Order", { table: Number(table), order_id: res.id });
      setTable("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder="Número da mesa"
        placeholderTextColor="#f0f0f0"
        style={styles.input}
        value={table}
        onChangeText={setTable}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1d1d2e",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    height: 60,
    backgroundColor: "#101026",
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 22,
    color: "#FFF",
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#101026",
    fontWeight: "bold",
  },
});

export default Dashboard;

import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

const SignIn = () => {
  const { signIn, loadingAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") return;

    await signIn({ email, password });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          placeholderTextColor="#F0F0F0"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Sua senha"
          style={styles.input}
          placeholderTextColor="#F0F0F0"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color={"#fff"} />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#101026",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#FFF",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101026",
  },
});

export default SignIn;

import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Dashboard</Text>
      <Button title="Sair do app" onPress={signOut} />
    </View>
  );
};

export default Dashboard;

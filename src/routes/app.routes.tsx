import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    table: number;
    order_id: string;
  };
};

const Stack = createNativeStackNavigator<StackParamsList>();

const AppRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;

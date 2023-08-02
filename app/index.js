import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from '../app/Redux/store'
import ListScreen from "./Screens/ListScreen";
import AddItem from "./Screens/AddItem";
// import Login from "./Screens/Login";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

export default function Page() {
  return (
   <Provider store={store}>
   <Stack.Navigator>
    <Stack.Screen name="Shopping List"  component={ListScreen}
      options={
        {headerStyle: {backgroundColor: '#FF0066'}}
      }
    />
    
   </Stack.Navigator>
    <AddItem />

   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },

});

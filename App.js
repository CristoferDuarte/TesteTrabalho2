import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/HomeScreen";
import HistoricoScreen from "./src/Registros";


const Stack = createStackNavigator ();
export default function App () {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">    
      <Stack.Screen name="Home" component={HomeScreen} options={{title:"Circus Initial Page"}}/>
      <Stack.Screen name="Histórico" component={HistoricoScreen} options={{title:"Historico de registro"}} />
     </Stack.Navigator>
  </NavigationContainer>
  )
}


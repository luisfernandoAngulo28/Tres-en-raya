import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle:{
          backgroundColor: "#0f172a",
        }
      }}
    >


    
      <Stack.Screen name="index"/>
      <Stack.Screen name="juego"/>

    </Stack>
)}

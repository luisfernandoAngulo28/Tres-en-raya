import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        3 en raya
      </Text>
      <Text style={styles.subtitle}>
        ¡Solo en UNIVALLE!
      </Text>
      <Link href="/juego" style={styles.boton}>
          Comenzar a jugar
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title:{
    color: "#cbd5e1",
    fontSize: 40,
    fontWeight: "800"
  },

  subtitle:{
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "600"
  },

  boton:{
    backgroundColor: "#22c55e",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  }
});

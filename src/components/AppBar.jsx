import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useNavigate } from "react-router-native";
import { font } from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#24292e",
  },
  text: {
    color: "white",
    padding: 15,
    fontSize: 20,
    fontFamily: font,
  },
});

const AppBar = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable
          onPress={() => {
            navigate("/");
          }}
        >
          <Text style={styles.text}>{"Repositories"}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigate("/signIn");
          }}
        >
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;

import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderColor: theme.colors.laguageBackground,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    margin: 10,
    backgroundColor: theme.colors.primary,
  },
  text: {
    fontWeight: "500",
    fontSize: 30,
    color: "#fff",
  },
});

export function SubmitButton({ onSubmit, text }) {
  return (
    <Pressable onPress={onSubmit} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

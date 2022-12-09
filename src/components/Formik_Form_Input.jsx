import React from "react";
import { TextInput, StyleSheet, Text } from "react-native";
import { useField } from "formik";
import theme, { font } from "../theme";

const styles = StyleSheet.create({
  errorText: {
    margin: 10,
    fontSize: 30,
    color: theme.colors.errorColor,
    fontFamily: font,
  },
  textInput: {
    fontSize: 40,
    padding: 10,
    borderColor: theme.colors.laguageBackground,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    fontFamily: font,
  },
});

function Formik_Form_Input({ name, placeholder }) {
  const [field, meta, fieldHelpers] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={field.value}
        onChangeText={(text) => fieldHelpers.setValue(text)}
      />
      {error && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
}

export default Formik_Form_Input;

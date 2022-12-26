import { Text, Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import Formik_Form_Input from "./Formik_Form_Input";
import useSignIn from "../utils/hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../utils/hooks/useAuthStorage";
import { useEffect } from "react";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
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
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "#fff", padding: 15 }}>
      <Formik_Form_Input name="username" placeholder="Username" />
      <Formik_Form_Input name="password" placeholder="Password" />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={{ fontWeight: "500", fontSize: 30, color: "#fff" }}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const validateSchema = yup.object({
  username: yup
    .string()
    .min(5, "Username Must be atleast 5 Character")
    .required("Username Is required"),
  password: yup
    .string()
    .min(5, "Username Must be atleast 5 Character")
    .required("Username Is required"),
});

const SignIn = () => {
  const [signInFun, result] = useSignIn();
  const navigate = useNavigate();
  const apppoloClient = useApolloClient();
  const authStorageContext = useAuthStorage();

  useEffect(() => {
    if (result.data) {
      authStorageContext.addToken(result?.data?.authenticate.accessToken);
      navigate("/");
      apppoloClient.resetStore();
    }
  }, [result.data]);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signInFun({ username, password });
      // console.log(result.data.authenticate.accessToken);
      // await authStorageContext.addToken(result?.data?.authenticate.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;

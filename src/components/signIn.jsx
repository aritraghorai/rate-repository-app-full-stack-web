import { View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Formik_Form_Input from "./Formik_Form_Input";
import useSignIn from "../utils/hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../utils/hooks/useAuthStorage";
import { useEffect } from "react";
import { SubmitButton } from "./Button/button";

const initialValues = {
  username: "",
  password: "",
};

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "#fff", padding: 15 }}>
      <Formik_Form_Input name="username" placeholder="Username" />
      <Formik_Form_Input name="password" placeholder="Password" />
      <SubmitButton text="Sign In" onSubmit={onSubmit} />
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
      apppoloClient.resetStore();
      navigate("/");
    }
  }, [result.data]);

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(values);
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

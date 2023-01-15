import { Formik } from "formik";
import React, { useEffect } from "react";
import { View } from "react-native";
import { SubmitButton } from "./Button/button";
import * as yup from "yup";
import Formik_Form_Input from "./Formik_Form_Input";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/graphql/mutation";

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "#fff", padding: 15 }}>
      <Formik_Form_Input name="username" placeholder="Enter Your Username" />
      <Formik_Form_Input name="password" placeholder="Enter Your Password" />
      <Formik_Form_Input
        name="passwordConfirm"
        placeholder="Enter pasword again"
      />
      <SubmitButton text="Sign Up" onSubmit={onSubmit} />
    </View>
  );
};
const intitalState = {
  username: "",
  password: "",
};
const validateSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Password is not match"),
});

const SignUp = () => {
  const [sign_up, { data }] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.createUser) {
      navigate("/");
    }
  }, [data]);
  const onSubmit = async (value) => {
    try {
      sign_up({
        variables: {
          user: {
            username: value.username,
            password: value.password,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={intitalState}
      validationSchema={validateSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;

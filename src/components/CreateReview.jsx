import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import { CREATE_REVIEW } from "../utils/graphql/mutation";
import { SubmitButton } from "./Button/button";
import Formik_Form_Input from "./Formik_Form_Input";

const initialState = {
  ownerName: "",
  rating: "",
  repositoryName: "",
  text: "",
};

const validateSchema = yup.object({
  ownerName: yup.string().required(),
  repositoryName: yup.string().required(),
  rating: yup.number().max(100).min(0),
  text: yup.string().optional(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "#fff", padding: 15 }}>
      <Formik_Form_Input
        name="ownerName"
        placeholder="Enter Repository Owner name"
      />
      <Formik_Form_Input
        name="repositoryName"
        placeholder="Enter Repository Name"
      />
      <Formik_Form_Input
        name="rating"
        placeholder="Give The rating like 90,30"
      />
      <Formik_Form_Input name="text" placeholder="Give a comment" />
      <SubmitButton text="Create Review" onSubmit={onSubmit} />
    </View>
  );
};

const CreateReview = () => {
  const [create_review] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  const onSubmit = async (value) => {
    console.log(value);
    try {
      await create_review({
        variables: {
          review: {
            ...value,
            rating: value.rating * 1,
          },
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialState}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;

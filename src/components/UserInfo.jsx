import { useApolloClient, useQuery } from "@apollo/client";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import query from "../utils/graphql/query";
import useAuthStorage from "../utils/hooks/useAuthStorage";

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

const UserInfo = () => {
  const { data, loading } = useQuery(query.USER_DETAIL);
  const authStorage = useAuthStorage();
  const appoloClient = useApolloClient();
  const navigate = useNavigate();
  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  const onSubmit = async () => {
    await authStorage.removeToken();
    appoloClient.resetStore();
    navigate("/");
  };
  if (data) {
    console.log(data);
  }

  return (
    <View>
      <Text>{}</Text>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={{ fontWeight: "500", fontSize: 30, color: "#fff" }}>
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
};

export default UserInfo;

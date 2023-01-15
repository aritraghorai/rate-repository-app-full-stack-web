import { useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
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
  text: {
    padding: 10,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    margin: 10,
    fontWeight: "500",
    fontSize: 30,
    alignContent: "center",
    color: "bloack",
  },
});

const UserInfo = () => {
  const { data, loading } = useQuery(query.USER_DETAIL, {
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const appoloClient = useApolloClient();

  useEffect(() => {
    if (data?.me === null) {
      authStorage.removeToken();
      appoloClient.resetStore();
      navigate("/");
    }
  }, [data]);

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

  return (
    <View>
      <Text style={styles.text}>{data?.me.username}</Text>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={{ fontWeight: "500", fontSize: 30, color: "#fff" }}>
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
};

export default UserInfo;

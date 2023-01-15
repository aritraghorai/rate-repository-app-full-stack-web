import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigate } from "react-router";
import theme from "../theme";
import { DELETE_REVIEW } from "../utils/graphql/mutation";
import { USER_DETAIL } from "../utils/graphql/query";
import { ReviewItem } from "./RepositoryDetail";

const styles = StyleSheet.create({
  button: {
    borderColor: theme.colors.laguageBackground,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    margin: 10,

    backgroundColor: theme.colors.primary,
  },
  button1: {
    padding: 10,
    borderColor: theme.colors.laguageBackground,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    margin: 10,
    backgroundColor: "red",
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
    color: "#fff",
  },
});

const UsersReview = () => {
  const [fetchReviws, { data, loading, error, refetch }] =
    useLazyQuery(USER_DETAIL);
  const [delete_review] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();
  useEffect(() => {
    fetchReviws({
      variables: {
        includeReviews: true,
      },
    });
  }, []);

  const onDeleteHandler = (id) => {
    Alert.alert("Delete Review", "Are you sure you want to delete review?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancl Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          delete_review({
            variables: {
              deleteReviewId: id,
            },
          });
          refetch();
        },
        style: "default",
      },
    ]);
  };

  return loading ? (
    <View>
      <Text>My Reviews</Text>
    </View>
  ) : error || data?.me === null ? (
    <View>
      <Text>My Reviews</Text>
    </View>
  ) : (
    <FlatList
      data={data?.me.reviews.edges}
      renderItem={({ item }) => (
        <ReviewItem review={item.node}>
          <View
            style={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={styles.button}
              onPress={() => {
                navigate(`/repository/${item.node.repositoryId}`);
              }}
            >
              <Text style={styles.text}>View Repository</Text>
            </Pressable>
            <Pressable
              style={styles.button1}
              onPress={() => {
                onDeleteHandler(item.node.id);
              }}
            >
              <Text style={styles.text}>Delete Review</Text>
            </Pressable>
          </View>
        </ReviewItem>
      )}
      keyExtractor={({ id }) => id}
      onEndReached={() => {
        // handleFetchMore();
      }}
    />
  );
};

export default UsersReview;

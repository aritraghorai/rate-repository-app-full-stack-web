import { useLazyQuery } from "@apollo/client";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useParams } from "react-router-native";
import theme, { font } from "../theme";
import query from "../utils/graphql/query";
import RepositoryItem from "./RepositoryItem";

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
    fontWeight: "500",
    fontSize: 30,
    color: "#fff",
  },
});
export const ReviewItem = ({ review, children }) => {
  return (
    <View>
      <View
        style={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          fontFamily: font,
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            borderColor: theme.colors.primary,
            borderWidth: 2,
            borderRadius: 40,
            width: 80,
            margin: 10,
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: theme.colors.primary,
              fontSize: 30,
            }}
          >
            {review.rating}
          </Text>
        </View>
        <View style={{ display: "flex", flex: 9 }}>
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 8,
              fontSize: 20,
              padding: 5,
            }}
          >
            {review.user.username}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, padding: 5 }}>
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text style={{ textAlign: "auto", padding: 5, fontWeight: "bold" }}>
            {review.text}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};

const RepositoryDetail = () => {
  const [getRepositoryDetail, { data, loading, error, fetchMore }] =
    useLazyQuery(query.REPOSITORY_DETAIL, {
      fetchPolicy: "cache-and-network",
    });
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getRepositoryDetail({
      variables: {
        repositoryId: id,
      },
    });
  }, []);
  const handleFetchMore = () => {
    console.log(data.repository.reviews);
    const canFetchMore =
      !loading && data?.repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (error || !data?.repository) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  console.log(data.repository.reviews.edges);
  return (
    <View>
      <FlatList
        data={data.repository.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={({ id }) => id}
        onEndReached={() => {
          handleFetchMore();
        }}
        ListHeaderComponent={() => (
          <RepositoryItem {...data.repository}>
            <View style={styles.button}>
              <Text style={styles.text}>Open In Github</Text>
            </View>
          </RepositoryItem>
        )}
      />
    </View>
  );
};

export default RepositoryDetail;

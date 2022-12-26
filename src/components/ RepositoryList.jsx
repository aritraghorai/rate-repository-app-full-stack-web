import { FlatList, View, StyleSheet, Text } from "react-native";
import useRepositories from "../utils/hooks/UseRepositoryList";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { loading, repositories: data, refetch, error } = useRepositories();

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (error || !data?.repositories) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  console.log();

  return (
    <FlatList
      data={data.repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      refreshing={refetch}
      renderItem={(item) => {
        return <RepositoryItem {...item.item.node} />;
      }}
    />
  );
};
export default RepositoryList;

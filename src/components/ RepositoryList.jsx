import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigate } from "react-router-native";
import useRepositories from "../utils/hooks/UseRepositoryList";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const filtersType = {
  Latest_Repository: "latest_repositories",
  Highest_rates_reposiory: "highest_rated_repository",
  Lowest_rates_reposiory: "lowest_rated_repository",
};

export const RepositoryListContainer = ({
  repositories,
  refetch,
  error,
  loading,
  onEndReach,
}) => {
  const navigate = useNavigate();

  if (error || !repositories) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      refreshing={refetch}
      renderItem={(item) => {
        return (
          <Pressable
            onPress={() => {
              console.log(`/repository/${item.item.node.id}`);
              navigate(`/repository/${item.item.node.id}`);
            }}
            key={item.item.node.id}
          >
            <RepositoryItem {...item.item.node} />
          </Pressable>
        );
      }}
    />
  );
};

const RepositoryList = () => {
  const [filter, setFilter] = useState("latest_repositories");
  const [searchQuery, setSearchQuery] = useState(undefined);
  const {
    loading,
    repositories: data,
    refetch,
    error,
    fetchMore,
  } = useRepositories();
  const chageFilterState = async (value) => {
    setFilter(value);
    if (value === filtersType.Highest_rates_reposiory) {
      await refetch({
        variables: {
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
        },
      });
    } else if (value === filtersType.Latest_Repository) {
      await refetch({});
    } else {
      await refetch({
        variables: {
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
        },
      });
    }
  };
  const onEndReach = () => {
    fetchMore();
  };

  const onChangeSearch = (value) => {
    setSearchQuery(value);
    refetch({
      variables: {
        searchKeyword: value,
      },
    });
  };

  return (
    <>
      <View style={{ backgroundColor: "gray" }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Picker
          selectedValue={filter}
          onValueChange={chageFilterState}
          style={{ color: "#fff" }}
        >
          <Picker.Item
            label="Latest repositories"
            value={filtersType.Latest_Repository}
          />
          <Picker.Item
            label="Highest rated repositories"
            value={filtersType.Highest_rates_reposiory}
          />
          <Picker.Item
            label="Lowest rated repositories"
            value={filtersType.Lowest_rates_reposiory}
          />
        </Picker>
      </View>
      <RepositoryListContainer
        key={filter}
        repositories={data?.repositories}
        refetch={refetch}
        filter={filter}
        loading={loading}
        onEndReach={onEndReach}
        error={error}
        chageFilterState={chageFilterState}
      ></RepositoryListContainer>
    </>
  );
};
export default RepositoryList;

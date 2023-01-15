import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import query from "../graphql/query";

const useRepositories = () => {
  const [fetchRepositories, { loading, data, error, fetchMore }] = useLazyQuery(
    query.getAllRepository,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };
  useEffect(() => {
    fetchRepositories();
  }, []);
  return {
    repositories: data,
    loading,
    refetch: fetchRepositories,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
